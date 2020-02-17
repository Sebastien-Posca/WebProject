var multer = require('multer');
var fs = require('fs');
var fsPromises = fs.promises;
var unzipper = require('unzipper')
let pluginController = require('../controllers/plugin')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dirname = './plugins/' + Date.now();
    fs.mkdirSync(dirname, { recursive: true });
    cb(null, dirname);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
exports.upload = multer({ storage: storage });

exports.fileUpload = (req, res) => {
  console.log("Processing upload request");
  let main;
  let temp = fs.createReadStream(req.file.path).pipe(unzipper.Extract({ path: req.file.destination }));
  temp.on("close", () => {
    fsPromises.access(req.file.destination + '/main.json', fs.constants.F_OK)
    .then(() => {
      return fsPromises.readFile(req.file.destination + '/main.json');
    })
    .then((buffer) => {
      main = JSON.parse(buffer);
      console.log(main);
      if (req.body.thumbnail != undefined) {
        return fsPromises.writeFile(req.file.destination + '/thumbnail.jpg', req.body.thumbnail);
      } else {
        return fsPromises.readFile(req.file.destination + "/img/unknown.jpg", { encoding: 'base64' }).then((buff => {
          return fsPromises.writeFile(req.file.destination + '/thumbnail.jpg', buff);
        }));
      }
    })
    .then(() => {
      return pluginController.createPlugin('moi', req.file.destination, req.body.name, main.name, req.body.description, req.body.tags, req.body.categorie, req.body.version, res)
    })
    .then((plugin) => {
      console.log("Upload request complete, ok");
      return res.status(201).json({
        message: "Message received",
      });
    })
    .catch((err) => {
      console.log("Upload request error:", err);
      return res.status(500).send(err)});
  })
}

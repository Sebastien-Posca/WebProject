var multer = require('multer');
var fs = require('fs');
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
  let temp = fs.createReadStream(req.file.path).pipe(unzipper.Extract({ path: req.file.destination }));
  temp.on("close", () => {
    if (!fs.existsSync(req.file.destination + '/main.json')) {
      return res.status(500).send("File was not created")
    }
    let buffer = fs.readFileSync(req.file.destination + '/main.json');
    let main = JSON.parse(buffer);
    if (req.body.thumbnail != undefined) {
      fs.writeFileSync(req.file.destination + '/thumbnail.jpg', req.body.thumbnail);
    } else {
      let buff = fs.readFileSync(req.file.destination + "/img/unknown.jpg", { encoding: 'base64' });
      fs.writeFileSync(req.file.destination + '/thumbnail.jpg', buff);
    }
    pluginController.createPlugin('moi', req.file.destination, req.body.name, main.name, req.body.description, req.body.tags, req.body.categorie, req.body.version, res).then((plugin) => {
      return res.status(201).json({
        message: "Message received",
      });
    }).catch((error) => {
      return res.status(500).send(error)
    });
  })
}

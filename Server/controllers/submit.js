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
var upload = multer({ storage: storage });

function fileUpload(req, res) {
  console.log(req.body);
  console.log(req.file);
  fs.createReadStream(req.file.path).pipe(unzipper.Extract({ path: req.file.destination }))
  fs.writeFileSync(req.file.destination + '/thumbnail.jpg', req.body.thumbnail);
  pluginController.createPlugin("moi", req.file.destination, "ok");
  res.status(200).json({
    message: "Message received",
  });
}

module.exports.fileUpload = fileUpload;
module.exports.upload = upload;

var multer  = require('multer');
var fs = require('fs');
var AdmZip = require('adm-zip');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var dirname = './plugins/' + Date.now();
      fs.mkdirSync(dirname);
      cb(null, dirname);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

function fileUpload(req, res) {
  console.log(req.file);
  var zip = new AdmZip(req.file.path);
  zip.extractAllTo(req.file.destination, true);
  res.status(200).json({
        message: "Message received",
    });
}

module.exports.fileUpload = fileUpload;
module.exports.upload = upload;

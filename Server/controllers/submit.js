var multer = require('multer');
var fs = require('fs');
var fsPromises = fs.promises;
var unzipper = require('unzipper')
let pluginController = require('../controllers/plugin')
const Plugin = require('../models/plugin')
const simpleGit = require('simple-git/promise');
const request = require('request');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dirname = './plugins/' + Date.now();
    if (file != undefined) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    cb(null, dirname);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
exports.upload = multer({ storage: storage });

exports.fileUpload = (req, res) => {
  //console.log("Processing upload request");
  let main;
  let temp = fs.createReadStream(req.file.path).pipe(unzipper.Extract({ path: req.file.destination }));
  temp.on("close", () => {
    fsPromises.access(req.file.destination + '/main.json', fs.constants.F_OK)
      .then(() => {
        return fsPromises.readFile(req.file.destination + '/main.json');
      })
      .then((buffer) => {
        main = JSON.parse(buffer);
        //console.log(main);
        if (req.body.thumbnail != null) {
          return fsPromises.writeFile(req.file.destination + '/thumbnail.jpg', req.body.thumbnail);
        } else {
          return fsPromises.readFile(req.file.destination + "/img/unknown.jpg", { encoding: 'base64' }).then((buff => {
            return fsPromises.writeFile(req.file.destination + '/thumbnail.jpg', buff);
          }));
        }
      })
      .then(() => {
        let timestamp = req.file.destination.split('./plugins/');
        let path = "./plugin/" + timestamp[1];
        return pluginController.createPlugin(req.user.name, req.file.destination, path, req.body.name, main.name, req.body.description, req.body.tags, req.body.categorie, req.body.version)
      })
      .then((plugin) => {
        //console.log("Upload request complete, ok");
        return res.status(201).json({
          message: "Message received",
        });
      })
      .catch((err) => {
        //console.log("Upload request error:", err);
        return res.status(500).json(err)
      });
  })
}

exports.fileDownload = (req, res) => {
  Plugin.findById(req.params.id).then((plugin, err) => {
    if (err || plugin == null) return res.status(500).send(err);
    ////console.log(plugin);
    res.setHeader('Content-type', 'application/zip');
    let fileStream = fs.createReadStream(__dirname + '/../' + plugin.localPath + '/' + plugin.moduleName + '.zip');
    fileStream.pipe(res);
    fileStream.on('error', function (error) {
      return res.status(500).send(error)
    });
    fileStream.on('close', function () {
      fileStream.destroy();
    });
  });
}

let download = (url, dest) => {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(dest);
    let stream = request({
      /* Here you should specify the exact link to the file you are trying to download */
      uri: url,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
      },
      /* GZIP true for most of the websites now, disable it if you don't need it */
      gzip: true
    }).pipe(file)
      .on('finish', () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      })
  });
};

exports.gitUpload = (req, res) => {
  let gitArchive = req.body.git + "/archive/master.zip";
  let ts = Date.now()
  let dirname = __dirname + "/../plugins/" + ts;
  let pluginFolder = ".";
  let main;
  console.log(ts);
  fsPromises.mkdir("./plugins/" + ts, { recursive: true })
    .then((err) => {
      if (err) throw err;
      console.log("Starting to download");
      return download(gitArchive, dirname + "/file.zip")
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        let temp = fs.createReadStream(dirname + "/file.zip").pipe(unzipper.Extract({ path: dirname }));
        temp.on("close", () => {
          let arr = req.body.git.split("/");
          pluginFolder = dirname + '/' + arr[arr.length - 1] + "-master";
          console.log(pluginFolder);
          resolve();
        })
      });
    })
    .then(() => {
      return fsPromises.access(pluginFolder + '/main.json', fs.constants.F_OK);
    })
    .then(() => {
      return fsPromises.readFile(pluginFolder + '/main.json');
    })
    .then((buffer) => {
      main = JSON.parse(buffer);
      console.log(main);
      return fsPromises.rename(dirname + "/file.zip", pluginFolder + "/" + main.name + ".zip")
    })
    .then((err) => {
      if (req.body.thumbnail != undefined) {
        return fsPromises.writeFile(pluginFolder + '/thumbnail.jpg', req.body.thumbnail);
      } else {
        return fsPromises.readFile(pluginFolder + "/img/unknown.jpg", { encoding: 'base64' }).then((buff => {
          return fsPromises.writeFile(pluginFolder + '/thumbnail.jpg', buff);
        }));
      }
    })
    .then(() => {
      let pluggg = pluginFolder.split("/");
      let path = "./plugin/" + ts + '/' + pluggg[pluggg.length - 1];
      let loc = "./plugins/" + ts + '/' + pluggg[pluggg.length - 1];
      return pluginController.createPlugin(req.user.name, loc, path, req.body.name, main.name, req.body.description, req.body.tags, req.body.categorie, req.body.version, req.body.git)
    })
    .then((plugin) => {
      console.log("Upload request complete, ok");
      return res.status(201).json({
        message: "Message received",
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        message: err
      })
    })
}

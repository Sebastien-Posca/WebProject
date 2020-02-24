const express = require("express");
const controller = require("../controllers/submit");
const router = express.Router();

router.get("/home", (req, res) => res.sendFile(__dirname + '/index.html'));
router.post("/git", controller.upload.single("myFile"), controller.gitUpload);
router.get("/:id", controller.fileDownload);
router.post("/", controller.upload.single("myFile"), controller.fileUpload);


module.exports = router;

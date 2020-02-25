const express = require("express");
const controller = require("../controllers/submit");
const router = express.Router();
const auth = require("../middleware/auth")


router.get("/home", (req, res) => res.sendFile(__dirname + '/index.html'));
router.post("/git", auth, controller.upload.single("myFile"), controller.gitUpload);
router.get("/:id", controller.fileDownload);
router.post("/", auth, controller.upload.single("myFile"), controller.fileUpload);


module.exports = router;

const express = require("express");
const PluginController = require("../controllers/plugin")
const router = express.Router();
const auth = require("../middleware/auth")


router.post("/comment", auth, PluginController.addComment);
router.post("/hasLike", auth, PluginController.hasLike);
router.post("/like", auth, PluginController.addLike);
router.get("/:id", PluginController.getPlugin);
router.get("/", PluginController.getPlugins);


module.exports = router;
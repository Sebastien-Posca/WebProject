const express = require("express");
const PluginController = require("../controllers/plugin")
const router = express.Router();


router.post("/comment", PluginController.addComment);
router.post("/like", PluginController.addLike);
router.get("/:id", PluginController.getPlugin);
router.get("/", PluginController.getPlugins);


module.exports = router;
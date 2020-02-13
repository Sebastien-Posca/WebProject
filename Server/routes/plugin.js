const express = require("express");
const PluginController = require("../controllers/plugin")
const router = express.Router();


router.post("/create", PluginController.createPlugin);
router.get("/:id/:filename", PluginController.servePlugin);
router.get("/:id", PluginController.getPlugin);
router.get("/", PluginController.getPlugins);





module.exports = router;
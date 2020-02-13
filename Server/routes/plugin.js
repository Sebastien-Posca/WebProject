const express = require("express");
const PluginController = require("../controllers/plugin")
const router = express.Router();


router.post("/create", PluginController.createPlugin);
router.get("/", PluginController.getPlugins);
router.get("/:id", PluginController.getPlugin);



module.exports = router;
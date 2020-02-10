const express = require("express");
const UserController = require("../controllers/user")
const router = express.Router();


router.post("/create", UserController.createUser);
router.get("/", UserController.getUsers);
router.post("/login", UserController.login);


module.exports = router;
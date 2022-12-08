const express = require("express");
const router = express.Router();
const usersController = require("../../modules/users");

router.post("/", usersController.getCreateUser);
router.get("/", usersController.getAllUsers);
router.get("/id?", usersController.getUserById);
router.put("/", usersController.getUpdateUser);
router.delete("/?", usersController.getDeleteUser);

module.exports = router;

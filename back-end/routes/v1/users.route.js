const express = require("express");
const router = express.Router();
const usersController = require("../../modules/users");

router.get("/?", usersController.getAllUsers);
router.get("/search?", usersController.getSearchUser);
router.post("/", usersController.getCreateUser);
router.put("/", usersController.getUpdateUser);
router.delete("/?", usersController.getDeleteUser);

module.exports = router;

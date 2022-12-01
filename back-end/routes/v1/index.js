const express = require("express");
const router = express.Router();
const newsRoute = require("./news.route");
const usersRoute = require("./user.route");

router.use("/news", newsRoute);
// router.use("/users", usersRoute);
module.exports = router;

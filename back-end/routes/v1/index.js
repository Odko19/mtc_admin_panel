const express = require("express");
const router = express.Router();
const newsRoute = require("./news.route");
const imageRoute = require("./image.route");
const usersRoute = require("./users.route");
const authRoute = require("./auth.route");

router.use("/news", newsRoute);
router.use("/image", imageRoute);
router.use("/users", usersRoute);
router.use("/login", authRoute);

module.exports = router;

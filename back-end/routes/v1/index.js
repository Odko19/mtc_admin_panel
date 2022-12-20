const express = require("express");
const router = express.Router();
const newsRoute = require("./news.route");
const imageRoute = require("./image.route");
const usersRoute = require("./users.route");
const authRoute = require("./auth.route");
const shareholdersRoute = require("./shareholders.route");
const transparentAccountRoute = require("./transparent_account.route");
const productRoute = require("./product.route");
const oracle = require("../../db/oracle_db/oracle");

router.use("/news", newsRoute);
router.use("/image", imageRoute);
router.use("/users", usersRoute);
router.use("/login", authRoute);
router.use("/shareholders", shareholdersRoute);
router.use("/account", transparentAccountRoute);
router.use("/product", productRoute);

module.exports = router;

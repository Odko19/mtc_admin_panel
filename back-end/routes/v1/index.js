const express = require("express");
const router = express.Router();
const newsRoute = require("./news.route");
const ckeImgRoute = require("./ckeImg.route");
const usersRoute = require("./user.route");

router.use("/news", newsRoute);
router.use("/ckeImage", ckeImgRoute);



module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../../db/db");

router.post("/addmsg", (req, res) => {
  // console.log(req.body);
});
// router.post("/getmsg/", getMessages);

module.exports = router;

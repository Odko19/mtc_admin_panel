const express = require("express");
const app = express();
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

require("dotenv").config();
async function fun() {
  let con;
  try {
    con = await oracledb.getConnection({
      user: "cbsadm",
      password: "uangel123",
      connectString: "10.0.125.9/MTCCBS",
    });
    const data = await con.execute(`SELECT * FROM ut_re_num_mst`);
    console.log(data.rows);
  } catch (err) {
    console.error(err);
  }
}

fun();

const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const db = require("./db/db");

const app = express();

cron.schedule("*/30 * * * * *", async function () {
  const formData = {
    client_id: "vatps",
    grant_type: "password",
    username: "er-2073943",
    password: "Telec0m2023",
  };
  const formBody = new URLSearchParams(formData).toString();
  const response = await axios.post(
    "https://auth.itc.gov.mn/auth/realms/ITC/protocol/openid-connect/token",
    formBody,
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  );

  let query = "select * from mtc_sc_ebarimt_id WHERE 1 = 1";
  const params = [];
  const data = await db.query(query, params);
  //   console.log(data);
});

app.listen(3000, () => {
  console.log("application listening.....");
});

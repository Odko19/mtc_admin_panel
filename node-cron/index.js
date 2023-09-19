const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const db = require("./db/db");

const app = express();
const counter = 0;
cron.schedule("*/30 * * * * *", async function () {
  const query = "SELECT * FROM mtc_sc_ebarimt_id";
  const params = [];
  const data = await db.query(query, params);

  const countQuery = "SELECT count(*) as count FROM mtc_sc_ebarimt_id";
  const count = await db.query(countQuery, params);

  const pageSize = 10; // Set your desired page size here
  const totalPages = Math.ceil(count[0].COUNT / pageSize);

  // Increment the counter by 1
  console.log(totalPages);
  console.log(counter++);

  // for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
  //   const startId = (currentPage - 1) * pageSize;
  //   console.log(`Processing page ${currentPage}, startId: ${startId}`);

  //   // Use startId and pageSize to fetch data for the current page
  //   // You can execute your database query here with appropriate pagination

  //   // Example:
  //   // const queryForPage = `
  //   //   SELECT *
  //   //   FROM mtc_sc_ebarimt_id
  //   //   LIMIT ${startId}, ${pageSize}
  //   // `;
  //   // const dataForPage = await db.query(queryForPage, params);

  //   // Perform your processing with dataForPage
  // }
});

app.listen(3000, () => {
  console.log("application listening.....");
});

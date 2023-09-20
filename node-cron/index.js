const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const db = require("./db/db");

const app = express();

let count = 0;

// Function to increment the counter
function incrementCounter(totalPages) {
  if (count <= totalPages) {
    count++;
    return count;
  }
}
// Ebarimt update function
async function updateDatabase(e, loginName, regNo) {
  const queryUpdate =
    "UPDATE mtc_sc_ebarimt_id SET ebarimt_id = :loginName WHERE REGNO = :regNo";
  const paramsUpdate = [loginName, regNo];

  try {
    const result = await db.query(queryUpdate, paramsUpdate);
    console.log(`Updated database for REGNO: ${e.REGNO}`);
  } catch (error) {
    console.error(`Error updating database for REGNO: ${e.REGNO}`, error);
  }
}

cron.schedule("*/10 * * * * *", async function () {
  try {
    const params = [];
    // page counter
    const pageSize = 1;
    const countQuery = "SELECT count(*) as count FROM mtc_sc_ebarimt_id";
    const count = await db.query(countQuery, params);
    const totalPages = Math.ceil(count[0].COUNT / pageSize);
    const currentPage = incrementCounter(totalPages);
    const startId = (currentPage - 1) * pageSize;

    // data limit
    query = `select * from mtc_sc_ebarimt_id WHERE ebarimt_id IS NULL ORDER BY created_at desc OFFSET :startId  ROWS FETCH NEXT :pageSize ROWS ONLY`;
    params.push(startId, parseInt(pageSize));
    const data = await db.query(query, params);

    // ebarimt get token
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

    // ebarimt get ID
    if (data && response) {
      data.forEach(async (e) => {
        if (e.REGNO) {
          const url = `https://service.itc.gov.mn/api/easy-register/api/info/consumer/${e.REGNO}`;
          try {
            const response2 = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            });
            const loginName = response2.data.loginName;
            const regNo = response2.data.regNo;
            await updateDatabase(e, loginName, regNo);
          } catch (error) {
            const loginName = "not found";
            const regNo = e.REGNO;
            await updateDatabase(e, loginName, regNo);
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("application listening.....");
});

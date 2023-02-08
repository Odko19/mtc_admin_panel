const db = require("../../db/db");

var axios = require("axios");

async function getLoginUser(req) {
  const { firstName, password } = req.body;
  const data = await db.query(
    `select *
      from users where firstName=?`,
    [firstName]
  );
  return {
    data,
  };
}

module.exports = {
  getLoginUser,
};

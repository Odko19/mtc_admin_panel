const db_mtc = require("../../db/db_mtc_admin_panel");

var axios = require("axios");

async function getLoginUser(req) {
  const { firstName, password } = req.body;
  const data = await db_mtc.query(
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

const db = require("../../db/db");

async function getLoginUser(req) {
  const { name, password } = req.body;
  const data = await db.query(
    `select *
    from users where name=?`,
    [name]
  );

  return {
    data,
  };
}

module.exports = {
  getLoginUser,
};

const db_mtc = require("../../db/db_mtc_admin_panel");
const bcrypt = require("bcryptjs");

async function getAllUsers(req) {
  const { id, page, limit } = req.query;
  if (req.query) {
    if (id) {
      const data = await db_mtc.query("SELECT * FROM users WHERE id=?", [id]);
      return {
        ...data[0],
      };
    } else {
      const startId = (page - 1) * limit;
      const data_count = await db_mtc.query(
        "select count(*) as count from users"
      );
      const totalPage = data_count && data_count[0].count / limit;
      const data = await db_mtc.query("select * from users limit ?, ?", [
        JSON.stringify(startId),
        limit,
      ]);
      return {
        success: true,
        totalPages: Math.ceil(totalPage),
        totalDatas: data_count[0].count,
        currentPage: JSON.parse(page),
        currentPageSize: JSON.parse(limit),
        data,
      };
    }
  }
}

async function getCreateUser(req) {
  const { firstName, password, permission, location } = req.body;
  const data = await db_mtc.query(
    "INSERT INTO  users(firstName, password, permission, location) VALUES (?, ?, ?, ?)",
    [firstName, password, permission, location]
  );
  return {
    success: true,
    data,
  };
}

async function getUpdateUser(req) {
  const { id, firstName, password, permission, location } = req.body;
  const data = await db_mtc.query(
    `UPDATE users
     SET firstName=?, password=?, permission=?, location=? WHERE id=?`,
    [firstName, password, permission, location, id]
  );
  return {
    success: true,
    data,
  };
}

async function getDeleteUser(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db_mtc.query("DELETE FROM users where id = ?", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllUsers,
  getCreateUser,
  getUpdateUser,
  getDeleteUser,
};

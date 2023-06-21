const mysql = require("mysql2");
const config = require("./config");
const pool = mysql.createPool(config.db).promise();

async function query(sql, params, ...args) {
  for (var i = 0; i < args.length; ++i) {
    if (args[i] === undefined) args[i] = null;
  }
  const [rows, fields] = await pool.execute(sql, params, args);
  return rows;
}

module.exports = { query };

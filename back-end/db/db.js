const mysql = require("mysql2");
const config = require("./config");
const pool = mysql.createPool(config.db).promise();
const connection = mysql.createConnection(config.db);

async function query(sql, params, ...args) {
  for (var i = 0; i < args.length; ++i) {
    if (args[i] === undefined) args[i] = null;
  }
  const [rows, fields] = await pool.execute(sql, params, args);
  return rows;
}

async function beginTransation() {
  pool.getConnection((err, connection) => {
    connection.beginTransation();
  });
}

async function roleBack() {
  return await connection.roleBack();
}

async function commit() {
  return await connection.commit();
}

async function end() {
  return await connection.end();
}

module.exports = { query, beginTransation, roleBack, commit, end };

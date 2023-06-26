const mysql = require("mysql2/promise");
require("dotenv").config();

const config = {
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
};

async function query(sql, params) {
  let mysqlConnection;
  try {
    mysqlConnection = await mysql.createConnection(config);
    const [rows, fields] = await mysqlConnection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (mysqlConnection) {
      mysqlConnection.end();
    }
  }
}

module.exports = { query };

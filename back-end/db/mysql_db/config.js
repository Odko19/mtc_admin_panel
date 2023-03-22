require("dotenv").config();

const MYSQL_HOST = process.env.HOST_NAME_MYSQL;
const MYSQL_USER = process.env.USER_NAME_MYSQL;
const MYSQL_PASSWORD = process.env.PASSWORD_MYSQL;
const MYSQL_DATABASE = process.env.DATABASE_MYSQL;

const config = {
  db: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
  },
};

module.exports = config;

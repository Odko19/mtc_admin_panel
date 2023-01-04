const oracledb = require("oracledb");
const config = require("./config_oracle");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function query(sql) {
  const connection = await oracledb.getConnection(config.db);
  const { rows } = await connection.execute(sql);
  await connection.commit();
  return rows;
}

async function roleBack() {
  return await connection.roleBack();
}

async function commit() {
  return await connection.commit();
}
module.exports = { query, roleBack, commit };

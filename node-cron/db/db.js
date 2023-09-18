const oracledb = require("oracledb");
const config = require("./config");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function query(sql, params) {
  let oracleConnection;
  try {
    oracleConnection = await oracledb.getConnection(config.db);
    const { rows } = await oracleConnection.execute(sql, params);
    await oracleConnection.commit();
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (oracleConnection) {
      try {
        await oracleConnection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}

module.exports = { query };

const oracle_db = require("../../db/oracle_db/oracle");

async function getAllFeedback(req) {
  const data = await oracle_db.query("select * from MTC_SC_ORDER_FORM ");
  console.log(data);
  console.log(data);
  return {
    data,
  };
}

module.exports = {
  getAllFeedback,
};

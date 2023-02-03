const oracle_db = require("../../db/oracle_db/oracle");

async function getAllPayment(req) {
  const data = await oracle_db.query("Select * from MTC_SC_PAYMENT_TRANS ");
  const data1 = await oracle_db.query(
    "Select * from MTC_SC_PAYMENT_TRANS_DETAIL"
  );
  return {
    data,
    data1,
  };
}

module.exports = {
  getAllPayment,
};

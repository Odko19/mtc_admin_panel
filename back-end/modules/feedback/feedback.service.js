const oracle_db = require("../../db/oracle_db/oracle");

async function getAllFeedback(req) {
  const data = await oracle_db.query(
    `select * from MTC_SC_ORDER_FORM    order by ID OFFSET 1 ROWS FETCH NEXT 6 ROWS ONLY `
  );
  console.log(data);
  return {
    data,
  };
}

module.exports = {
  getAllFeedback,
};

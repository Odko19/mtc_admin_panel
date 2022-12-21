const oracle_db = require("../../db/oracle_db/oracle")

async function getAllResNum(req) {
  const { page, status, limit } = req.query;
  console.log(req.query)
  const startId = (page - 1) * limit;
  const data_count = await oracle_db.query("select count(*) from ut_re_num_mst where STATUS='"+ status +"'");
  const data = await oracle_db.query("select * from ut_re_num_mst where ROWNUM <= '"+limit+"'");
  const data1 = await oracle_db.query("select * from ut_re_num_mst where ROWNUM <= '"+limit+"'" );
  // const data = await oracle_db.query("SELECT * FROM ut_re_num_mst");
console.log(data)
  return {
    success: true,
    data,
  };
}




module.exports = {
  getAllResNum,
};

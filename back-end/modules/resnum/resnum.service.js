const oracle_db = require("../../db/oracle_db/oracle");

async function getAllResNum(req) {
  const { page, limit, number, one, two, value } = req.query;
  const startId = (page - 1) * limit;

  if (page && limit) {
    const mtcs_count = await oracle_db.query(
      "select count(*) as count from RESNUM_USER_PID"
    );
    const totalPage = mtcs_count[0].COUNT / limit;
    const data = await oracle_db.query(
      "select * from RESNUM_USER_PID  order by CREATED_AT OFFSET '" +
        startId +
        "' ROWS FETCH NEXT '" +
        limit +
        "' ROWS ONLY "
    );
    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: mtcs_count[0].count,
      currentPage: JSON.parse(page),
      currentPageSize: JSON.parse(limit),
      data,
    };
  }
  if (number) {
    const data = await oracle_db.query(
      "select ut_re_num_mst.num as RESNUM,ut_re_num_mst.status as STATUS from ut_re_num_mst where NUM = '" +
        number +
        "'"
    );
    Object.assign(data[0], { key: 1, EMAIL: "MTCS" });
    return {
      data,
    };
  }
  // if (one && two && value) {
  //   let data;
  //   console.log(one);
  //   console.log(two);
  //   console.log(value);
  //   if (one === "ALL" && two === "PID") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE PID='" + value + "'"
  //     );
  //   } else if (one === "ALL" && two === "RESNUM") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE RESNUM='" + value + "'"
  //     );
  //   } else if (one === "ALL" && two === "EMAIL") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE EMAIL='" + value + "'"
  //     );
  //   } else if (one === "R" && two === "PID") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE PID='" +
  //         value +
  //         "'AND STATUS = '" +
  //         one +
  //         "'"
  //     );
  //   } else if (one === "R" && two === "RESNUM") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE RESNUM='" +
  //         value +
  //         "'AND STATUS = '" +
  //         one +
  //         "'"
  //     );
  //   } else if (one === "R" && two === "EMAIL") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE EMAIL='" +
  //         value +
  //         "'AND STATUS = '" +
  //         one +
  //         "'"
  //     );
  //   } else if (one === "E" && two === "PID") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE PID='" +
  //         value +
  //         "'AND STATUS = '" +
  //         one +
  //         "'"
  //     );
  //   } else if (one === "E" && two === "RESNUM") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE RESNUM='" +
  //         value +
  //         "'AND STATUS = '" +
  //         one +
  //         "'"
  //     );
  //   } else if (one === "E" && two === "EMAIL") {
  //     data = await oracle_db.query(
  //       "select * from RESNUM_USER_PID WHERE EMAIL='" +
  //         value +
  //         "'AND STATUS = '" +
  //         one +
  //         "'"
  //     );
  //   }
  //   Object.assign(...data, { key: 1 });
  //   return {
  //     data,
  //   };
  // }
}

module.exports = {
  getAllResNum,
};

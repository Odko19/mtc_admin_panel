const oracle_db = require("../../db/oracle_db/oracle");

async function getAllResNum(req) {
  const { page, limit, number, choiceOne, choiceTwo, value, date1, date2 } =
    req.query;
  const startId = (page - 1) * limit;

  if (page && limit) {
    const mtcs_count = await oracle_db.query(
      "select count(*) as count from RESNUM_USER_PID "
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
  if (value) {
    if (choiceOne && value) {
      const startId = (1 - 1) * 10;
      const mtcs_count = await oracle_db.query(
        "select count(*) as count from RESNUM_USER_PID WHERE STATUS='" +
          choiceOne +
          "' AND RESNUM='" +
          value +
          "' "
      );
      const totalPage = mtcs_count[0].COUNT / 10;
      const data = await oracle_db.query(
        "select * from RESNUM_USER_PID WHERE STATUS='" +
          choiceOne +
          "'  AND RESNUM='" +
          value +
          "'   order by CREATED_AT OFFSET '" +
          startId +
          "' ROWS FETCH NEXT 10 ROWS ONLY  "
      );

      return {
        totalPages: Math.ceil(totalPage),
        totalDatas: mtcs_count[0].count,
        currentPage: 1,
        currentPageSize: 10,
        data,
      };
    }
    if (choiceTwo && value) {
      let data;
      choiceTwo === "PID"
        ? (data = await oracle_db.query(
            "select * from RESNUM_USER_PID where PID = '" + value + "'"
          ))
        : (data = await oracle_db.query(
            "select * from RESNUM_USER_PID where EMAIL = '" + value + "'"
          ));

      return {
        data,
      };
    }
    if (date1 && date2 && value) {
      const data = await oracle_db.query(
        "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
          date1 +
          "' AND '" +
          date2 +
          "') AND RESNUM = '" +
          value +
          "' "
      );
      console.log(data);
      return {
        data,
      };
    }
  } else if (choiceOne && choiceTwo) {
    const startId = (1 - 1) * 10;
    const mtcs_count = await oracle_db.query(
      "select count(*) as count from RESNUM_USER_PID WHERE STATUS='" +
        choiceOne +
        "'"
    );
    const totalPage = mtcs_count[0].COUNT / 10;
    let data;
    if (choiceOne === "R") {
      data = await oracle_db.query(
        "select RESNUM_USER_PID.CREATED_AT AS CREATED_AT,  RESNUM_USER_PID.PID, RESNUM_USER_PID.PLACE, RESNUM_USER_PID.EMAIL, RESNUM_USER_PID.STATUS, RESNUM_USER_PID.RESNUM  from RESNUM_USER_PID   WHERE STATUS='" +
          choiceOne +
          "' order by CREATED_AT OFFSET '" +
          startId +
          "' ROWS FETCH NEXT 10 ROWS ONLY  "
      );
    } else {
      data = await oracle_db.query(
        "select * from RESNUM_USER_PID WHERE STATUS='" +
          choiceOne +
          "' order by CREATED_AT OFFSET '" +
          startId +
          "' ROWS FETCH NEXT 10 ROWS ONLY  "
      );
    }

    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: mtcs_count[0].count,
      currentPage: 1,
      currentPageSize: 10,
      data,
    };
  }
  if (number) {
    // const data = await oracle_db.query(
    //   "select ut_re_num_mst.num as RESNUM,ut_re_num_mst.status as STATUS from ut_re_num_mst where NUM = '" +
    //     number +
    //     "'"
    // );
    const data = await oracle_db.query(
      "select ut_re_num_mst.num as RESNUM,ut_re_num_mst.status as STATUS from ut_re_num_mst WHERE STATUS = 'R' and NUM = '" +
        number +
        "'"
    );
    Object.assign(data[0], { EMAIL: "MTCS" });
    return {
      data,
    };
  }

  if (date1 && date2) {
    let data;
    const startId = (1 - 1) * 10;
    const mtcs_count = await oracle_db.query(
      "select count(*) as count from RESNUM_USER_PID "
    );
    const totalPage = mtcs_count[0].COUNT / 10;
    data = await oracle_db.query(
      "select * from RESNUM_USER_PID WHERE CREATED_AT BETWEEN '" +
        date1 +
        "' AND '" +
        date2 +
        "' order by CREATED_AT OFFSET '" +
        startId +
        "' ROWS FETCH NEXT 10 ROWS ONLY  "
    );

    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: mtcs_count[0].count,
      currentPage: 1,
      currentPageSize: 10,
      data,
    };
  }
}

module.exports = {
  getAllResNum,
};

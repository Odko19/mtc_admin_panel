const oracle_db = require("../../db/oracle_db/oracle");
const moment = require("moment");

async function getAllResNum(req) {
  const {
    page,
    limit,
    number,
    choiceOne,
    choiceTwo,
    value,
    dateOne,
    dateTwo,
    all,
  } = req.query;

  if (req.query) {
    if (all) {
      const data = await oracle_db.query("select * from RESNUM_USER_PID");
      return {
        data,
      };
    }
    if (number) {
      const data = await oracle_db.query(
        "select ut_re_num_mst.num as RESNUM,ut_re_num_mst.status as STATUS from ut_re_num_mst where NUM = '" +
          number +
          "'"
      );

      Object.assign(data[0], { EMAIL: "MTCS" });
      return {
        data,
      };
    }
    if (page && limit) {
      const startId = (page - 1) * limit;
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
      if (choiceOne && choiceTwo && dateOne && dateTwo && value) {
        if (choiceOne === "ALL" && choiceTwo === "RESNUM") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND RESNUM = '" +
              value +
              "' "
          );
          return {
            data,
          };
        } else if (choiceOne === "ALL" && choiceTwo === "PID") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND PID = '" +
              value +
              "' "
          );
          return {
            data,
          };
        } else if (choiceOne === "ALL" && choiceTwo === "EMAIL") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND EMAIL = '" +
              value +
              "' "
          );
          return {
            data,
          };
        } else if (choiceOne === "A" && choiceTwo === "RESNUM") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND RESNUM = '" +
              value +
              "' AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "A" && choiceTwo === "PID") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND PID = '" +
              value +
              "' AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "A" && choiceTwo === "EMAIL") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND EMAIL = '" +
              value +
              "' AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "R" && choiceTwo === "RESNUM") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND RESNUM = '" +
              value +
              "' AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "R" && choiceTwo === "PID") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND PID = '" +
              value +
              "' AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "R" && choiceTwo === "EMAIL") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
              dateOne +
              "' AND '" +
              dateTwo +
              "') AND EMAIL = '" +
              value +
              "' AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        }
      }
      if (choiceOne && choiceTwo && value) {
        if (choiceOne === "ALL" && choiceTwo === "RESNUM") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE RESNUM = '" + value + "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "ALL" && choiceTwo === "PID") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE PID = '" + value + "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "ALL" && choiceTwo === "EMAIL") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE EMAIL = '" + value + "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "A" && choiceTwo === "RESNUM") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE RESNUM = '" +
              value +
              "'AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "A" && choiceTwo === "PID") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE PID = '" +
              value +
              "'AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "A" && choiceTwo === "EMAIL") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE EMAIL = '" +
              value +
              "'AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "R" && choiceTwo === "RESNUM") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE RESNUM = '" +
              value +
              "'AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "R" && choiceTwo === "PID") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE PID = '" +
              value +
              "'AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        } else if (choiceOne === "R" && choiceTwo === "EMAIL") {
          const data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE EMAIL = '" +
              value +
              "'AND STATUS  = '" +
              choiceOne +
              "'"
          );
          return {
            data,
          };
        }
      }
    } else {
      if (dateOne && dateTwo) {
        const startId = (1 - 1) * 8;
        const mtcs_count = await oracle_db.query(
          "select count(*) as count from RESNUM_USER_PID "
        );
        const totalPage = mtcs_count[0].COUNT / 8;
        const data = await oracle_db.query(
          "select * from RESNUM_USER_PID WHERE (CREATED_AT BETWEEN '" +
            dateOne +
            "' AND '" +
            dateTwo +
            "')  order by CREATED_AT OFFSET '" +
            startId +
            "' ROWS FETCH NEXT 10 ROWS ONLY"
        );
        return {
          totalPages: Math.ceil(totalPage),
          totalDatas: mtcs_count[0].count,
          currentPage: JSON.parse(1),
          currentPageSize: JSON.parse(8),
          data,
        };
      }
      if (choiceOne) {
        let data;
        const startId = (1 - 1) * 8;
        const mtcs_count = await oracle_db.query(
          "select count(*) as count from RESNUM_USER_PID WHERE STATUS='" +
            choiceOne +
            "'"
        );
        const totalPage = mtcs_count[0].COUNT / 8;

        if (choiceOne === "ALL") {
          data = await oracle_db.query(
            "select * from RESNUM_USER_PID order by CREATED_AT OFFSET '" +
              startId +
              "' ROWS FETCH NEXT 10 ROWS ONLY"
          );
        } else if (choiceOne === "R") {
          const result = await oracle_db.query(
            "select  RESNUM_USER_PID.CREATED_AT  AS CREATED_AT,  RESNUM_USER_PID.PID, RESNUM_USER_PID.PLACE, RESNUM_USER_PID.EMAIL, RESNUM_USER_PID.STATUS, RESNUM_USER_PID.RESNUM from RESNUM_USER_PID   WHERE STATUS='" +
              choiceOne +
              "' order by CREATED_AT OFFSET '" +
              startId +
              "' ROWS FETCH NEXT 8 ROWS ONLY  "
          );

          data = result.map((e) => {
            return {
              CREATED_AT: e.CREATED_AT,
              EXPIRES_AT: moment(
                new Date(e.CREATED_AT).setDate(
                  new Date(e.CREATED_AT).getDate() + 5
                ) -
                  Math.ceil(
                    Math.abs(
                      new Date(e.CREATED_AT) -
                        new Date(e.CREATED_AT).setDate(
                          new Date(e.CREATED_AT).getDate() + 5
                        )
                    ) /
                      (1000 * 60 * 60 * 24)
                  )
              ).format("YYYY-MM-DD hh:mm:ss"),
              PID: e.PID,
              PLACE: e.PLACE,
              EMAIL: e.EMAIL,
              STATUS: e.STATUS,
              RESNUM: e.RESNUM,
            };
          });
        } else {
          data = await oracle_db.query(
            "select * from RESNUM_USER_PID WHERE STATUS='" +
              choiceOne +
              "' order by CREATED_AT OFFSET '" +
              startId +
              "' ROWS FETCH NEXT 8 ROWS ONLY  "
          );
        }
        return {
          totalPages: Math.ceil(totalPage),
          totalDatas: mtcs_count[0].count,
          currentPage: 1,
          currentPageSize: 8,
          data,
        };
      }
    }
  }
}

module.exports = {
  getAllResNum,
};

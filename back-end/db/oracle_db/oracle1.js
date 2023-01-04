const oracledb = require("oracledb");
const config = require("./config_oracle");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

require("dotenv").config();

async function fun() {
  let con;
  const id = 4;
  const name = "datatdada";
  try {
    con = await oracledb.getConnection({
      user: "cbsadm",
      password: "uangel123",
      connectString: "10.0.125.9/MTCCBS",
    });

    let data = await con.execute(
      "UPDATE MTC_SELF_ORDER_FORM SET FIRST_NAME ='" +
        name +
        "' WHERE ID ='" +
        id +
        "'"
    );
    con.commit();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
fun();

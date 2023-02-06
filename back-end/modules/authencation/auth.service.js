const db = require("../../db/db");
var axios = require("axios");

async function getLoginUser(req) {
  const { firstName, password } = req.body;

  // var data1 = JSON.stringify({
  //   user: firstName,
  //   password: password,
  // });

  // var config = {
  //   method: "post",
  //   maxBodyLength: Infinity,
  //   url: "http://10.0.125.17:88/api/v1/auth/login",
  //   headers: {
  //     Authorization: "Basic TVRVQjAwNzA0NToxMTExMTE=",
  //     "Content-Type": "application/json",
  //   },
  //   data: data1,
  // };

  // axios(config)
  //   .then(function (response) {
  //     console.log("data", response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const data = await db.query(
    `select *
    from users where firstName=?`,
    [firstName]
  );
  return {
    data,
  };
}

module.exports = {
  getLoginUser,
};

const db = require("../../db/db");

var axios = require("axios");

async function getLoginUser(req) {
  const { firstName, password } = req.body;
  let data;
  // var data1 = JSON.stringify({
  //   // user: "MTUB007045",
  //   // password: "111111",
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

  //  axios(config)
  //   .then(function (response) {
  //     if (response.status === 200) {
  //       // data = db.query(
  //       //   `INSERT INTO  users(firstName, password, permission) VALUES (?, ?, ?)`,
  //       //   [firstName, password, ["test"]]
  //       // );
  //       return (data = db.query(
  //         `select *
  //         from users where firstName=?`,
  //         [firstName]
  //       ));
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error.response.status);
  //   });
  data = await db.query(
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

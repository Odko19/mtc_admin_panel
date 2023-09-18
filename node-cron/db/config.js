require("dotenv").config();

const HOST_NAME_ORACLE = process.env.HOST_NAME_ORACLE;
const PASSWORD_ORACLE = process.env.PASSWORD_ORACLE;
const USER_NAME_ORACLE = process.env.USER_NAME_ORACLE;

const config_oracle = {
  db: {
    user: USER_NAME_ORACLE,
    password: PASSWORD_ORACLE,
    connectString: HOST_NAME_ORACLE,
  },
};

module.exports = config_oracle;

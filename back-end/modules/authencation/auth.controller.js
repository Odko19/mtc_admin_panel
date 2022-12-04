const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authServices = require("./auth.service");
const TOKEN_KEY = process.env.TOKEN_KEY;

const getLoginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (Object.values(name).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user is provided",
      });
    } else {
      const foundUser = await authServices.getLoginUser(req);
      const validPassword = foundUser.data[0].password;
      const validName = foundUser.data[0].name;
      if (await bcrypt.compare(password, validPassword)) {
        const token = jwt.sign(
          {
            user_name: validName,
          },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: {
            name: name,
          },
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          data: "Name or Password do not match",
        });
      }
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getLoginUser,
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authServices = require("./auth.service");
const TOKEN_KEY = process.env.TOKEN_KEY;

const getLoginUser = async (req, res) => {
  try {
    const { firstName, password } = req.body;
    console.log(firstName, password);
    if (Object.values(firstName).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user is provided",
      });
    } else {
      const foundUser = await authServices.getLoginUser(req);
      console.log(foundUser);
      const validPassword = foundUser.data[0].password;
      const validName = foundUser.data[0].firstName;
      const validPermission = foundUser.data[0].permission;
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
            firstName: validName,
            permission: validPermission,
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

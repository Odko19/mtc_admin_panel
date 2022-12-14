const imageServices = require("./images.service");

const getCreateImage = async (req, res) => {
  try {
    res.json(await imageServices.getCreateImage(req));
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getCreateFile = async (req, res) => {
  try {
    res.json(await imageServices.getCreateFile(req));
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getCreateImage,
  getCreateFile,
};

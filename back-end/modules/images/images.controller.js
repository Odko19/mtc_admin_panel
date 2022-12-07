const imageServices = require("./images.service");

const getAllNews = async (req, res) => {
  try {
    const image = await imageServices.getAllNews(req);
    res.json(image);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getCreateImage = async (req, res) => {
  try {
    res.json(await imageServices.getCreateImage(req));
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getCreateImage,
};

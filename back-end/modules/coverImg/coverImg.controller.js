const newsServices = require("./coverImg.service");

const getAllCoverImg = async (req, res) => {
  try {
    const news = await newsServices.getAllCoverImg(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getCreateCoverImg = async (req, res) => {
  try {
    const news = await newsServices.getCreateCoverImg(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getUpdateCoverImg = async (req, res) => {
  try {
    const news = await newsServices.getUpdateCoverImg(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getDeleteCoverImg = async (req, res) => {
  try {
    const news = await newsServices.getDeleteCoverImg(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllCoverImg,
  getCreateCoverImg,
  getUpdateCoverImg,
  getDeleteCoverImg,
};

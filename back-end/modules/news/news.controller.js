const newsServices = require("./news.service");

const getAllNews = async (req, res) => {
  try {
    const news = await newsServices.getAllNews(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getNewsById = async (req, res) => {
  try {
    const news = await newsServices.getNewsById(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getNewsPage = async (req, res) => {
  try {
    const news = await newsServices.getNewsPage(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getCreateNews = async (req, res) => {
  try {
    const news = await newsServices.getCreateNews(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getUpdateNews = async (req, res) => {
  try {
    const news = await newsServices.getUpdateNews(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getDeleteNews = async (req, res) => {
  try {
    const news = await newsServices.getDeleteNews(req);
    res.json(news);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  getNewsPage,
  getCreateNews,
  getUpdateNews,
  getDeleteNews,
};

const productServices = require("./product.service");

const getAllProduct = async (req, res) => {
  try {
    const product = await productServices.getAllProduct(req);
    res.json(product);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getCreateProduct = async (req, res) => {
  try {
    const product = await productServices.getCreateProduct(req);
    res.json(product);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getUpdateProduct = async (req, res) => {
  try {
    const product = await productServices.getUpdateProduct(req);
    res.json(product);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getDeleteProduct = async (req, res) => {
  try {
    const product = await productServices.getDeleteProduct(req);
    res.json(product);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllProduct,
  getCreateProduct,
  getUpdateProduct,
  getDeleteProduct,
};

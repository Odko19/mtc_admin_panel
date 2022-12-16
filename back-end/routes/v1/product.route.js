const express = require("express");
const router = express.Router();
const productController = require("../../modules/product");
const file = require("../../helpers/image-uploader");

router.get("/?", productController.getAllProduct);
router.post(
  "/",
  file.upload.array("product_img"),
  productController.getCreateProduct
);
router.put(
  "/",
  file.upload.array("product_img"),
  productController.getUpdateProduct
);
router.delete("/?", productController.getDeleteProduct);

module.exports = router;

Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.productApiContentType = "application/json";
exports.apiMethodTypeGet = "GET";
exports.apiMethodTypePut = "PUT";
exports.apiMethodTypePost = "POST";

exports.productAPiEndPoint = "catalogue/catalogues";
// Customizable Area End
exports.subscriber = "subscriber";

exports.productListApiEndPoint =
  "/bx_block_catalogue/catalogues?brand_id=11&category_id=1&sub_category_id=1";

exports.brandListApiEndPoint = "/bx_block_catalogue/brands";
exports.categoryListApiEndPoint = "/bx_block_categories/categories";
exports.putActiveStatusEndPointAPi = "/bx_block_catalogue/catalogues/";

// handle validation error
exports.errorProductName = "Please Enter Product Name";
exports.errorSku = "Please Enter Sku";
exports.errorCategory = "Please Select Category";
exports.errorBrand = "Please Select Brand";
exports.errorStatus = "Please Select Status";
exports.errorVariationName = "Please Enter Name";
exports.errorVariationCode = "Please Enter Code";

exports.catalogueCreateEndPointApi = "/bx_block_catalogue/catalogues";

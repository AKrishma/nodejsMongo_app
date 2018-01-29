const productService = require('./products.service');
const vendorCtrl = require('../vendor/vendor.controller');
const async = require('async');

const addNewProduct = function(newProduct, done) {
  productService.addNewProduct(newProduct, done);
}

const submitReview = function(productCode, reviewObj, done) {
	productService.submitNewReview(productCode, reviewObj, done);
}

const getProducts = function(done) {
  productService.getProducts(done);
}

const getFullProductObject = function(product, done) {
	let prod = product;
	vendorCtrl.findVendorByCode(prod.vendorCode, (err, res) => {
		prod.vendorCode = res;
		done(null, prod);
	});
}

const findProductByCode = function(productCode, done) {
	async.waterfall([
		productService.findProductByCode.bind(null, productCode),
		getFullProductObject
	], (err, result) => {
		if(err) {
			console.log('Error in finding product by code, Error: '+err);
			done(err);
			return;
		}
		done(null,result);
	});
}

module.exports = {
  addNewProduct,
  getProducts,
  submitReview,
  findProductByCode
}
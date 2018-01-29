const VendorModel = require('./vendor.entity');

const addNewVendor = function(newVendor, done) {
  let vendor = new VendorModel();
  vendor.vendorName = newVendor.vendorName;
  vendor.vendorCode = newVendor.vendorCode;
  vendor.email = newVendor.email;
  vendor.sellerRank = newVendor.sellerRank;

  vendor.save(function(err, savedDoc) {
    if (err) {
      console.error("Error in adding new vendor, ERROR::", err);
      done(err);
    } else {
      done(null, savedDoc);
      return
    }
  });
}

const getVendors = function(done) {
  let query = {};
  let fieldOptions = null;
  let page = 1;
  let limit = 10;

  VendorModel
    .find(query)
    .sort({ "addedOn": -1 })
    .select(fieldOptions)
    .skip((page > 0) ? limit * (page - 1) : 0)
    .limit(limit)
    .exec((err, colln) => {
      if (err) {
        console.error('Error in finding vendor, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, colln);
    });
}

const findVendorByCode = function(vendorCode, done) {
  let query = { "code": vendorCode };
    
    VendorModel
        .findOne(query)
        .exec((err, colln) => {
            if(err) {
                console.error("Error in finding vendor", vendorCode," ERROR:", err);
                done(err);
            } else {
                done(null, colln);
                return;
            }
        });
}

module.exports = {
  addNewVendor,
  getVendors,
  findVendorByCode
}
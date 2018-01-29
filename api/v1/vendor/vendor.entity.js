const mongoose = require('mongoose');


let schema = new mongoose.Schema({
  name: { type: String, required: true },
  // REFERENCE
  vendorCode: { type: String, require: true },
  email: { type: String, require: true },
  sellerRank: { type: Number },
  addedOn: { type: Date, default: Date.now },
}, { collection: 'vendor' });

schema.statics = {
  // methods which operate at collection
  // Caution: cannot use arrow functions
  // Eg: findByVendor
}

schema.methods = {
  // method which operate on the instance or at document
  // Caution: cannot use arrow functions
  // Eg: getDiscountedPrice
}


// Composite Unique key
schema.index({
  vendorCode: 1,
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("vendor", schema);





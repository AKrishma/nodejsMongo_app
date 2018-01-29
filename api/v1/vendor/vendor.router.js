const router = require('express').Router();
const vendorCtrl = require('./vendor.controller');

/**
 * Effective URL is POST /products/
 *
 * This API adds a new product to the catalog
 */
router.post('/', function(req, res) {
  try {
    let newVendor = req.body;
    vendorCtrl.addNewVendor(newVendor, function(err, result) {
      if (err) {
        console.error('Error in adding new product, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and try again..!' });
        return;
      }
      res.status(201).send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in adding new product, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

/**
 * Effective URL is GET /vendor/
 *
 * This API finds product(s) in the catalog
 */
router.get('/', function(req, res) {
  try {
    vendorCtrl.getVendors(function(err, result) {
      if (err) {
        console.error('Error in GET of products, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try later..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in GET of products, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

router.post('/:vendorCode', function(req, res) {
  try {
    vendorCtrl.findVendorByCode(req.params.vendorCode, function(err, result) {
      if (err) {
        console.error('Error in GET of products, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try later..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in GET of products, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});


module.exports = router;
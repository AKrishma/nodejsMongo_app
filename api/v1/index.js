const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/vendor', require('./vendor'));

module.exports = router;
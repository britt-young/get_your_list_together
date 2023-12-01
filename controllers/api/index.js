//using router.use
const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const productRoutes = require('./productRoutes');

router.use('/users', loginRoutes);
router.use('/products', productRoutes);

module.exports = router;

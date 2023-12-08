//using router.use
const router = require('express').Router();
const loginRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

router.use('/users', loginRoutes);
router.use('/products', productRoutes);

module.exports = router;

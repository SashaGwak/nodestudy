const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// admin/add-product
router.get('/add-product', adminController.getAddProduct);
// admin/product
router.get('/products', adminController.getAddProduct);

// admin/add-prouct(POST)
router.post('/add-product', adminController.postAddProduct);

module.exports = router;

/*
// until로 경로 가져오는 경우
// const rootDir = require('../util/path');
router.get('/add-product', (req, res, next) => {
    // until로 경로 가져오는 경우
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // ___dirname로 경로 가져오는 경우
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
})

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})
*/

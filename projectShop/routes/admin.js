const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// 상품 추가 페이지
router.get('/add-product', adminController.getAddProduct);

// 상품 관리 페이지
router.get('/products', adminController.getProducts);

// 상품 추가 기능
router.post('/add-product', adminController.postAddProduct);

// 상품 정보 변경 페이지
router.get('/edit-product/:productId', adminController.getEditProduct);

// 상품 정보 변경 기능
router.post('/edit-product', adminController.postEditProduct);

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

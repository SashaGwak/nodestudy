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

// 상품 삭제 기능
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;

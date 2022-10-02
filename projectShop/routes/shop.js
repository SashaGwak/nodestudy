const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// 상품 페이지
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// 장바구니 페이지
router.get('/cart', shopController.getOrders);

// 주문 페이지
router.get('/orders', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

module.exports = router;

const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// 상품 페이지
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// 제품별 상세 페이지
router.get('/products/:productId', shopController.getProduct);

// 장바구니 페이지
router.get('/cart', shopController.getCart);

// 장바구니 추가 기능
router.post('/cart', shopController.postCart);

// 장바구니 삭제 기능
router.post('/cart-delete-item', shopController.postCartDelete);

// 주문 기능
router.post('/create-order', shopController.postOrder);

// 주문 페이지
router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;

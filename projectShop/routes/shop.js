const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// 상품 페이지
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// 만약 아래와 같은 경로가 있다면 꼭 :productId보다 먼저 써야 한다는 것 (위에서 아래로 탐색하기 때문에 뒤에 쓰면 코드가 실행될 수 없음)을 기억하기 !! 
// router.get('/products/detele', shopController.getProducts);

// 제품별 상세 페이지
router.get('/products/:productId', shopController.getProduct);

// 장바구니 페이지
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

// 주문 페이지
router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;

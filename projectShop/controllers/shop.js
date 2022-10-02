const Product = require('../models/product');

// 검색 후 상품 보여주기
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

// index 렌더링
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

// 장바구니 렌더링
exports.getCart = (req, res, next) => {
    res.render('shop/cart' , {
        path: '/cart', 
        pageTitle: 'Your Cart'
    })
}

// 주문 렌더링
exports.getOrders = (req, res, next) => {
    res.render('shop/orders' , {
        path: '/orders', 
        pageTitle: 'Your Orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout' , {
        path: '/checkout', 
        pageTitle: 'Checkout'
    })
}
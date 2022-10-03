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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // routes에서 /products/:productId 지정해줬기 때문에 params에서 사용가능
  Product.findById(prodId, product => {
    console.log(product);
    // 불러온 제품의 세부 정보
    res.render('shop/product-detail', {
      product: product, 
      pageTitle: product.title, 
      path: '/products'
    });
  })
}


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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; 
  console.log(prodId);
  res.redirect('/cart');
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
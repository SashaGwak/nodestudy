const Product = require('../models/product');
const Cart = require('../models/cart');

// 검색 후 상품 보여주기
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  })
  .catch(err => {
    console.log(err);
  })
};

// 제품 상세 페이지 
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

// index 렌더링
exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  })
  .catch(err => {
    console.log(err);
  })
};

// 장바구니 렌더링
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
      .then(products => {
        res.render('shop/cart' , {
          path: '/cart', 
          pageTitle: 'Your Cart', 
          products: products
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

// 장바구니 추가 기능
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; 
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

// 장바구니 삭제 기능
exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId; 
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
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
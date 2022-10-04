const Product = require('../models/product');

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
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      // 이미 있는 상품인 경우
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      // 새제품인 경우
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
        // quantity가 newQuantity로 설정됨
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


// 장바구니 삭제 기능
exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId; 
  req.user 
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId}}); 
    })
    .then(products => {
      const product = products[0]; 
      return product.cartItem.destroy(); 
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

// 주문 기능 
exports.postOrder = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            }));
        })
        .catch(err => console.log(err)); 
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
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
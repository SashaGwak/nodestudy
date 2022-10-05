const Product = require('../models/product');

// 검색 후 상품 보여주기
exports.getProducts = (req, res, next) => {
  Product.find()
  // mongoose에서 find는 여기서 product를 줌(모든 제품을 자동으로 받음)
  .then(products => {
    console.log(products);
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
  Product.findById(prodId)
  // findById도 몽구스 메서드
  // findById에 문자열을 전달하면 몽구스가 알아서 ObjectId로 변환
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
  Product.find()
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
  Product.findById(prodId)
    .then(product => {
      // user에서 정의한 장바구니 메서드
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result); 
      res.redirect('/cart'); 
    })
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
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
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
      // 장바구니 비우기
      return fetchedCart.setProducts(null); 
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

// 주문 렌더링
exports.getOrders = (req, res, next) => {
  req.user
  .getOrders({include: ['products']})
    .then(orders => {
      console.log(orders);
      res.render('shop/orders' , {
          path: '/orders', 
          pageTitle: 'Your Orders',
          orders: orders
      })
    })
    .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout' , {
        path: '/checkout', 
        pageTitle: 'Checkout'
    })
}
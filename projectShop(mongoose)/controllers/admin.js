const Product = require('../models/product');

// 상품 추가 페이지 
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

// 상품 추가 기능
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // 모델에 기반해 새제품을 생성
  const product = new Product({title, price, description, imageUrl, userId: req.user });
  product
    // mongoose가 제공하는 save 메서드
    .save()
    .then(result => {
      //console.log(result);
      console.log("Created Product");
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

// 상품 편집 페이지 
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

// 상품 편집 기능
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId)
  // findById를 통해 디비에서 제품정보를 가져온 뒤(몽구스에서 몽구스객체로 가져오는 것 -> save쓰려고)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
      // 기존에 있는 객체에 save 호출하여 업데이트 해준 것 
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

// 상품 관리 페이지
exports.getProducts = (req, res, next) => {
  Product.find()
    // mongoose에서 find는 여기서 product를 줌(모든 제품을 자동으로 받음)

    // .select('title price -_id')
    // 가져온 정보에서 title, price 속성만 가져오고 _id는 안가져오겠다는 의미! 
    // id 는 명시적으로 제거하지 않으면 항상 가져옴! 
    
    // .populate('userId', 'name')
    // populate('세부내용 원하는필드', '가져오고싶은 속성')
    // find 다음에 추가할 수 있는 populate 메소드 
    // populate는 몽구스에게 특정필드의 관련정보를 모두 가져오도록 알리는 기능 -> 여기서는 원래 userId objectId만 가져왔었는데 user의 이름, 이메일등 유저 정보까지 모두 가져오게됨 약간 조인이랑 비슷한듯
    .then(products => {
      // console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

// 상품 삭제기능
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
  // findByIdAndRemove 몽구스 내장메서드로 문서를 제거하는 역할
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

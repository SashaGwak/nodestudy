const Product = require('../models/product');

// 상품 추가 페이지 
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

// 상품 추가 기능
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // 모델에 기반해 새제품을 생성
  const product = new Product({title, price, description, imageUrl});
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
        product: product
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
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
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
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
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

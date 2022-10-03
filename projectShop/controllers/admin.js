const Product = require('../models/product');

// 상품 추가 페이지 
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false, 
  });
};

// 상품 추가 기능
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // creat테이블명
  // hasMany 관계설정을 해주어 사용가능
  req.user // userId 도 넣어주게됨
    .createProduct({
      title: title, 
      imageUrl: imageUrl, 
      price: price, 
      description: description, 
    })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

// 상품 편집 페이지 
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId; 
  Product.findByPk(prodId)
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
  const newObj = { 
    title : req.body.title, 
    price : req.body.price, 
    imageUrl :req.body.imageUrl, 
    description : req.body.description
  }
  Product.update(newObj, {where: {id: req.body.productId}})
  .then((result) => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}

// 상품 삭제기능
exports.postDeleteProduct = (req, res, next) => {
  Product.destroy({
    where: {id: req.body.productId}})
    .then((result) => {
      console.log("DELETE PRODUCT");
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

};

// 상품 관리 페이지
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  })
  .catch(err => {console.log(err)});
};
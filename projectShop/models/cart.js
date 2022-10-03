const fs = require('fs'); 
const path = require('path'); 

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
); 

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            // 오류가 발생하면 카트 없는 것이므로 생성해줌
            let cart = {products: [], totalPrice: 0}; 
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updeatedProduct; 
            if (existingProduct) {
                // 이미 존재하는 상품
                updeatedProduct = {...existingProduct}; 
                updeatedProduct.qty = updeatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updeatedProduct;
            } else {
                // 새로운 상품 
                updeatedProduct = { id:id, qty: 1};
                cart.products = [...cart.products, updeatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            // +productPrice로 숫자 처리해줌 
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        }); 
    }
}
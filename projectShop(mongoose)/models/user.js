const mongoose = require('mongoose'); 
const product = require('./product');

const Schema = mongoose.Schema; 

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String, 
    required: true
  }, 
  cart: {
    items: [
      { 
        productId: {type: Schema.Types.ObjectId, ref:'product', required: true}, 
        quanitity: {type: Number, required: true}
      }
    ]
  }
})

// 장바구니 담는 메서드 추가 
userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  }); 
  let newQuantity = 1; 
  const updatedCartItems = [...this.cart.items]; 
  // 만약 이미 담긴 물건이라면 
  if (cartProductIndex >= 0){
    newQuantity = this.cart.items[cartProductIndex].quanitity + 1; 
    updatedCartItems[cartProductIndex].quanitity = newQuantity; 
  } else {
    updatedCartItems.push({
      // 카트 담는거니까 카트 내 아이템즈와 동일하게 맞춰줘야함 
      productId : product._id,
      quanitity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  }; 
  this.cart = updatedCart; 
  return this.save();
}
// methods로 메서드를 추가할 수 있음

module.exports = mongoose.model('User', userSchema);
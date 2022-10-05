const mongoose = require('mongoose');

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
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

// 장바구니 담는 메서드 추가 
userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  // 만약 이미 담긴 물건이라면 
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      // 카트 담는거니까 카트 내 아이템즈와 동일하게 맞춰줘야함 
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};
// methods로 메서드를 추가할 수 있음

// 장바구니 물건 삭제 메서드 추가 
userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  }); 
  this.cart.items = updatedCartItems;
  return this.save();
}

// 장바구니 삭제 메서드 추가 
userSchema.methods.clearCart = function() {
  this.cart = { items: []}; 
  return this.save(); 
}

module.exports = mongoose.model('User', userSchema);
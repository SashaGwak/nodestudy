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
        productId: {type: Schema.Types.ObjectId}, 
        quanitity: {type: Number, required: true}
      }
    ]
  }
})

module.exports = mongoose.model('User', userSchema);
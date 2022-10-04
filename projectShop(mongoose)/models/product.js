const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

// 스키마 생성자를 사용해 새로운 스키마를 생성
const productSchema = new Schema({
  title: {
    type: String,
    required: true
    // 모든 객체가 title을 가지도록함
  }, 
  price: {
    type: Number, 
    required: true
  }, 
  description: {
    type: String, 
    required: true
  }, 
  imageUrl : {
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema);
// model('모델명', 정의한 스키마)는 mongoose가 스키마에 연결하는 것을 도움 
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
  },
  // 사용자에 대한 참조 
  userId: {
    // 사용자 정보의 아이디만 몽구스가 빼내줌 
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true
    // ref는 문자열을 가지며 몽구스에게 해당필드에 데이터에 실제로 연관된 다른 몽구스 모델이 뭔지 알려줌  
    // 즉 User모델을 참조하며 상관관계 정의한 것
  }
})

module.exports = mongoose.model('Product', productSchema);
// model('모델명', 정의한 스키마)는 mongoose가 스키마에 연결하는 것을 도움 
// 컬렉션 이름은 products로 소문자, 복수형으로 자동 생성됨
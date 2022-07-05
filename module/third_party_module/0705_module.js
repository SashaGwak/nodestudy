// 서드파티 모듈 사용 하기 
// 1. npm(Node Package Manager) install 모듈명 (터미널)
const cowsay = require('cowsay');
// 2. require('모듈명')으로 로드 가능

// cowsay의 say()함수 호출 
console.log(cowsay.say({
    text : "I love javascript",
}));
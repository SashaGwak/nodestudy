//module -> js 파일 하나 의미
// function add(a, b) {
//     return a + b;
// }

// 모듈 내부의 내용을 외부로 공개해줘야 외부에서 사용할 수 있음
// exports.plus = add;
// exports.모들 외부로 공개할 이름 = 모듈 내부에서의 이름 

// *모듈 하나씩 공개하는 방법
// exports.PI = 3.14;
// exports.add = function add(a, b) {return a + b; };
// exports.subtract = function subtract(a, b) {return a - b; };
// exports.multiply = function multiply(a, b) { return a * b; };
// exports.divide = function divide(a, b) {return a / b ;};

// *모듈로 객체 만들어서 공개하는 방법 
let calculator = {
    PI: 3.14,
    add: (a, b) => a + b, 
    subtract: (a, b) => a - b, 
    multipy: (a, b) => a * b, 
    divide: (a, b) => a / b,
};

// 모듈로 객체 만들어서 공개하는 경우 꼭!!!module.exports 사용!!! 
module.exports = calculator;
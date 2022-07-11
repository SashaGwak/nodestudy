const m = require('./0708_module.js');

// console.log(m.getFactorial(5));

// 동기 실행
const fs = require('fs');

// console.log('Start');

// let content = fs.readFileSync('module/practice/new', 'utf8');
// // 현재 디렉토리에 있는 new라는 파일의 내용을 읽음
// // readFileSync() : 파일의 내용을 읽어서 리드하는 함수
// // 두번째 인자는 인코딩 방법 정해주는 것

// console.log(content);

// console.log('Finish');

// 비동기 실행 !! 
console.log('Start');

fs.readFile('module/practice/new', 'utf8', (error, data) => {
    console.log(data);
})

console.log('Finish');

// readFileSync 함수 -> 동기 실행(특수한 경우에 사용)
// readFile 함수 -> 비동기 실행 **(보통 비동기 권장)

// 비동기 함수 하나 더! 
// setTimeout(callback, milliseconds) 
// -> milliseconds(1000분의 1초)후에 callback 인자에 설정한 함수를 실행
// (개발자가 직접 비동기 실행을 구현하고 싶을 때 사용할 수 있는 유용한 함수)
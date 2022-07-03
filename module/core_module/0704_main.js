const fs = require('fs');
// fs(filesystem) -> 코어모듈 중 하나로 파일이나 디렉토리에 관한 작업(디렉토리 생성, 파일 삭제 등)
const os = require('os');
// os(opperationsystem) -> 운영체제 

// 현재 폴더 내 파일 확인 
// let fileList = fs.readdirSync('.');
// console.log(fileList);

// new라는 파일 내 Hello~ 내용 생성 해줌 
// fs.writeFileSync('new', 'Hello Node.js!');

console.log(os.cpus());
// cpus : 현재 컴퓨터의 cpu정보 리턴해줌 
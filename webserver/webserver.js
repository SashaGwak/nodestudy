// 서버 프로그램 만들기
const http = require('http');

let server = http.createServer(function (request, response) {
    console.log(request.url);
    // url의 path 보여줌
    response.end('<h1>Hello world!</h1>');
    // 서버가 응답하도록 함 
});
// creatServer : 서버 역할을 하는 객체 하나를 생성해줌


// server.listen(3000);
// 서버가 포트번호 3000번을 가지고 외부의 요청을 기다리도록 함
// 서버 속에 있는 프로그램마다 포트번호를 가지고 있음, 포트번호로 서버에 요청을 보냄

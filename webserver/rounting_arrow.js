// http rounting.js 파일 arrow 버전
const { request } = require("http");

const users = ['Tom', 'Andy', 'Jessica', 'Paul'];
// 변수는 가능하다면 최대한 상수로 바꾸기

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.end('<h1>Welcome!</h1>');
    } else if (request.url === '/users') {
        response.end('<h1>' + users + '</h1>');
    } else if (request.url.split('/')[1] === 'users') {
        const userIdx = request.url.split('/')[2];
        const userName = users[userIdx -1];

        response.end('<h1>' + userName + '</h1>'); 
        // 변수가 섞인 문자열은 + 기보호다는 템플릿 문자열 사용하기
        // (`<h1>${userName}</h1>`)
    } else {
        response.end('<h1>Page Not Available</h1>')
    }
});

server.listen(3000);
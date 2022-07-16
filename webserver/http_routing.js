const http = require('http');

users = ['Tom', 'Andy', 'Jessica', 'Paul'];

let server = http.createServer(function (request, response) {

    // 슬래시 하나는 url에서 호스트 부분만 입력되었을 때 자동으로 붙는다
    if (request.url === '/') {
        response.end('<h1>Welcome!</h1>');
    } else if (request.url === '/users'){
        response.end('<h1>' + users + '</h1>');
    } else {
        response.end('<h1>Page Not Available</h1>');
    }
});

server.listen(3000);
// URL 라우팅(Routing)
// 요청이 들어온 URL에 따라 서버가 다르게 처리하는 것 
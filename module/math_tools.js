//module -> js 파일 하나 의미
function add(a, b) {
    return a + b;
}

// 모듈 내부의 내용을 외부로 공개해줘야 외부에서 사용할 수 있음
exports.plus = add;
// exports.모들 외부로 공개할 이름 = 모듈 내부에서의 이름 
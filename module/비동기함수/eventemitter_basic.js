const EventEmitter = require('events');
// EventEmitter 클래스 하나를 외부에 공개

const myEmitter = new EventEmitter();
// EventEmitter로 객체를 만듦

myEmitter.on('test', () => {
    console.log('Success!');
});
// on : 어떠한 이벤트가 발생했을 때 실행할 콜백함수를 정의해줌
// 여기서는 test 이벤트가 발생하면 콜백함수 실행 

myEmitter.emit('test');
// emit 이벤트 발생시킴
// -> test 이벤트 직접 발생시킴 

// on 메소드와 emit 메소드 자리 바꿔서 실행하면 안된다!
// 이벤트 발생시키기 전에 콜백함수 정의해줘야 하기 때문에
const EventEmitter = require('events');
// EventEmitter 클래스 하나를 외부에 공개

const myEmitter = new EventEmitter();
// EventEmitter로 객체를 만듦

myEmitter.on('test', () => {
    console.log('Success!');
});
// on : 어떠한 이벤트가 발생했을 때 실행할 콜백함수를 정의해줌
// 여기서는 test 이벤트가 발생하면 

myEmitter.emit('test');
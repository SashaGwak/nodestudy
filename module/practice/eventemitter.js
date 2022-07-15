const EventEmitter = require('events');

const myEmitter = new EventEmitter();
const myEmitter2 = new EventEmitter();

myEmitter.on('test', () => {
    console.log('1');
});

// 하나의 이벤트에 대하여 여러개의 콜백함수 설정 가능
myEmitter.on('test', () => {
    console.log('2');
});

myEmitter2.on('test', () => {
    console.log('3');
});

myEmitter.emit('test');
// 1,2만 출력 
//-> myEmitter, myEmitter2는 서로 다른 객체이기 때문에 
// 이벤트설정와 콜백실행은 하나의 이벤트에미터 객체안에서만 이루어진다!! 
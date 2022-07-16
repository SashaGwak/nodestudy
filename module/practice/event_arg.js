// 이벤트에 추가 정보 함께 전달하기
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const obj = {type: 'text', data: 'Hello world', date: '2022-07-16'};
// 여러 인자를 가지고 있는 객체 하나를 넣어주는 것이 깔꼼 

myEmitter.on('test', (info) => {
    console.log(info);
});

myEmitter.emit('test', obj)
// { type: 'text', data: 'Hello world', date: '2022-07-16' }
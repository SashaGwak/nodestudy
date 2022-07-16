// EventEmitter 객체 사용법 정리 
const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

myEmitter.on('test', () => {
    console.log('success!');
});

myEmitter.emit('test');
// on 메소드 
// emitter.on(eventName, listener)
// 이벤트 핸들러를 설정하는 메소드로, addListener와 동일 

// emit 메소드 
// 인위적으로 이벤트를 발생시키기 위해 쓰는 메소드
// 실제로 나만의 독특한 EventEmitter 객체를 만들지 않는 이상 많이 사용하지는 않지만 emit 메소드와 on 메소드는 연결되어 있으므로 기억하기

// once 메소드
// 특정이벤트에 대한 이벤트 핸들러를 등록하는 것은 on과 비슷 
// 하지만 이벤트 핸들러가 해당 이벤트에 대해서 딱 *한번만* 반응해서 실행되도록 함
// 예시
const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

myEmitter.once('test', () => {
    console.log('Success!');
});

myEmitter.emit('test');
myEmitter.emit('test');
myEmitter.emit('test'); // 실행시 Success! 딱 한번만 출력!! 

// listerners 메소드 
// 특정 이벤트에 대한 이벤트 핸들러를 출력해주는 메소드
// 하나의 이벤트에 관하여 여러개의 이벤트 핸들러를 설정할 수 있음

// off 메소드 
// 이벤트 핸들러를 해제하는 메소드
// 주의! 해제할 이벤트 핸들러를 정확히 지정해줘야 한다 
// 이벤트 핸들러를 나중에 off 메소드에서도 참조할 수 있도록 변수에 할당해주거나, 여러개의 핸들러인 경우 배열에 넣어서 관리해줘야함
// 사용 예시 
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('test', () => {
    console.log('Success!');
});

myEmitter.on('test', callback);

myEmitter.off('test', callback);

myEmitter.emit('test'); 

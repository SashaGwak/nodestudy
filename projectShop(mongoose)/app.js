const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* DB */
const mongoose = require('mongoose');
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://poemha:Mini1028!@clustertest.bwpwhd8.mongodb.net/';

/* session */
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
// require('connect-mongodb-session')(session)을 실행하여 생성자 함수를 산출하며 그 결과를 MongoDBStore에 저장하는 것
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
// resave: false -> 전송되는 모든 응답마다 저장되는 것이 아니라 세션이 변경되었을 때만 저장
// saveUninitialized: false => 저장할 필요가 없는 요청의 경우 아무 세션도 저장되지 않도록 함

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

/* 정적경로 지정 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views'); 
// view engine 저장 폴더 알려주는데 사실 views는 기본값이라 안알려줘도 되긴함

// user 정보저장 미들 웨어 생성
app.use((req, res, next) => {
  User.findById('633dabf05d188594892a37cd')
  .then(user => {
    // console.log(user);
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

/* Routes 가져오기 */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

/* 경로 지정 */ 
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

/* 404 에러처리 */
const errorController = require('./controllers/error');
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(8000, () => {
      console.log('Server start!');
    });
  })
  .catch(err => {
    console.log(err);
  });

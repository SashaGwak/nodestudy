const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
/* DB */
const mongoose = require('mongoose');
const User = require('./models/user');

/* 정적경로 지정 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views'); 
// view engine 저장 폴더 알려주는데 사실 views는 기본값이라 안알려줘도 되긴함

// user 정보저장 미들 웨어 생성
app.use((req, res, next) => {
  User.findById('633d465b3750053dadaa9328')
  .then(user => {
    console.log(user);
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

/* Routes 가져오기 */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* 경로 지정 */ 
app.use('/admin', adminRoutes);
app.use(shopRoutes);

/* 404 에러처리 */
const errorController = require('./controllers/error');
app.use(errorController.get404);

mongoose.connect('mongodb+srv://poemha:Mini1028!@clustertest.bwpwhd8.mongodb.net/?retryWrites=true&w=majority') 
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Max', 
        email: 'max@test.com', 
        cart: {
          items: []
        }
      });
      user.save();
    }
    app.listen(8000, () => {
        console.log('Server start');
    });
    console.log('Connected!');
  })
})
.catch(err => console.log(err));
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const Cookie = req.get('Cookie')
  // let isLoggedIn = Cookie.split('=')[1];
  res.render('auth/login', {
      path: '/login', 
      pageTitle : 'Login', 
      isAuthenticated: false,
  });
}; 

exports.postLogin = (req, res, next) => {
  User.findById('633dabf05d188594892a37cd')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      console.log(err);
      res.redirect('/');
    })
  })
  .catch(err => console.log(err));
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  // 헤더의 이름을 Set-Cookie로 지정
  // 헤더 값의 가장 간단한 형식은 키-값쌍
  // Secure을 추가할 경우 HTTPS를 통해 페이지가 제공될 경우에만 설정됨, HttpOnly로 http 전용으로만 설정할 수도 있음
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
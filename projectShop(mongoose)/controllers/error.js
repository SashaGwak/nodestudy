exports.get404 = (req, res, next) => {
    res.status(404).render('404', { 
      pageTitle: 'Page Not Found',
      path:'/404',
      isAuthenticated: req.session.isLoggedIn
    });
    // 전송 전에 항상 status나 setHeader를 호출 할 수 있음
    // 여기서 status를 호출하면 상태코드 설정 가능
  };
  
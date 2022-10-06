const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router(); 

/* 로그인 페이지 */
router.get('/login', authController.getLogin); 

/* 회원가입 페이지 */
router.get('/signup', authController.getSignup);

/* 로그인 기능 */
router.post('/login', authController.postLogin); 

/* 회원가입 기능 */
router.post('/signup', authController.postSignup);

/* 로그아웃 기능 */
router.post('/logout', authController.postLogout); 


module.exports = router;
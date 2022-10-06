const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router(); 

/* 로그인 페이지 */
router.get('/login', authController.getLogin); 

/* 로그인 기능 */
router.post('/login', authController.postLogin); 

module.exports = router;
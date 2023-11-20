const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/logout', AuthController.logout);

router.get('/checkAuth', AuthController.checkAuth);

router.get('/images', AuthController.getImages);

module.exports = router;
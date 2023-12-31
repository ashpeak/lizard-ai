const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.post('/sendEmail', AuthController.sendEmail);

router.post('/feedback', AuthController.rate);

router.get('/feedback/all', AuthController.getTestimonials);

router.get('/profile', AuthController.profile);

router.get('/logout', AuthController.logout);

router.get('/checkAuth', AuthController.checkAuth);

router.get('/images', AuthController.getImages);

router.get('/video/download/:name', AuthController.getVideos);


module.exports = router;
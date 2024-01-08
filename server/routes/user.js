const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/auth.controller');

router.post('/signup', AuthController.signup);

router.post('/login', AuthController.login);

router.post('/sendEmail', AuthController.sendEmail);

router.post('/feedback', AuthController.rate);

router.get('/feedback/all', AuthController.getTestimonials);

router.get('/profile', AuthController.profile);

router.get('/logout', AuthController.logout);

router.get('/checkAuth', AuthController.checkAuth);

router.get('/images', AuthController.getImages);

router.get('/video/download/:name', AuthController.getVideos);

router.get('/video/download/:name/:id', AuthController.getVideos2);


module.exports = router;
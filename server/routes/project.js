const { Router } = require('express');
const ProjectController = require('../controllers/project.controller');

const router = Router();


router.post('/new', ProjectController.create);

router.get('/getAll', ProjectController.getAll);

module.exports = router;
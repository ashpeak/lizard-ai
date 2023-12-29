const { Router } = require('express');
const ProjectController = require('../controllers/project.controller');

const router = Router();


router.post('/new', ProjectController.create);

router.get('/getAll', ProjectController.getAll);

router.delete('/:id', ProjectController.delete);

module.exports = router;
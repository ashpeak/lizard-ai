const { Router } = require('express');
const ProjectController = require('../controllers/project.controller');

const router = Router();


router.post('/new', ProjectController.create);

router.get('/getAll', ProjectController.getAll);

router.get('/getById/:id', ProjectController.getById);

router.delete('/:id', ProjectController.delete);

router.patch('/:id', ProjectController.update);

module.exports = router;
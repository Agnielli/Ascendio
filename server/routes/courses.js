const express = require('express');
const coursesControllers = require('../controllers/coursesControllers');
const router = express.Router();
const multerSingle = require('../middleware/multerSingle')

router.post('/createcourse', multerSingle('cursos') , coursesControllers.createCourse);


module.exports = router;
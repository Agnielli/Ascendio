const express = require('express');
const coursesControllers = require('../controllers/coursesControllers');
const router = express.Router();
const multerSingle = require('../middleware/multerSingle')

router.post('/createcourse', multerSingle('cursos'), coursesControllers.createCourse);
router.get('/onecourse/:course_id', coursesControllers.oneCourse);
/* router.post('/editcourse/:course_id', multerSingle('cursos'), coursesControllers.editCourse); */
router.get('/calltags', coursesControllers.callTags)


module.exports = router;
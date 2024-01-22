const express = require('express');
const coursesControllers = require('../controllers/coursesControllers');
const router = express.Router();
const multerSingle = require('../middleware/multerSingle')


// http://localhost:3000/courses/ 
router.post('/createcourse', multerSingle('cursos'), coursesControllers.createCourse);
router.get('/onecourse/:course_id', coursesControllers.oneCourse);
router.put('/editcourse/:course_id', multerSingle('cursos'), coursesControllers.editOneCourse);
// router.get('/allcourses/:user_id', coursesControllers.allCoursesOneUser);
router.get('/calltags', coursesControllers.callTags)
router.get('/callcourses', coursesControllers.callCourses)
router.get('/purchasecourse/:id', coursesControllers.purchaseCourse)
/* router.get('/viewpurchasedcourse', coursesControllers.viewPurchasedCourse)
router.get('/viewsavedcourse', coursesControllers.viewSavedCourse) */
router.post('/addsection', coursesControllers.addSection)

module.exports = router;
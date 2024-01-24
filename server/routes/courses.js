const express = require('express');
const coursesControllers = require('../controllers/coursesControllers');
const router = express.Router();
const multerSingle = require('../middleware/multerSingle')


// http://localhost:3000/courses/ 
router.post('/createcourse', multerSingle('cursos'), coursesControllers.createCourse);
router.get('/onecourse/:course_id', coursesControllers.oneCourse);
router.put('/editcourse/:course_id', multerSingle('cursos'), coursesControllers.editOneCourse);
router.get('/calltags', coursesControllers.callTags);
router.get('/callcourses', coursesControllers.callCourses);
router.get('/purchasecourse/:id', coursesControllers.purchaseCourse);
/* router.get('/viewpurchasedcourse', coursesControllers.viewPurchasedCourse)
router.get('/viewsavedcourse', coursesControllers.viewSavedCourse) */
router.post('/addsection', coursesControllers.addSection);
router.delete('/deletesection/:course_id/:section_id', coursesControllers.deleteSection);
router.post('/addtopic', coursesControllers.addTopic);
router.get('/oneusercourses/:user_id', coursesControllers.oneUserCourses);
router.put('/deletecourse/:course_id', coursesControllers.deleteCourse);
router.delete('/deletetopic/:course_id/:section_id:/:topic_id', coursesControllers.deleteTopic);
router.get('/getwishcourse/:course_id/:user_id', coursesControllers.getWishCourse);
router.put('/addwishescourse/:course_id', coursesControllers.addWishesCourse);
router.post('/delfromwishes/:course_id', coursesControllers.delFromWishes);
router.get('/getalltagsonecourse/:course_id', coursesControllers.getAllTagsOneCourse);

//harta del git



module.exports = router;
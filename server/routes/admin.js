var express = require('express');
var router = express.Router();
const adminControllers = require('../controllers/adminControllers');
router.get('/adminusers', adminControllers.adminGetAllUsers)
router.put('/disableuser/:user_id', adminControllers.disableUser)
router.put('/activateuser/:user_id', adminControllers.activateUser)
router.get('/allstatistics', adminControllers.allStats)
router.get('/allcomments/:user_id', adminControllers.oneComment)
router.get('/usercomment', adminControllers.adminComments)




module.exports = router;
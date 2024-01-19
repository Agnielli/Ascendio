var express = require('express');
var router = express.Router();
const adminControllers = require('../controllers/adminControllers');


router.get('/adminusers', adminControllers.adminGetAllUsers)
router.put('/disableuser/:user_id', adminControllers.disableUser)
router.put('/activateuser/:user_id', adminControllers.activateUser)

module.exports = router;
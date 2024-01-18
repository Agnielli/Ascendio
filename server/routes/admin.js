var express = require('express');
var router = express.Router();
const adminControllers = require('../controllers/adminControllers');


router.get('/adminusers', adminControllers.adminGetAllUsers)
router.put('/disableuser/:user_id', adminControllers.delUser)

module.exports = router;
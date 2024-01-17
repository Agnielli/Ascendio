var express = require('express');
var router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const multerSingle = require('../middleware/multerSingle')

/* GET users listing. */

// ruta base http://localhost:3000/users
// router.get('/', usersControllers.home);
router.post('/createuser', usersControllers.createUser);
router.post('/loginuser', usersControllers.loginUser);

module.exports = router;

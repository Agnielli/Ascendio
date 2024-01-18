var express = require('express');
var router = express.Router();
const postsControllers = require("../controllers/postsControllers");
const multerSingle = require('../middleware/multerSingle')


//http:localhost:3000/posts
router.post('/createtrade', postsControllers.createTrade);

module.exports = router;
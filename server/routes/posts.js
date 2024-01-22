var express = require('express');
var router = express.Router();
const postsControllers = require("../controllers/postsControllers");
const multerSingle = require('../middleware/multerSingle')


//http:localhost:3000/posts
router.post('/createtrade', multerSingle('trades'), postsControllers.createTrade);
router.get('/callcategorys', postsControllers.callCategorys);
router.get('/lasttrades', postsControllers.showLastTrades);

module.exports = router;
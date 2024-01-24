var express = require("express");
var router = express.Router();
const CommentsControllers = require("../controllers/commentsControllers");
const multerSingle = require("../middleware/multerSingle");
const commentsControllers = require("../controllers/commentsControllers");

router.post("/createcomment", commentsControllers.createComment);

module.exports = router;

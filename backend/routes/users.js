var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    userID: 1,
    username: "hello"
  });
});

module.exports = router;

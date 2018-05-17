var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    code: 40,
    message: "Her sker der ingenting"
  });
});

module.exports = router;
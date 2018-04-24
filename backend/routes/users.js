var express = require('express');
var db = require('../comps/sql');
var mysql = require('mysql');
var router = express.Router();

function tokenGen() {
  var token = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    token += possible.charAt(Math.floor(Math.random() * possible.length));

  return token;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    userID: 1,
    username: "hello"
  });
});

router.post('/login', function(req, res) {
  var sql = "SELECT * FROM user WHERE username='" + req.body.username + "'";
  db.conn.query(sql, (result, fields) => {
    //Check if result is found
    if(result.length != 1){
      res.json({
        status: 403,
        message: "Wrong username"
      });
    };

    //Password check
    if(result.password != req.body.password){
      res.json({
        status: 403,
        message: "Wrong password"
      });
    }

    var token = tokenGen();
    //Delete from token db
    var sql = "DELETE * FROM token where userID=" + result.id;
    db.conn.query(sql);
    //Insert new token
    var sql = "INSERT INTO token (userID, token) VALUES ('" + result.id + "','" + token + "')"

    res.json({
      userID: result.id,
      token: null,
      isAdmin: result.isAdmin
    });
  });
});
module.exports = router;

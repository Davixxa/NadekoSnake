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
    message: "this leads nowhere"
  });
});

router.post('/login', function(req, res) {
  console.log("received");
  var sql = "SELECT * FROM user WHERE email='" + req.body.email + "'";
  db.conn.query(sql, (result, fields) => {
    //Check if result is found
    if(result == null){
      res.json({
        status: 403,
        message: "Something went wrong please check your credentials"
      });
      return;
    };

    //Password check
    if(result.password != req.body.password){
      res.json({
        status: 403,
        message: "Something went wrong please check your credentials"
      });
      return;
    }

    var token = tokenGen();
    //Delete from token db
    var sql = "SELECT * FROM token WHERE userID=" + result.id;
    db.conn.query(sql, (result, fields) => {
      if(result.length != 1){
        var sql = "INSERT INTO token (userID, token) VALUES (" + result.id + ", '" + token  + "')";
        db.conn.query(sql);
      }else {
        var sql = "UPDATE token SET token=" + token + " WHERE userID=" + result.id;
        db.conn.query(sql);
      }
    });

    res.json({
      userID: result.id,
      token: token,
      isAdmin: result.isAdmin,
      status: 200,
      message: "Data sent successfuly"
    });
  });
});
module.exports = router;

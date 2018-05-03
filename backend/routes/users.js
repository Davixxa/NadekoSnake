var express = require('express');
var db = require('../comps/sql');
var mysql = require('mysql');
var router = express.Router();

function tokenGen() {
  var token = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#¤%&/()=?`£$€{[]}+¨^~*'";

  for (var i = 0; i < 100; i++)
    token += possible.charAt(Math.floor(Math.random() * possible.length));

  return token;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "this leads nowhere"
  });
});

router.post('/signup', function(req, res) {
  var sql = "SELECT * FROM user WHERE email='" + req.body.email + "'";
  db.conn.query(sql, (result, fields) => {
    if(fields.length == 0){
      var sql = "INSERT INTO user (firstName, lastName, email, password) VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.email + "', '" + req.body.password + "')";
      db.conn.query(sql, (err, result) => {
        if(err){
          res.json({
            status: 404,
            message: "SQL related error, please contact a systemadministrator"
          });
          return;
        };
        res.json({
          status: 200,
          message: "Successful registration"
        });
      });
    }else {
      res.json({
        status: 40,
        message: "email taken"
      });
    }
  });
});

router.post('/login', function(req, res) {
  var sql = "SELECT * FROM user WHERE email= '" + req.body.email + "'";
  db.conn.query(sql, (err, results, fields) => {
    //Check if result is found
    if(results.length == 0){    
      res.json({
        status: 403,
        message: "Something went wrong please check your credentials"
      });
      return;
    };
    
    var result = JSON.stringify(results);
    var json = JSON.parse(result);

    //Password check
    if(json[0].password != req.body.password){
      res.json({
        status: 403,
        message: "Something went wrong please check your credentials"
      });
      return;
    }

    var token = tokenGen();
    //Delete from token db
    var sql = "SELECT * FROM token WHERE userID=" + json[0].id;
    db.conn.query(sql, (err, results, fields) => {
      if(results.length != 1){
        var sql = "INSERT INTO token (userID, token) VALUES (" + json[0].id + ", '" + token  + "')";
        db.conn.query(sql);
      }else {
        var sql = "UPDATE token SET token='" + token + "' WHERE userID=" + json[0].id;
        db.conn.query(sql);
      }
    });

    res.json({
      userID: json[0].id,
      token: token,
      isAdmin: json[0].isAdmin,
      status: 200,
      message: "Data sent successfuly"
    });
  });
});
module.exports = router;

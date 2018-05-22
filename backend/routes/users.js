var express = require('express');
var db = require('../comps/sql');
var mysql = require('mysql');
var router = express.Router();

function tokenGen() {
  var token = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 100; i++)
    token += possible.charAt(Math.floor(Math.random() * possible.length));

  return token;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    code: 404,
    message: "Det her fører ingen steder"
  });
});

router.post('/signup', function(req, res) {
  var sql = "SELECT * FROM user WHERE email='" + req.body.email + "'";
  db.conn.query(sql, (err, results, fields) => {
    if(results.length == 0){
      var sql = "INSERT INTO user (firstName, lastName, email, password) VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.email + "', '" + req.body.password + "')";
      db.conn.query(sql, (err, results, fields) => {
        if(err){
          res.json({
            status: 404,
            message: "SQL relateret fejl, kontakt venligst en system administrator"
          });
          return;
        };
        res.json({
          status: 200,
          message: "Successfuld registrering"
        });
      });
    }else {
      res.json({
        status: 40,
        message: "Email-adressen er allerede brugt"
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
        message: "Der gik noget galt, check lige dine brugeroplysninger"
      });
      return;
    };
    
    var result = JSON.stringify(results);
    var json = JSON.parse(result);

    //Password check
    if(json[0].password != req.body.password){
      res.json({
        status: 403,
        message: "Der gik noget galt, check lige dine brugeroplysninger"
      });
      return;
    }

    var token = tokenGen();
    //Delete from token db
    var sql = "SELECT * FROM token WHERE userID=" + json[0].id + ";";
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
      code: 200,
      message: "Data sendt"
    });
  });
});

router.post('/auth', function(req, res) {
  var sql = "SELECT * FROM user WHERE id=" + req.body.auth.userID;
  db.conn.query(sql, (err, results, fields) => {
    if(err){
      res.json({
        authed: false,
        code: 404,
        message: "SQL relateret fejl"
      });
      return;
    }
    var sql = "SELECT * FROM token WHERE userID=" + req.body.auth.userID;
    db.conn.query(sql, (err, results, fields) => {
      if(err) {
        res.json({
          authed: false,
          code: 404,
          message: "SQL relateret fejl"
        });
        return;
      }
      var string = JSON.stringify(results);
      var json = JSON.parse(string);

      if(json[0].token != req.body.auth.token){
        res.json({
          code: 403,
          message: "Uautoriseret"
        });
        return;
      }
    });

    var string = JSON.stringify(results);
    var json = JSON.parse(string);

    res.json({
      authed: true,
      code: 200,
      message: "Autoriseret",

      firstName: json[0].firstName,
      lastName: json[0].lastName,
      email: json[0].email
    });

  });
})

router.post('/nameChange', function(req, res) {
  // Auth start
  var sql = "SELECT * FROM user WHERE id=" + req.body.auth.userID;
  db.conn.query(sql, (err, results, fields) => {
    if(err) {
      res.json({
        code: 404,
        message: "SQL relateret fejl, kontakt venligst en systemadministrator"
      });
      return;
    }
    var result = JSON.stringify(results);
    var json = JSON.parse(result);

    //Token fetch
    var sql = "SELECT * FROM token WHERE token='" + req.body.auth.token + "'";
    db.conn.query(sql, (err, resultsToken, fields) => {
      var resultToken = JSON.stringify(resultsToken);
      var jsonToken = JSON.parse(resultToken);
      if(json[0].id != jsonToken[0].userID){
        res.json({
          code: 403,
          message: "Uautoriseret, Adgang nægtet"
        });
        return;
      }
    });
    
    //if auth success
    if(req.body.user.firstName != null){
      var sql = "UPDATE user SET firstName='" + req.body.user.firstName + "' WHERE id=" + req.body.auth.userID;
      db.conn.query(sql, (err, results, fields) => {
        if(err) {
          res.json({
            code: 404,
            message: "SQL relateret fejl"
          });
          return;
        }
      });
    }

    if(req.body.user.lastName != null){
      var sql = "UPDATE user SET lastName='" + req.body.user.lastName + "' WHERE id=" + req.body.auth.userID;
      db.conn.query(sql, (err, results, fields) => {
        if(err) {
          res.json({
            code: 404,
            message: "SQL relateret fejl"
          });
          return;
        }
      });
    }

    res.json({
      code: 200,
      message: "Successfuld opdatering"
    });

  });
});

router.post('/emailChange', function(req, res) {

  var sql = "SELECT * FROM user WHERE id=" + req.body.auth.userID;
  db.conn.query(sql, (err, results, fields) => {
    if(err) {
      res.json({
        code: 404,
        message: "SQL relateret fejl, kontakt venligst en systemadministrator"
      });
      return;
    }
    var result = JSON.stringify(results);
    var json = JSON.parse(result);

    //Token fetch
    var sql = "SELECT * FROM token WHERE token='" + req.body.auth.token + "'";
    db.conn.query(sql, (err, resultsToken, fields) => {
      var resultToken = JSON.stringify(resultsToken);
      var jsonToken = JSON.parse(resultToken);
      if(json[0].id != jsonToken[0].userID){
        res.json({
          code: 403,
          message: "Uautoriseret, Adgang Nægtet"
        });
        return;
      }
    });
    
    //if auth success
    var sql = "UPDATE user SET email='" + req.body.user.email + "'";
    db.conn.query(sql, (err, results, fields) => {
      if(err) {
        res.json({
          code: 404,
          message: "SQL relateret fejl, kontakt venligst en systemadministrator"
        });
        return;
      }

      res.json({
        code: 200,
        message: "Successfuld opdatering"
      });

    });
  });
});

module.exports = router;
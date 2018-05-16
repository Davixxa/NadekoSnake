var express = require('express');
var db = require('../comps/sql');
var mysql = require('mysql');
var router = express.Router();

// Create admin
router.post('/newAdmin', (req, res) => {
    
    var sql = "SELECT * FROM user WHERE id=" + req.body.auth.userID;
    db.conn.query(sql, (err, resultsUser, fields) => {
        if(err) {
            res.json({
                code: 404,
                message: "SQL related error"
            });
            return;
        }

        resultUser = JSON.stringify(resultsUser);
        jsonUser = JSON.parse(resultUser);

        if(jsonUser[0].isAdmin == 0) {
            res.json({
                code: 403,
                message: "Unauthorized"
            });
            return;
        }
    });

    var sql = "SELECT * FROM token WHERE userID=" + req.body.auth.userID;
    db.conn.query(sql, (err, resultsToken, fields) => {
        if(err) {
            res.json({
                code: 404,
                message: "SQL related error"
            });
            return;
        }

        resultToken = JSON.stringify(resultsToken);
        jsonToken = JSON.parse(resultToken);
        
        if(jsonToken[0].token != req.body.auth.token){
            res.json({
                code: 403,
                message: "Unauthorized, unknown token"
            });
        }
    });

    // If authed as admin was successful
    var sql = "UPDATE user SET isAdmin=" + req.body.user.isAdmin + " where email='" + req.body.user.email  + "'";
    db.conn.query(sql, (err, resultsAdmin, fields) => {
        if(err) {
            res.json({
                code: 404,
                message: err
            });
            return;
        }
    });

    res.json({
        code: 200,
        message: "User updated successfuly"
    });

});

module.exports = router;
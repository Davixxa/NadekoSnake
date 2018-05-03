var express = require('express');
var db = require('../comps/sql');
var mysql = require('mysql');
var router = express.Router();


router.get('/', function(req, res) {
    res.json({
        code: 1337,
        message: 'u think ur a leet h4xx0r rite?'
    });
});

router.post('/create', function(req, res) {

    var sql = "SELECT * FROM user WHERE id=" + req.body.auth.userID; //Auth
    db.conn.query(sql, function(results, fields) {

        if (results.length == 0) {
            res.json({
                code: 403,
                message: "Access Forbidden (For debugging purposes: User doesn't exist)"
            });
            return;
        }
        var sql = "SELECT * FROM token WHERE userID=" + req.body.auth.userID;
        db.conn.query(sql, function(resultsToken, fieldsToken) {
                

        });
        
    });

});


module.exports = router;

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

    console.log(req.body.auth.userID);
    var sql = "SELECT * FROM user WHERE id= " + req.body.auth.userID; //Auth
    db.conn.query(sql, function(err, results, fields) {
        console.log(results);
        if (results == null || results.length == 0) { // Check om resultaterne er null eller har længde på 0. Her er den null på trods af brugerens eksistens.
            res.json({
                code: 403,
                message: "Access Forbidden (For debugging purposes: User doesn't exist)"
            });
            return;
        }
        var sql = "SELECT * FROM token WHERE userID=" + req.body.auth.userID;
        db.conn.query(sql, function(err, resultsToken, fieldsToken) { // Query Token

            if (results.length == 0) {
                res.json({
                    code: 403,
                    message: "Access Forbidden (For debugging purposes: Token doesn't exist)"
                });
                return;
            }
            
            var result = JSON.stringify(resultsToken);
            var json = JSON.parse(result);
            if (req.body.auth.token != json[0].token) { // Check om de passer sammen
                res.json({
                    code: 403,
                    message: "Access Forbidden (For debugging purposes: Token doesn't match up"
                });
                return;
            }
            
            res.json({ // lav dummy besked indtil videre.
                code: 200,
                message: "Product created (in theory)"
        });

        });
        
    });

});


module.exports = router;
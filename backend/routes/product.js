
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

    var sql = "SELECT * FROM user WHERE id= " + req.body.auth.userID; //Auth
    db.conn.query(sql, function(err, results, fields) {
        if (results == null || results.length == 0) { // Check om resultaterne er null eller har længde på 0. Her er den null på trods af brugerens eksistens.
            res.json({
                code: 403,
                message: "Access Forbidden (For debugging purposes: User doesn't exist)"
            });
            return;
        }
        var result = JSON.stringify(results)
        var jsonUser = JSON.parse(result)
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
                    message: "Access Forbidden (For debugging purposes: Token doesn't match up)"
                });
                return;
            }
            
            if (jsonUser[0].isAdmin != 1) {
                
                res.json({
                    code: 403,
                    message: "Access Forbidden (For debugging purposes: Not admin)"
                });
                return;
            }

            console.log(req.body)

            if (req.body.product == null) {
                res.json({
                    code: 404,
                    message: "Product not given"
                });
                return;
            }

            var sql = "INSERT INTO product (productName, productDesc, productImg, productPrice) VALUES ('" + req.body.product.name + "', '" + req.body.product.description + "', '" + req.body.product.image + "', " + req.body.product.price + ")"
            //"', '" + 
            db.conn.query(sql, function(err, result, fields) {

                if (err) {
                    res.json({
                        status: 404,
                        message: "SQL related error, please contact a system administrator"
                      });
                      return;   
                }

                res.json({ // lav dummy besked indtil videre.
                    code: 200,
                    message: "Product created"
                });

            });



        });
        
    });

});


module.exports = router;
var express = require('express');
var db = require('../comps/sql');
var mysql = require('mysql');
var router = express.Router();


router.get("/", function(req, res) {

    res.json({
        code: 1337,
        message: 'lol du tror du er en elite haxx0r?'
    });

});

router.post('/getOrders', function(req, res) {

    var sql = "SELECT * FROM user WHERE id=" + req.body.auth.userID;
    db.conn.query(sql, function(err, results, fields) {
        if (results == null || results.length == 0) { // Check om resultaterne er null eller har længde på 0. Her er den null på trods af brugerens eksistens.
            res.json({
                code: 403,
                message: "Adgang forbudt (Til debugging: Bruger eksisterer ikke)"
            });
            return;
        }
        
        var result = JSON.stringify(results);
        var jsonUser = JSON.parse(result);
        var sql = "SELECT * FROM token WHERE userID=" + req.body.auth.userID;
        db.conn.query(sql, function(err, resultsToken, fieldsToken) { // Query Token

                if (results.length == 0) {
                    res.json({
                        code: 403,
                        message: "Adgang forbudt (Til debugging: Token eksisterer ikke)"
                    });
                    return;
                }
                
                var result = JSON.stringify(resultsToken);
                var json = JSON.parse(result);
                if (req.body.auth.token != json[0].token) { // Check om de passer sammen
                    res.json({
                        code: 403,
                        message: "Adgang forbudt (Til debugging: Token er ikke ens)"
                    });
                    return;
                }

            if (req.body.showAll == true) {

                if (jsonUser[0].isAdmin != 1) {
                    
                    res.json({
                        code: 403,
                        message: "Adgang forbudt (Til debugging: Bruger er ikke admin)"
                    });
                    return;
                }

                var sql = "SELECT * FROM orderline ORDER BY id";
                db.conn.query(sql, (err, results, fields) => {
                    if(err){
                        res.json({
                            code: 404,
                            message: "SQL relateret fejl"
                        });
                    }
            
                    result = JSON.stringify(results);
                    json = JSON.parse(result);
                    
                    res.json(json);
                    console.log("Success");
                    return;
                });


            }

            var sql = "SELECT * FROM orderline WHERE userID=" + req.body.auth.userID + " ORDER BY id";
            db.conn.query(sql, (err, results, fields) => {
                if(err){
                    res.json({
                        code: 404,
                        message: "SQL relateret fejl",
                        err: err
                    });
                    return; 
                }
        
                result = JSON.stringify(results);
                json = JSON.parse(result);
                console.log(json);
                res.json(json);
            });
        });
    });
});

router.post('/create', function(req, res) {

    var sql = "SELECT * FROM user WHERE id= " + req.body.auth.userID; //Auth
    db.conn.query(sql, function(err, results, fields) {
        if (results == null || results.length == 0) { // Check om resultaterne er null eller har længde på 0. Her er den null på trods af brugerens eksistens.
            res.json({
                code: 403,
                message: "Adgang forbudt (Til debugging: Bruger eksisterer ikke)"
            });
            return;
        }
        var result = JSON.stringify(results);
        var jsonUser = JSON.parse(result);
        var sql = "SELECT * FROM token WHERE userID=" + req.body.auth.userID;
        db.conn.query(sql, function(err, resultsToken, fieldsToken) { // Query Token

            if (results.length == 0) {
                res.json({
                    code: 403,
                    message: "Adgang forbudt (Til debugging: Token eksisterer ikke)"
                });
                return;
            }
            
            var result = JSON.stringify(resultsToken);
            var json = JSON.parse(result);
            if (req.body.auth.token != json[0].token) { // Check om de passer sammen
                res.json({
                    code: 403,
                    message: "Adgang forbudt (Til debugging: Token er ikke ens)"
                });
                return;
            }

            if (req.body.productID == null) {
                res.json({
                    code: 404,
                    message: "Produkt ID ikke udfyldt"
                });
                return;
            }

            if (req.body.address == null) {
                res.json({
                    code: 404,
                    message: "Addressen er ikke udfyldt"
                });
                return;
            }

            if (req.body.postal == null) {
                res.json({
                    code: 404,
                    message: "Postnummer er ikke udfyldt"
                });
                return;
            }
            if (req.body.city == null) {
                res.json({
                    code: 404,
                    message: "By er ikke udfyldt"
                });
                return;
            }

            var sql = "SELECT * FROM product WHERE id=" + req.body.productID;
            db.conn.query(sql, (err, resultProd, fieldsProd) => {
                if(err) {
                    res.json({
                        message: "SQL relateret fejl",
                        code: 404
                    });
                }

                fuckProd = JSON.stringify(resultProd);
                jsonProd = JSON.parse(fuckProd);
                console.log(jsonProd[0].productName);
                var sql = "INSERT INTO orderline (userID, productID, productName, productImg, address, postal, city) VALUES ('" + req.body.auth.userID + "', '" + req.body.productID + "', '" + jsonProd[0].productName  + "', '" + jsonProd[0].productImg + "', '" + req.body.address + "', " + req.body.postal + ", '" + req.body.city + "')";
                //"', '" + 
                db.conn.query(sql, function(err, result, fields) {
                    if (err) {
                        console.log(err);
                        res.json({
                            status: 404,
                            message: "SQL error"
                          });
                          return;   
                 }
                 console.log("2 - " + jsonProd)
                    res.json({ // lav dummy besked indtil videre.
                        code: 200,
                        message: "Ordre placeret"
                    });
                });
            });

        });

    });

});

module.exports = router;
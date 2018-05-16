var sql = require('mysql');

const conn = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Nadeko"
});

conn.connect(function(err) {
    if (err) {
        console.log("NO MY SQL CONNECIONT");
    }else{
        console.log("Connected!");
    };
    
});

module.exports = { conn: conn }
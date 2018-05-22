var sql = require('mysql');

const conn = sql.createConnection({
    host: "136.243.172.154",
    user: "komlinj_2016a",
    password: "fFKV9MVw",
    database: "komlinj_2016a_thomas"
});

conn.connect(function(err) {
    if (err) {
        console.log("NO MY SQL CONNECIONT");
    }else{
        console.log("Connected!");
    };
    
});

module.exports = { conn: conn }
var sql = require('mysql');

const conn = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Nadeko"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
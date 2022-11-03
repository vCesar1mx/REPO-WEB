const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 80;
const v = require('./config.json');
const pool = mysql.createPool({
    host: v.host_db,
    user: v.user_db,
    database: v.name_db,
    password: v.pass_db,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
var running = "debug";
function onRun(res) {
    if (running == "debug") {
        res.set({
            'Content-Type': 'text/html',
            'Running': 'debug',
            'Supervised': 'Vazquez Cesar',
            'X-Powered-By': 'Private-Eng.',
            'Version': '1.0',
            'Showing': 'Real-time'
        })
    }
}


app.get('/', (req, res) => {
    onRun(res);
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/logo', (req, res) => {
    res.sendFile(__dirname + '/public/assets/logo.png');
});
app.get('/css/:file', (req, res) => {
    res.sendFile(__dirname + `/public/assets/${req.params.file}.css`);
});
app.get('/js/:file', (req, res) => {
    console.log(req.params)
    res.sendFile(__dirname + `/public/assets/${req.params.file}.js`);
});

app.get('/getdata', (req, res) => {
    pool.query("SELECT * FROM data_general", function (err, rows, fields) {
        if (rows == undefined) return res.send("<h1>Error de consulta</h1><br><strong> " + err + "</strong>");
        var response = rows;
        res.jsonp(response);
        response = "";
    });
});


app.listen(port, () => {
    console.log(`listen on ${port}`);
});



// Database



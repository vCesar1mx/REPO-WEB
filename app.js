const express = require('express');
const mysql = require('mysql2');
const compression = require('compression');
const bodyParser = require("body-parser");
const app = express();
const port = 80;
const v = require('./config.json');
var morgan = require('morgan');
// DATABASE //
const pool = mysql.createPool({
    host: v.host_db,
    user: v.user_db,
    database: v.name_db,
    password: v.pass_db,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// ENVIROMENT
var running = "debug";
function onRun(res) {
    if (running == "debug") {
        res.set({
            'Running': 'debug',
            'Supervised': 'Vazquez Cesar',
            'X-Powered-By': 'Private-Eng.',
            'Version': '1.0',
            'Showing': 'Real-time'
        })
    }
}
// APP USE's
if (running = "debug") {
    app.use(morgan('dev'), compression());

} else {
    app.use(morgan('combined'), compression());
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-status-monitor')());


// ROUTES
app.get('/', (req, res) => {
    onRun(res);
    res.status(200).sendFile(__dirname + '/public/index.html');
});
app.get('/admin', (req, res) => {
    onRun(res);
    res.status(200).sendFile(__dirname + `/public/admin/index.html`);
});
app.get('/logo', (req, res) => {
    onRun(res);
    res.status(200).sendFile(__dirname + '/public/assets/logo.png');
});
app.get('/favicon.ico', (req, res) => {
    onRun(res);
    res.status(200).sendFile(__dirname + '/public/assets/logo.png');
});
app.get('/:type/:file', (req, res) => {
    onRun(res);
    res.status(200).sendFile(__dirname + `/public/assets/${req.params.file}.${req.params.type}`);
});
app.get('/getdata', (req, res) => {
    onRun(res);
    pool.query("SELECT * FROM data_general", function (err, rows, fields) {
        if (rows == undefined) return res.send("<h1>Error de consulta</h1><br><strong> " + err + "</strong>");
        var response = rows;
        res.status(200).jsonp(response);
        response = "";
    });
});
app.post('/api/add', (req, res) => {
    console.log(req.body)
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    pool.query(`INSERT INTO 'data_general' ('id', 'author', 'name_file', 'link', 'tipo', 'ip', 'token_user', 'hash_generate') 
            VALUES (NULL, '${req.body.author}', '${req.body.name_file}', '${req.body.file_ext}', '${ip}', '${req.body.tokenuser}', 'asd');`,
        function (err, rows, fields) {
            if (rows == undefined) return res.send("<h1>Error de consulta</h1><br><strong> " + err + "</strong>");

        });
})


// RUN
app.listen(port, () => {
    console.log(`listen on ${port}`);
});




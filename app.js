const express = require('express');
const mysql = require('mysql2');
const compression = require('compression');
const bodyParser = require("body-parser");
const app = express();
const port = 80;
const v = require('./config.json');
var morgan = require('morgan');
// ENVIROMENT
const ent = require('./src/enviroment.js');
// APP USE's
ent.firstRun(app, bodyParser, morgan, compression);
// DATABASE
const pool = ent.pool_hand(mysql, v);

// ROUTES
app.get('/', (req, res) => {
    ent.onRun(res);
    res.status(200).sendFile(__dirname + '/public/index.html');
});
app.get('/admin', (req, res) => {
    ent.onRun(res);
    res.status(200).sendFile(__dirname + `/public/admin/index.html`);
});
app.get('/logo', (req, res) => {
    ent.onRun(res);
    res.status(200).sendFile(__dirname + '/public/assets/logo.png');
});
app.get('/favicon.ico', (req, res) => {
    ent.onRun(res);
    res.status(200).sendFile(__dirname + '/public/assets/logo.png');
});
app.get('/:type/:file', (req, res) => {
    ent.onRun(res);
    res.status(200).sendFile(__dirname + `/public/assets/${req.params.file}.${req.params.type}`);
});
app.get('/getdata', (req, res) => {
    ent.onRun(res);
    pool.query("SELECT * FROM data_general", function (err, rows, fields) {
        if (rows == undefined) return res.send("<h1>Error de consulta</h1><br><strong> " + err + "</strong>");
        var response = rows;
        res.status(200).jsonp(response);
        response = "";
    });
});
app.post('/api/add', (req, res) => {
//    console.log(req.body)
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    var id = Math.floor(Date.now() / 1000);
    var file_4 = req.body.file_name.slice("0", "4");
    var tokenuser = req.body.tokenuser.split("_", "1");
    // QUERY SQL
    pool.query(`INSERT INTO data_general (id, author, name_file, link, tipo, ip, token_user, hash_generate) VALUES (NULL, '${req.body.author}', '${req.body.file_name}', '${req.body.link}', '${req.body.file_ext}', '${ip}', '${req.body.tokenuser}', '${id}.${tokenuser}.${file_4}.${req.body.file_ext}.${req.body.author}')`, function (err, rows, fields) {
        if (err) return res.status(200).jsonp({"message": "Error en la base de datos, contacta a un administrador.", "code": "error"});
        res.send(`Datos agregados, con el Hash: ${id}.${tokenuser}.${file_4}.${req.body.file_ext}.${req.body.author}`);
    });
})
app.get('/email', (req,res) =>{
    var searchInThisString = `wisinjp123@gmail.com	
    1
    
    1
    
    28/12/2021 a las 05:21
    
    infantil.cancio@haliacraft.com	
    1
    
    0
    
    28/12/2021 a las 05:45
    
    jesusdavidrodri6428@gmail.com	
    1
    
    1
    
    28/12/2021 a las 07:08
    
    ortizethan111@gmail.com	
    1
    
    1
    
    28/12/2021 a las 09:10
    
    toribiovizarretaraquelcatty@gmail.com	
    1
    
    1
    
    28/12/2021 a las 16:08
    
    yonaykerzamora8@gmail.com	
    1
    
    1
    
    28/12/2021 a las 18:51
    
    josesr1504@gmail.com	
    1
    
    1
    
    28/12/2021 a las 18:54
    
    antraxxartna90@gmail.com	
    1
    
    1
    
    29/12/2021 a las 00:30
    
    s.garcia8317@gmail.com	
    1
    
    1
    
    29/12/2021 a las 18:45
    
    magdy.amelia.gonzalez@gmail.com	
    1
    
    1
    
    29/12/2021 a las 20:08
    
    manuelcharaf1@gmail.com	
    1
    
    1
    
    29/12/2021 a las 22:07
    
    chriscobonffoficial@gmail.com	
    2
    
    2
    
    06/01/2022 a las 22:00
    
    rauljonson29@gmail.com	
    1
    
    1
    
    06/01/2022 a las 22:52
    
    michaelpinto117@haliacraft	
    1
    
    0
    
    07/01/2022 a las 21:28
    
    mikey8053@haliacraft	
    1
    
    0
    
    07/01/2022 a las 21:37
    
    mendozajeicko@gmail.com	
    1
    
    1
    
    10/01/2022 a las 00:59
    
    azzahrouibadredin@gmail.com	
    1
    
    0
    
    10/01/2022 a las 18:54
    
    carlosmoes2008@gmail.com	
    1
    
    1
    
    12/01/2022 a las 17:31
    
    elneji11kpo@gmail.com	
    1
    
    1
    
    14/01/2022 a las 00:55
    
    katiaviloria@gmail.com	
    1
    
    1
    
    14/01/2022 a las 00:58
    
    joanxd52@gmail.com	
    1
    
    1
    
    15/01/2022 a las 01:10
    
    alexisriffo1@gmail.com	
    1
    
    1
    
    15/01/2022 a las 01:59
    
    orion43n@halia.com	
    1
    
    0
    
    15/01/2022 a las 17:32
    
    englishwd@hotmail.com	
    2
    
    1
    
    15/01/2022 a las 21:11
    
    munozmartinlopez@gmail.com	
    1
    
    1
    
    16/01/2022 a las 23:41
    
    fernandolionelsegura@gmail.com	
    1
    
    1
    
    17/01/2022 a las 22:22
    
    blanquetmartinezchris07@gmail.com	
    1
    
    1
    
    18/01/2022 a las 11:24
    
    cristo101004@gmail.com	
    3
    
    3
    
    18/01/2022 a las 21:45
    
    jauned1126@gmail.com	
    1
    
    0
    
    18/01/2022 a las 23:27
    
    danielosba27@gmail.com	
    1
    
    1
    
    19/01/2022 a las 16:51
    
    franciscopalo2006@gmail.com	
    1
    
    1
    
    19/01/2022 a las 22:23
    
    kennetbor@gmail.com	
    2
    
    2
    
    20/01/2022 a las 01:54
    
    dandresvega@gmail.com	
    1
    
    1
    
    20/01/2022 a las 01:59
    
    diegolopezmorenog9@gmail.com	
    3
    
    3
    
    20/01/2022 a las 02:01
    
    ratatorta1@gmail.com	
    1
    
    1
    
    20/01/2022 a las 05:30
    
    chris.cob0n.ff.01@gmail.com	
    1
    
    0
    
    20/01/2022 a las 05:45
    
    alezml698@gmail.com	
    1
    
    1
    
    20/01/2022 a las 09:05
    
    bledfx@gmail.com	
    1
    
    1
    
    20/01/2022 a las 09:14
    
    javieralejandroabreujimenez@gmail.com	
    2
    
    2
    
    20/01/2022 a las 15:58
    
    agusvinolo194@gmail.com	
    1
    
    1
    
    20/01/2022 a las 17:07
    
    salamanzar@outlook.com	
    1
    
    1
    
    20/01/2022 a las 19:17
    
    telloromerokarla@gmail.com	
    1
    
    1
    
    20/01/2022 a las 23:27
    
    marc653219@gmail.com	
    2
    
    2
    
    21/01/2022 a las 00:50
    
    cristianjessevelazquez@gmail.com	
    1
    
    1
    
    21/01/2022 a las 02:27
    
    leandro23sequeiros@gmail.com	
    1
    
    1
    
    21/01/2022 a las 02:31
    
    jj787mc@gmail.com	
    1
    
    1
    
    21/01/2022 a las 02:53
    
    lautibarrio2007@gmail.com	
    1
    
    1
    
    21/01/2022 a las 13:50
    
    felipealejandroburgosorellana@gmail.com	
    1
    
    1
    
    21/01/2022 a las 21:07
    
    juanessmith@gmail.com	
    1
    
    1
    
    22/01/2022 a las 21:24
    
    germanetchebarne48@gmail.com	
    1
    
    1
    
    23/01/2022 a las 03:33`;

    var foundEmails =[];
    
    var emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    
    var gotcha;
    
    while (match = emailRegex.exec(searchInThisString)){
    
         //-- store in array the found match email
         foundEmails.push(match[0]);
         res.write(match[0])
        //-- remove the found email and continue search if there are still emails
        searchInThisString= searchInThisString.replace(match[0],"")
    }
    
})


// RUN
app.listen(port, () => {
    console.log(`listen on ${port}`);
});




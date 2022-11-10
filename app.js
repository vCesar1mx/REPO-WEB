const express = require("express");
const mysql = require("mysql2");
const compression = require("compression");
const bodyParser = require("body-parser");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const app = express();
const port = 80;
const v = require("./config.json");
var morgan = require("morgan");
// ENVIROMENT
const ent = require("./src/enviroment.js");
// APP USE's
ent.firstRun(app, bodyParser, morgan, compression);
// DATABASE
const pool = ent.pool_hand(mysql, v);

// ROUTES
app.get("/", (req, res) => {
  ent.onRun(res);
  res.status(200).sendFile(__dirname + "/public/index.html");
});
app.get("/admin", (req, res) => {
  ent.onRun(res);
  res.status(200).sendFile(__dirname + `/public/admin/index.html`);
});
app.get("/logo", (req, res) => {
  ent.onRun(res);
  res.status(200).sendFile(__dirname + "/public/assets/logo.png");
});
app.get("/favicon.ico", (req, res) => {
  ent.onRun(res);
  res.status(200).sendFile(__dirname + "/public/assets/logo.png");
});
app.get("/:type/:file", (req, res) => {
  ent.onRun(res);
  res
    .status(200)
    .sendFile(
      __dirname + `/public/assets/${req.params.file}.${req.params.type}`
    );
});
app.get("/getdata", (req, res) => {
  ent.onRun(res);
  pool.query("SELECT * FROM data_general", function (err, rows, fields) {
    if (rows == undefined)
      return res.send(
        "<h1>Error de consulta</h1><br><strong> " + err + "</strong>"
      );
    var response = rows;
    res.status(200).jsonp(response);
    response = "";
  });
});
app.post("/api/add", (req, res) => {
  //    console.log(req.body)
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  var id = Math.floor(Date.now() / 1000);
  var file_4 = req.body.file_name.slice("0", "4");
  var tokenuser = req.body.tokenuser.split("_", "1");
  // QUERY SQL
  pool.query(
    `INSERT INTO data_general (id, author, name_file, link, tipo, ip, token_user, hash_generate) VALUES (NULL, '${req.body.author}', '${req.body.file_name}', '${req.body.link}', '${req.body.file_ext}', '${ip}', '${req.body.tokenuser}', '${id}.${tokenuser}.${file_4}.${req.body.file_ext}.${req.body.author}')`,
    function (err, rows, fields) {
      if (err)
        return res.status(200).jsonp({
          message: "Error en la base de datos, contacta a un administrador.",
          code: "error",
        });
      res.send(
        `Datos agregados, con el Hash: ${id}.${tokenuser}.${file_4}.${req.body.file_ext}.${req.body.author}`
      );
    }
  );
});

app.get("/email", (req, res) => {
  fs.readFile("./text.txt", (err, data) => {
    if (err) return console.error(err);
    var searchInThisString = data.toString();
    var foundEmails = [];

    var emailRegex =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

    var gotcha;
    var i = 0;
    while ((match = emailRegex.exec(searchInThisString))) {
      //-- store in array the found match email
      i++;
      foundEmails.push(match[0]);
      res.write(match[0] + ", " + i + "\n");
      //-- remove the found email and continue search if there are still emails
      searchInThisString = searchInThisString.replace(match[0], "");
    }
  });
});

app.get("/pdf", (req, res) => {


  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream("output.pdf"));

  // Embed a font, set the font size, and render some text
  doc
    .font("fonts/PalatinoBold.ttf")
    .fontSize(25)
    .text("Some text with an embedded font!", 100, 100);

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image("path/to/image.png", {
    fit: [250, 300],
    align: "center",
    valign: "center",
  });

  // Add another page
  doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

  // Draw a triangle
  doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, -380)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // Add some text with annotations
  doc
    .addPage()
    .fillColor("blue")
    .text("Here is a link!", 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, "http://google.com/");

  // Finalize PDF file
  doc.end();
});

// RUN
app.listen(port, () => {
  console.log(`listen on ${port}`);
});

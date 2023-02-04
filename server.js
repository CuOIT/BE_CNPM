const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv");
const port = process.env.PORT || 3000;
const cors = require("cors");
const mysql = require("mysql");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
let routes = require("./routes"); //importing route
// let db=mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASS || "",
//   database: process.env.DB_NAME || "nodejs_api1"
// });
// db.connect((err)=>{
//   if(err) console.log("Error");
//   else console.log("Connect database successfully");
// });
routes(app);
// app.use(function (req, res) {
//   res.status(404).send({ url: req.originalUrl + " not found" });
// });

app.listen(port);

console.log("RESTful API server started on: " + port);

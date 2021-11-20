var express = require("express");
var app = express();
app.set("view engine",'ejs');
var path = require("path");
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts');
app.set('views', path.join(__dirname, '/views'));
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var book=require("./routes/book");
app.use("/book",book);

var school=require("./routes/school");
app.use("/school",school);

var clas=require("./routes/class");
app.use("/class",clas);

var teacher=require("./routes/teacher");
app.use("/teacher",teacher);

var teacher=require("./routes/student");
app.use("/student",teacher);

app.listen(3000,function (){
    console.log("Listening at 3000")
});

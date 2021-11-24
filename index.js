const express = require("express");
const app = express();
app.set("view engine",'ejs');
const path = require("path");
var db=require("./utility/conn");
let auth = require('./auth.js');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts');
app.set('views', path.join(__dirname, '/views'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const book = require("./routes/book");
app.use("/book",book);

const school = require("./routes/school");
app.use("/school",school);

const clas = require("./routes/class");
app.use("/class",clas);

const teacher = require("./routes/teacher");
app.use("/teacher",teacher);

const student = require("./routes/student");
app.use("/student",student);

const album = require("./routes/album");
app.use("/album",album);

const typeahead = require("./routes/typeahead");
app.use("/typeahead",typeahead);

auth = require("./routes/auth");
app.use("/auth",auth);



//
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const session = require('express-session');
// const flash = require('connect-flash');
//
// var user=require("./models/user");
// app.use(flash());
// app.user(session({secret:'test secret',resave:false,saveUninitialized:false}))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(new LocalStrategy((username, password, authCheckDone)=>{
//     user.findOne({username}).then(user=>{
//         if(!user){
//             return authCheckDone(null, false)
//         }
//         if(user.password !== password){
//             return authCheckDone(null, false)
//         }
//         authCheckDone(null, user)
//     })
//
// }))
//
// passport.serializeUser((user,done)=>{
//     done(null, user._id)
// })
//
// passport.deserializeUser((id, done)=>{
//     done(null, {id})
// })
//


app.listen(3000,function (){
    console.log("Listening at 3000")
});


// var express = require('express'),
//     app = express(),
//     session = require('express-session'),
//     flash = require('connect-flash'),
//     session = require('express-session'),
//     auth = require('./auth.js'),
//     bodyParser = require('body-parser');
//
// app.use('/', express.static(__dirname + '/public'));
//
// app.use(session({
//     secret: 'some-secret',
//     saveUninitialized: false,
//     resave: true
// }));
//
// // For parsing post request's data/body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//
// // Tells app to use password session
// app.use(auth.initialize());
// app.use(auth.session());
//
// app.use(flash());
//
// // Set up routes
// app.get('/', function(req, res) {
//     if(req.user) {
//         res.send(
//             '<p>You\'re logged in as <strong>' + req.user.username + '</strong>.</p>'
//             + '<p><a href="/logout">Log out</a></p>'
//         );
//     }
//     else {
//         res.send('<p><a href="/login">Login</a></p>');
//     }
// });
//
// app.get('/login', function(req, res) {
//     res.send(
//         '<form action="/login" method="POST">'
//         + '<h2>Login</h2>'
//         + '<p><input name="username"></p>'
//         + '<p><input name="password"></p>'
//         + '<p><input type="submit" value="Login"></p>'
//         + '<p style="color: red;">' + req.flash('error') + '</p>'
//         + '</form>'
//
//     );
// });
//
// app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });
//
// app.post('/login',
//     auth.authenticate('login', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     })
// );
//
// var server = app.listen(3000, function() {
//     var port = server.address().port;
//
//     console.log('Server running on http://127.0.0.1:%s', port);
// });

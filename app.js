//declaration
const express = require('express');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const signup = require('./controllers/signup');
const employee = require('./controllers/employee/employee')
const mysql      = require('mysql');
const path = require('path');
const fileUpload = require('express-fileupload');



// var ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');

//configuration
app.set('view engine', 'ejs');


//middleware 
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());

app.use('/abc', express.static('assets'))
// app.use('/assets/fonts', express.static('fonts'));
// app.use('/assets/img', express.static('img'));
// app.use('/assets/js', express.static('js'));

app.use('/login', login);
app.use('/signup', signup);
app.use('/employee', employee)
app.use('/logout', logout)


app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(fileUpload());
 


//routes
app.get('/', function (req, res) {
	res.render('welcome/index');
});

//server startup
app.listen(3000, function () {
	console.log('node server started at 3000!');
});


// [Tickets] /server.js

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var handlebars = require('express-handlebars');

// load files with config variables
var config = {
	db: require('./config/db'),
};

// connect to MongoDB
mongoose.connect(config.db.MONGO_URI);

// initialize Express
var app = express();
var port = Number(process.env.PORT || 8080);

// configure Express modules
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.engine('.hbs', handlebars({
	partialsDir: './app/views/partials',
	extname: '.hbs',
	helpers: require('./app/util/helpers'),
}));

app.set('views', './app/views');
app.set('view engine', '.hbs');

// load routes
require('./app/routes/routes')(app);

// launch
app.listen(port);

console.log('the magic happens on port ' + port);

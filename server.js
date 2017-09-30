var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  _mysql = require('mysql');

var app = module.exports = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/'));
app.use('/build', express.static('public'));

var env = process.env.NODE_ENV;
if ('development' == env) {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}
//
// app.get('/', routes.index);
// app.all('/api/events', api.events);
// app.all('/api/events/:eventId', api.event)


var HOST = 'localhost';
var PORT = 3309;
var MYSQL_USER = 'siteminder';
var MYSQL_PASS = 'siteminder';
var DATABASE = 'nodedb';
var TABLE = 'task';

var mysql = _mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

mysql.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");
} else {
    console.log("Error connecting database ... \n\n");
}
});

mysql.query('USE nodedb');

app.get('/tasks', function(req, res){
  mysql.query('SELECT * FROM task', function(err, rows){
    console.log(rows);
    // res.render('tasks', {task : rows});
  });
});


app.listen(8090);
console.log('Magic happens on port 8090...');

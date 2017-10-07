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

mysql.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

mysql.query('USE nodedb');

app.get('/tasks', function(req, res) {
  mysql.query('SELECT * FROM task', function(err, rows) {
    res.send(rows);
  });
});

app.post('/tasks', function(req, res) {
  var params = req.body
  mysql.query('INSERT INTO task SET ?', params, function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.put('/task', function(req, res) {
  connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name, req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.delete('/task', function(req, res) {
  mysql.query('DELETE FROM task WHERE `Id`=?', [req.body.id], function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


app.listen(8090);
console.log('Magic happens on port 8090...');

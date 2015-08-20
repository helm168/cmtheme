var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/css/normalize', express.static('node_modules/normalize.css'));
app.use('/css/codemirror', express.static('node_modules/codemirror'));
app.use('/css', express.static('css'));
app.use('/js/codemirror', express.static('node_modules/codemirror'));
app.use('/js', express.static('js'));

app.get('/', function(req, res) {
  res.render('index', {name: 'helm'});
});

var server = app.listen(3000, function() {
  var address = server.address().address;
  var port = server.address().port;
  console.log('App listen at %s %s', address, port);
});

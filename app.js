var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/css/normalize', express.static('node_modules/normalize.css'));
app.use('/css/codemirror', express.static('node_modules/codemirror'));
app.use('/css', express.static('css'));
app.use('/js/codemirror', express.static('node_modules/codemirror'));
app.use('/js', express.static('js'));

var htmlTplPath = path.join(__dirname, 'tpl', 'html.tpl');
var jsTplPath = path.join(__dirname, 'tpl', 'javascript.tpl');
var cssTplPath = path.join(__dirname, 'tpl', 'css.tpl');
var htmlTplContent = fs.readFileSync(htmlTplPath);
var jsTplContent = fs.readFileSync(jsTplPath);
var cssTplContent = fs.readFileSync(cssTplPath);

var themePath = path.join(__dirname, 'node_modules', 'codemirror', 'theme');
var themes = fs.readdirSync(themePath);
var themeReg = /(.+)\.css/; 
themes = themes.map(function(theme) {
  var result = theme.match(themeReg);
  if(result.length === 2) {
    return result[1];
  } else {
    return '';
  }
});

console.log('themes', themes);
app.get('/', function(req, res) {
  res.render('index', {
    htmlTpl: htmlTplContent,
    jsTpl: jsTplContent,
    cssTpl: cssTplContent,
    themeOptions: themes
  });
});

var server = app.listen(3000, function() {
  var address = server.address().address;
  var port = server.address().port;
  console.log('App listen at %s %s', address, port);
});

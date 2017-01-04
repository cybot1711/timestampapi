//
// # SimpleServer
//
var port = process.env.PORT || 8080;

var express = require('express'),
  app = express(),
  path = require('path'),
  exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({
  extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', 'client')

app.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname + '/client/index.html'));
  res.render('index')
});

app.get('/:month/:day/:year', function(req, res) {
  var month = req.params.month;
  var day = req.params.day;
  var year = req.params.year;

  var unix = Date.parse('Wed' + ' ' + month + ' ' + day + ' ' + year);

  if (isNaN(unix)) {
    month = 'null';
    day = 'null';
    year = 'null';
    unix = 'null';
  }

  res.render('index', {
    month: month,
    day: day,
    year: year,
    unix: unix
  })
});

app.get('/:stamp', function(req, res) {
  var date = new Date(req.params.stamp * 1000).toLocaleTimeString('en-us', {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  console.log(date);
  var sDate = date.replace(/\,/g,'').split(' ');
  console.log(sDate);

  var year = sDate[3];
  var day  = sDate[2];
  var month = sDate[1];
  res.render('index',{
    month: month,
    day: day,
    year: year,
    unix: req.params.stamp
  })


})

app.listen(port, function() {
  console.log('Example app listening on port 8080!')
});

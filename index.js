var express = require('express');
var hbs = require('hbs');
var morgan  = require('morgan');
var content = require('./content');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use(morgan());

app.get('/:id', function(req, res, next) {
	var id = req.params.id;
	res.render('index', {
		data: content[id],
	});
});

app.listen(5000);
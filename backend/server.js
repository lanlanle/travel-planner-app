var express = require('express');
var db = require('./db');

var app = express();

var PlansController = require('./PlansController')
var PlacesController = require('./PlacesController')

app.use('/plans',PlansController)
app.use('/places',PlacesController)




var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
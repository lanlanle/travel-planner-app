var express = require('express');
var db = require('./db');

var app = express();

var PlansController = require('./PlansController')
app.use('/plans',PlansController)





var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
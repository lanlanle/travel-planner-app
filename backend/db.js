if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

var mongoose = require('mongoose');
var URI = process.env.MLAB_URI 
mongoose.connect(URI);
var mongoose = require('mongoose');  

var PlaceItemSchema = new mongoose.Schema({
	cityName:String,
	placeName:String,
	address:String,
	placeType:String
});


mongoose.model('PlaceItem', PlaceItemSchema);
module.exports = mongoose.model('PlaceItem');
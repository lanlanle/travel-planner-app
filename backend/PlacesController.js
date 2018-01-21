var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
var PlaceItem = require('./models/placeItem');


//post request

router.post('/',(req,res)=>{
	PlaceItem.create({
		cityName:req.body.cityName,
		placeName:req.body.placeName,
		address:req.body.address,
		placeType:req.body.placeType

	},(err,place)=>{
		if (err) throw err;
		res.status(200).send(place)
	})
})

//get request

router.get('/',(req,res)=>{
	PlaceItem.find({},(err,places)=>{
		if (err) throw err;
		res.status(200).send(places)
	})
})


module.exports = router;
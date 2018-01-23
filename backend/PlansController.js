var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());
var PlanItem = require('./models/planItem');


//post request

router.post('/',(req,res)=>{
	PlanItem.create({
		name:req.body.name
	},(err,plan)=>{
		if (err) throw err;
		res.status(200).send(plan)
	})
})

//get request

router.get('/',(req,res)=>{
	PlanItem.find({},(err,plans)=>{
		if (err) throw err;
		res.status(200).send(plans)
	})
})


module.exports = router;
var mongoose = require('mongoose');  

var PlanItemSchema = new mongoose.Schema({
	name:String
});

// var PlanItem = module.exports = mongoose.model('PlanItem',PlanItemSchema)


mongoose.model('PlanItem', PlanItemSchema);
module.exports = mongoose.model('PlanItem');

var mongoose= require("mongoose");

var equipmentSchema = mongoose.Schema({
    description: {type: String, required: true},
    defense: {type: Number, required: true},
    category: {type: String},
    weight: Number
});


var Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports=Equipment;

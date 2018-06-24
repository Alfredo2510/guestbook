var mongoose = require("mongoose");

var equipSchema = mongoose.Schema({
    description: { type: String, required: true },
    defense: { type: Number, required: true },
    category: { type: String },
    weight: { type: Number },
});

var donothing = () => {
    }

equipSchema.pre("save", function(done) {
        var equip = this;
        done();
    });

    equipSchema.methods.name = function() {
        return this.description || this.defense || this.category || this.weight;
    }

var Equip = mongoose.model("Equip", equipSchema);
module.exports = Equip;
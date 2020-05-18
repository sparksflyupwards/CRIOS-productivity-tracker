const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatureSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    status: {
        type: String,
        require: true
    },
    goal_rate: {
        type: Number,
        required: false
    },
    experience: {
        type: Number,
        required: true
    },
    health: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
    

}, {
    timestamps: true,
});

const Creature = mongoose.model('Creature', creatureSchema);
module.exports = Creature;

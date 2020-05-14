const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    start_time: {
        type: Date,
        required: true
    },
    stop_time: {
        type: Date,
        required: true
    },
    total_time: {
        type: Number,
        required: true
    }
    

}, {
    timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;

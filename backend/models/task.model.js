const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
    estimated_hours: {
        type: Number,
        required: false
    },
    current_hours_logged: {
        type: Number,
        required: true
    },
    date_created: {
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

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;

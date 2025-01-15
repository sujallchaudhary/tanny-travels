const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
    travelDays: {
        type: String,
        required: true,
        trim: true
    },
    origin: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    transport: {
        type: String,
        required: true,
        trim: true
    },
    travelStyle: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    hotels: {
        type: Array,
        required: true
    },
    flights: {
        type: Array,
        required: true
    },
    modelResponse:{
        type: Array,
        required: true
    }
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
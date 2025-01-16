const Trip = require('../models/tripModel');
const sendRequest = require('../utils/requestModel');
const getAttractions = require('../utils/getAttractions');
const getHotels = require('../utils/getHotel');
const getFlight = require('../utils/getFlight');
const queryOd = require('../utils/queryOd');
const createChatSession = require('../utils/createChatSession');

function addTravelDays(dateString, travelDays) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + travelDays);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

const createTrip = async (req,res)=>{
    try{
    const {travelDays,origin,destination,transport,travelStyle,date} = req.body;
    const departureDate = addTravelDays(date, Number(travelDays));
    const chatSession = await createChatSession('plugin-1730095028');
    const [attractions, hotels, flights,image] = await Promise.all([
        getAttractions(destination),
        getHotels(destination, date, departureDate),
        getFlight(origin, destination, date, departureDate),
        queryOd(chatSession,'plugin-1730095028',`Generate a hyperrealistic image of a  ${destination}, capturing the essence of its natural beauty and cultural appeal. The image should showcase vibrant landscapes, iconic landmarks, and immersive details that inspire travel. Ensure the response is provided strictly in JSON format, like this:{"image": "imageLink"}`)
    ]);
    const request = await sendRequest(travelDays, origin, destination, transport, travelStyle,attractions);
    const trip = await Trip.create({
        travelDays,
        origin,
        destination,
        transport,
        travelStyle,
        image:image.image,
        date,
        hotels,
        flights,
        modelResponse: request
    })
    res.status(201).json({success:true,tripId:trip._id});
}
catch(error){
    console.error('Error creating trip:', error.message);
}
}

const getTrip = async (req,res)=>{
    try{
    const trip = await Trip.findById(req.params.id);
    res.status(201).json({success:true,data:trip});
}
catch(error){
    console.error('Error getting trip:', error.message);
}
}

const getTrips = async (req,res)=>{
    try{
    const trips = await Trip.find().select('origin destination date travelDays transport travelStyle image');
    res.status(201).json({success:true,data:trips});
}
catch(error){
    console.error('Error getting trips:', error.message);
}
};

module.exports = {createTrip, getTrip, getTrips};
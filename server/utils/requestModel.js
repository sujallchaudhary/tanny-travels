requuire('dotenv').config();
const axios = require('axios');
const sendRequest = async (travelDays,origin,destination,transport,travelStyle,attractions) => {
    try {
        const request=axios.post(process.env.ENDPOINT,{
            travel_days: travelDays,
            origin: origin,
            destination: destination,
            means_of_transport: transport,
            travel_style: travelStyle,
            attractions: attractions
        });
        if(request.status===200){
            return res;
        }
        else{
            console.error('Failed to send request');
        }
    }
    catch(error){
        console.error('Error sending request:', error.message);

    }
}

module.exports = sendRequest;
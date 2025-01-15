require('dotenv').config();
const axios = require('axios');
const sendRequest = async (travelDays,origin,destination,transport,travelStyle,attractions) => {
    try {
        const request=await axios.post(process.env.ENDPOINT,{
            travel_days: travelDays,
            origin: origin,
            destination: destination,
            means_of_transport: transport,
            travel_style: travelStyle,
            attractions: attractions
        });
        if(request.status===200){
            const data = request.data.itinerary;
            const formattedItinerary = Object.entries(data).map(([day, activities]) => {
                return {
                  day: parseInt(day.split(" ")[1]),
                  activities: Object.entries(activities).map(([time, details]) => ({
                    time: time,
                    activity_name: details["Activity Name"],
                    activity_description: details["Activity Description"],
                    redirect_link: details["Redirect Link"] || undefined,
                  })),
                };
              });
               return formattedItinerary;
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
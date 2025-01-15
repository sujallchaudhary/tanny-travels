require('dotenv').config();
const axios = require('axios');

async function getDestinationId(destination) {
  try {
    const response = await axios.get(
      `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${destination}`,
      {
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
      }
    );
    if (response.status === 200) {
      const destinationId = response.data.data[0].id;
      return destinationId;
    } else {
      console.error('Failed to get destination ID');
    }
  } catch (error) {
    console.error('Error getting destination ID:', error.message);
  }
}

async function getFlight(arrival,destination, arrivalDate, departureDate) {
  try {
    const arrivalId = await getDestinationId(arrival);
    const destinationId = await getDestinationId(destination);
    const response = await axios.get(
      `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${arrivalId}&toId=${destinationId}&arrival_date=${arrivalDate}&departDate=${departureDate}&currency_code=INR&languagecode=en-us&sort=CHEAPEST`,
      {
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
      }
    );
    if (response.status === 200) {
      const data =response.data.data.flightOffers;
      let flights = [];
      for (const flight of data){
        const flightInnerData = flight.segments[0].legs[0];
        flights.push({
          airLine: flightInnerData.carriersData[0],
          arrivalTime:flightInnerData.arrivalTime,
          departureTime:flightInnerData.departureTime,
          flightInfo:flightInnerData.flightInfo,
          slug:flightInnerData.slug,
        })
      }
      return flights;
    } else {
      console.error('Failed to get flight data');
    }
  } catch (error) {
    console.error('Error getting flight data:', error.message);
  }
}

module.exports = getFlight;
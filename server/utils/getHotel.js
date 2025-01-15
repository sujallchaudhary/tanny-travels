require('dotenv').config();
const axios = require('axios');

let destId;

async function getHotel(destination, arrivalDate, departureDate) {
    try {
        const response = await axios.get(
            `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${destination}`,
            {
                headers: {
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            }
        );

        if (response.status === 200) {
            const data = response.data.data;
            for (const result of data) {
                if (result.search_type === "city") {
                    destId = result.dest_id;
                    break;
                }
            }

            if (!destId) {
                throw new Error('Destination ID not found for the given destination.');
            }
        } else {
            throw new Error('Failed to fetch destination data.');
        }
        const hotelResponse = await axios.get(
            `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${destId}&search_type=CITY&arrival_date=${arrivalDate}&departure_date=${departureDate}&units=metric&temperature_unit=c&languagecode=en-us&currency_code=INR`,
            {
                headers: {
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            }
        );

        if (hotelResponse.status === 200) {
            const data = hotelResponse.data.data.hotels;
            let hotelData = [];
            for (const hotel of data){
                hotelData.push(
                    {
                        hotelId: hotel.hotel_id,
                        lebel:hotel.accessibilityLabel,
                        name:hotel.property.name,
                        photoUrl:hotel.property.photoUrls[2],
                        price:hotel.property.priceBreakdown
                    }
                )
            }
            if (hotelData.length > 0) {
                return hotelData;
            } else {
                throw new Error('No hotels found for the given destination.');
            }

        } else {
            throw new Error('Failed to fetch hotel data.');
        }
    } catch (error) {
        console.error('Error submitting query:', error.message);
        return false;
    }
}

module.exports = getHotel;

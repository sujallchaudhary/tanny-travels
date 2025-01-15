const axios = require('axios');
const getDestinationId = async (destination)=>{
    try {
        const response = await axios.get(
            `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${destination}&languagecode=en-us`,
            {
                headers: {
                    'x-rapidapi-key': process.env.RAPID_API_KEY,
                    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
                }
            }
        );
        if (response.status === 200) {
            const destinationId = response.data.data.destinations[0].id;
            return destinationId;
        } else {
            console.error('Failed to get destination ID');
        }
    } catch (error) {
        console.error('Error getting destination ID:', error.message);
    }
}

const getAttractions = async (destination) => {
    try {
        const destinationId = await getDestinationId(destination);
        const response = await axios.get(
            `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions?id=${destinationId}&languagecode=en-us&page=1&currency_code=INR`,
            {
                headers: {
                    'x-rapidapi-key': process.env.RAPID_API_KEY,
                    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
                }
            }
        );
        if (response.status === 200) {
            const data = response.data.data.products;
            let attractions = [];
            for (const attraction of data) {
                attractions.push({
                    id: attraction.id,
                    name: attraction.name,
                    shortDescription: attraction.shortDescription,
                    price: attraction.representativePrice.chargeAmount,
                    currency: attraction.representativePrice.currency,
                    photo: attraction.primaryPhoto.small,
                    link: `https://www.booking.com/attractions/${attraction.ufiDetails.url.country}/${attraction.slug}.html`
                });
            }
            return attractions;
        } else {
            console.error('Failed to get attraction data');
        }
    } catch (error) {
        console.error('Error getting attraction data:', error.message);
    }
};
module.exports = getAttractions;
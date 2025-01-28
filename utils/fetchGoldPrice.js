const axios = require('axios');
require('dotenv').config();

const fetchIndianGoldPrice = async () => {
    try {
        const response = await axios.get('https://www.goldapi.io/api/XAU/INR', {
            headers: {
                'x-access-token': process.env.GOLD_API_KEY, // API key from environment variables
            },
        });

        const goldPrice = response.data.price; // Use `price` field from response

        if (!goldPrice) {
            throw new Error('Gold price not found in API response');
        }

        return goldPrice;
    } catch (error) {
        console.error('Error fetching Indian gold price:', error.message);
        throw new Error('Failed to fetch Indian gold price.');
    }
};

module.exports = fetchIndianGoldPrice;

const axios = require('axios');

async function getApod(req, res) {
    try {
        const apiKey = process.env.NASA_API_KEY;

        const response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );

        return res.status(200).json({
            message: "APOD fetched successfully",
            data: response.data
        });

    } catch (error) {
        console.error("NASA API Error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch data from NASA"
        });
    }
}

module.exports = { getApod };
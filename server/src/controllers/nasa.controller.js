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

async function getTrending(req, res) {
    try {
        const hotTopics = [
            'james webb', 'black hole', 'mars rover', 'nebula',
            'supernova', 'galaxy cluster', 'exoplanet', 'aurora'
        ];

        const currentTrend = hotTopics[Math.floor(Math.random() * hotTopics.length)];

        const response = await axios.get(`https://images-api.nasa.gov/search?q=${currentTrend}&media_type=image`);

        const items = response.data.collection.items.slice(0, 12);

        res.status(200).json({
            topic: currentTrend,
            items: items
        });

    } catch (error) {
        console.error("Error fetching trending data:", error);
        res.status(500).json({ message: "Failed to fetch trending cosmos data" });
    }
};

module.exports = { getApod, getTrending };
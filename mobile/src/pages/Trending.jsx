import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Trending() {
    const [items, setItems] = useState([]);
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await api.get('/apod/trending');

                setTopic(res.data.topic);
                setItems(res.data.items || []);
            } catch (err) {
                console.error("Failed to fetch trending space data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    if (loading) return <div className="text-center text-accent mt-10 text-xl">Scanning deep space for trending anomalies...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">Discover the Cosmos</h1>
                <p className="text-xl text-gray-400">
                    Currently Trending: <span className="text-accent font-bold capitalize px-2 py-1 bg-accent/10 rounded">{topic}</span>
                </p>
            </div>

            {items.length === 0 ? (
                <p className="text-center text-gray-400">No trending data found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => {
                        const data = item.data?.[0];
                        const imageUrl = item.links?.[0]?.href;

                        if (!data || !imageUrl) return null;

                        return (
                            <div key={index} className="bg-cardBg rounded-lg shadow-lg border border-gray-800 overflow-hidden flex flex-col hover:border-accent transition duration-300">
                                <img
                                    src={imageUrl}
                                    alt={data.title}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2" title={data.title}>
                                        {data.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                                        {data.description}
                                    </p>
                                    <div className="mt-auto flex justify-between items-center text-xs text-accent font-semibold">
                                        <span>{data.center || 'NASA'}</span>
                                        <span>{new Date(data.date_created).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
  const [apod, setApod] = useState(null);
  const [apodLoading, setApodLoading] = useState(true);

  const [trendingItems, setTrendingItems] = useState([]);
  const [trendingTopic, setTrendingTopic] = useState('');
  const [trendingLoading, setTrendingLoading] = useState(true);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const res = await api.get('/apod');
        const apodData = res.data?.title ? res.data : (res.data?.data || res.data?.apod || null);
        setApod(apodData);
      } catch (err) {
        console.error("Couldn't fetch APOD", err);
      } finally {
        setApodLoading(false);
      }
    };
    fetchApod();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get('/trending'); 
        setTrendingTopic(res.data.topic);
        
        setTrendingItems(res.data.items?.slice(0, 3) || []);
      } catch (err) {
        console.error("Failed to fetch trending data for home page", err);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-10">
      
      {apodLoading ? (
        <div className="text-center text-accent py-10">Contacting NASA...</div>
      ) : apod && (
        <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-800 bg-cardBg">
          {apod?.media_type === 'video' || apod?.url?.includes('youtube') || apod?.url?.includes('vimeo') || apod?.url?.includes('video') ? (
            <div className="w-full aspect-video">
              <iframe 
                src={apod.url} 
                title={apod.title} 
                className="w-full h-full border-0" 
                allowFullScreen 
              />
            </div>
          ) : (
            <img 
              src={apod.url} 
              alt={apod.title} 
              className="w-full max-h-[60vh] object-cover bg-gray-900"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop'; }} 
            />
          )}

          <div className="md:absolute bottom-0 left-0 right-0 md:bg-gradient-to-t from-black to-transparent p-6 md:pt-20">
            <h2 className="text-3xl font-bold text-white mb-2">NASA Picture of the Day</h2>
            <h3 className="text-xl text-accent mb-2">{apod.title}</h3>
            <p className="text-gray-300 line-clamp-3 md:line-clamp-none max-w-4xl text-sm md:text-base">
              {apod.explanation}
            </p>
          </div>
        </div>
      )}

      <div className="text-center py-10 bg-cardBg rounded-lg border border-gray-800 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-white">Welcome to CosmicLog</h2>
        <p className="text-gray-400 mb-6">Join a community of stargazers. Document the cosmos.</p>
        <Link to="/feed" className="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition inline-block">
          Explore the Feed
        </Link>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Trending in the Cosmos</h2>
            {trendingTopic && (
              <p className="text-gray-400 mt-1">
                Hot topic: <span className="text-accent font-bold capitalize px-2 py-1 bg-accent/10 rounded ml-2">{trendingTopic}</span>
              </p>
            )}
          </div>
          <Link to="/trending" className="text-accent hover:text-white transition font-semibold">
            View all discoveries &rarr;
          </Link>
        </div>

        {trendingLoading ? (
          <div className="text-center text-gray-500 py-10">Scanning deep space...</div>
        ) : trendingItems.length === 0 ? (
          <p className="text-gray-500 text-center py-10 bg-cardBg rounded-lg border border-gray-800">No trending data right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingItems.map((item, index) => {
              const data = item.data?.[0];
              const imageUrl = item.links?.[0]?.href;

              if (!data || !imageUrl) return null;

              return (
                <div key={index} className="bg-cardBg rounded-lg shadow-lg border border-gray-800 overflow-hidden flex flex-col hover:border-accent transition duration-300">
                  <img 
                    src={imageUrl} 
                    alt={data.title} 
                    className="w-full h-40 object-cover" 
                  />
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1" title={data.title}>
                      {data.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                      {data.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
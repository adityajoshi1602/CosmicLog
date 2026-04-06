import { useEffect, useState } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/post');
        console.log('Raw Backend Data:', res.data);

        const validPostsArray = Array.isArray(res.data) 
          ? res.data 
          : (res.data?.posts || res.data?.data || []);

        setPosts(validPostsArray);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const removePostFromFeed = (id) => {
    if (Array.isArray(posts)) {
      setPosts(posts.filter(p => p._id !== id));
    }
  };

  if (loading) return <div className="text-center text-accent mt-10">Loading cosmos...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-accent">Cosmic Feed</h1>
      
      {(!Array.isArray(posts) || posts.length === 0) ? (
        <p className="text-center text-gray-400">No observations yet.</p>
      ) : (
        posts.map(post => (
          <PostCard key={post._id} post={post} onDelete={removePostFromFeed} />
        ))
      )}
    </div>
  );
}
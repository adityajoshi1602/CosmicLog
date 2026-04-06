import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import PostCard from '../components/PostCard';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        const myPosts = res.data.filter(p => (p.userId._id || p.userId) === user._id);
        setPosts(myPosts);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      }
    };
    if (user) fetchPosts();
  }, [user]);

  const removePostFromFeed = (id) => setPosts(posts.filter(p => p._id !== id));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-cardBg p-8 rounded-lg text-center mb-8 border border-gray-800">
        <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold">{user?.username}</h1>
        <p className="text-gray-400">{user?.email}</p>
        <p className="mt-4 text-accent font-bold">Total Logs: {posts.length}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">My Observations</h2>
      {posts.length === 0 ? (
        <p className="text-gray-400">You haven't logged any sightings yet.</p>
      ) : (
        posts.map(post => <PostCard key={post._id} post={post} onDelete={removePostFromFeed} />)
      )}
    </div>
  );
}
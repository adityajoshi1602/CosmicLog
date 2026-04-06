import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

export default function PostCard({ post, onDelete }) {
  const { user } = useContext(AuthContext);
  const [reactions, setReactions] = useState(post.reactionCounts || { witness: 0, wow: 0, love: 0 });

  const handleReact = async (type) => {
    if (!user) return alert("Log in to react!");
    try {
      const res = await api.post(`/posts/${post._id}/react`, { type });
      if (res.data.reactionCounts) setReactions(res.data.reactionCounts);
    } catch (err) {
      console.error('Failed to react', err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/delete/${post._id}`);
      if (onDelete) onDelete(post._id);
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const isOwner = user && user._id === (post.userId._id || post.userId);

  return (
    <div className="bg-cardBg rounded-lg shadow-lg border border-gray-800 overflow-hidden mb-6">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{post.title}</h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="font-bold text-accent">@{post.userId?.username || 'Astronomer'}</span>
              <span>•</span>
              <span className="bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded capitalize">
                {post.celestialObject}
              </span>
              <span>📍 {post.location}</span>
              <span>📅 {new Date(post.observedAt).toLocaleDateString()}</span>
            </div>
          </div>
          {isOwner && (
            <button onClick={handleDelete} className="text-red-400 hover:text-red-300 text-sm bg-red-900/20 px-3 py-1 rounded">
              Delete
            </button>
          )}
        </div>

        <p className="text-gray-300 mb-6 whitespace-pre-wrap">{post.body}</p>

        <div className="flex gap-3 border-t border-gray-800 pt-4">
          <button onClick={() => handleReact('witness')} className="flex items-center gap-2 text-gray-400 hover:text-accent transition px-3 py-1 rounded border border-gray-800 hover:border-accent">
            👁 Witnessed <span className="text-white">{reactions.witness}</span>
          </button>
          <button onClick={() => handleReact('wow')} className="flex items-center gap-2 text-gray-400 hover:text-accent transition px-3 py-1 rounded border border-gray-800 hover:border-accent">
            ✨ Wow <span className="text-white">{reactions.wow}</span>
          </button>
          <button onClick={() => handleReact('love')} className="flex items-center gap-2 text-gray-400 hover:text-accent transition px-3 py-1 rounded border border-gray-800 hover:border-accent">
            ❤️ Love <span className="text-white">{reactions.love}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
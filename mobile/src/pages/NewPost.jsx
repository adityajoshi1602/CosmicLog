import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function NewPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', celestialObject: '', location: '', observedAt: '', body: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return setError('An image is required.');
    
    setLoading(true);
    setError('');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('image', imageFile);

    try {
      await api.post('/posts/create', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-cardBg p-8 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-accent text-center">Log a Sighting</h2>
      {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Observation Title" onChange={handleChange} required className="bg-darkBg border border-gray-700 rounded p-3 text-white" />
        <div className="grid grid-cols-2 gap-4">
          <input name="celestialObject" placeholder="Celestial Object" onChange={handleChange} required className="bg-darkBg border border-gray-700 rounded p-3 text-white" />
          <input name="location" placeholder="Location / City" onChange={handleChange} required className="bg-darkBg border border-gray-700 rounded p-3 text-white" />
        </div>
        <input type="datetime-local" name="observedAt" onChange={handleChange} required className="bg-darkBg border border-gray-700 rounded p-3 text-white [color-scheme:dark]" />
        
        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm">Upload Evidence (Image)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required className="bg-darkBg border border-gray-700 rounded p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-accent file:text-white" />
        </div>

        <textarea name="body" placeholder="Field Notes" onChange={handleChange} required rows="4" className="bg-darkBg border border-gray-700 rounded p-3 text-white"></textarea>
        
        <button type="submit" disabled={loading} className="bg-accent hover:bg-opacity-90 p-3 rounded font-bold mt-2 disabled:opacity-50">
          {loading ? 'Uploading to ImageKit...' : 'Publish to CosmicLog'}
        </button>
      </form>
    </div>
  );
}
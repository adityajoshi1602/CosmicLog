import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', formData);
            login(res.data, res.data.token);
            navigate('/feed');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-[#0f172a] p-8 rounded-lg border border-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-center text-accent">Login</h2>
            {error && <div className="bg-red-900/20 text-red-400 p-3 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} required className="bg-[#020617] border border-gray-800 rounded p-3 text-white" />
                <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} required className="bg-[#020617] border border-gray-800 rounded p-3 text-white" />
                <button type="submit" className="bg-accent py-3 rounded font-bold mt-2 text-white">Enter Cosmos</button>
            </form>
            <p className="mt-4 text-center text-gray-500">Need an account? <Link to="/register" className="text-accent hover:underline">Register</Link></p>
        </div>
    );
}
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-indigo-900/40 shadow-[0_4px_30px_rgba(0,0,50,0.5)]">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-xl font-semibold tracking-wide flex items-center gap-2"
        >
          <span className="text-indigo-400 text-2xl">✦</span>
          <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
            CosmicLog
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/trending" className="hover:text-accent transition">Trending</Link>
          <Link
            to="/feed"
            className="text-gray-300 hover:text-white transition"
          >
            Feed
          </Link>

          {user ? (
            <>
              <Link
                to="/new"
                className="text-gray-300 hover:text-white transition"
              >
                Log Sighting
              </Link>

              <Link
                to="/profile"
                className="text-gray-300 hover:text-white transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-purple-800/40 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
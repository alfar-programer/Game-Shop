import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-10 pr-4 py-2 bg-surface/50 border border-border rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all w-full md:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={user.id}
            >
              <Link to={`/users/${user.id}`} className="block bg-surface border border-border hover:border-primary/50 transition-colors p-5 rounded-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center font-bold text-primary border border-primary/30">
                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <ChevronRight className="text-gray-600 group-hover:text-primary transition-colors" />
                </div>
                
                <div className="space-y-1 relative z-10">
                  <h3 className="font-bold text-white text-lg truncate">{user.name || 'Unknown User'}</h3>
                  <p className="text-gray-400 text-sm truncate">{user.email}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-gray-500 relative z-10">
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  <span className="text-accent group-hover:neon-text-accent transition-all">View Profile</span>
                </div>
              </Link>
            </motion.div>
          ))}
          {users.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-surface/50 rounded-xl border border-border border-dashed">
              No users found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

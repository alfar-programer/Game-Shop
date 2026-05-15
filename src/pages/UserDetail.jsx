import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Calendar, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-white mb-4">User not found</h2>
        <button onClick={() => navigate('/users')} className="text-primary hover:underline">Return to User List</button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <Link to="/users" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Users
      </Link>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-24 h-24 bg-background rounded-xl border-4 border-surface flex items-center justify-center shadow-lg shadow-black/50 z-10">
            <span className="text-3xl font-bold text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
        </div>
        
        <div className="pt-20 md:pt-16 pb-8 px-6 md:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0 text-center md:text-left">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-wide">{user.name}</h1>
            <p className="text-gray-400 flex items-center justify-center md:justify-start mt-1">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              Standard User
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none bg-primary/10 text-primary border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/20 transition-all font-medium text-sm">
               Edit Profile
             </button>
             <button className="flex-1 md:flex-none bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all font-medium text-sm">
               Ban User
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-bold text-white mb-4 border-b border-border/50 pb-2">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm text-gray-300 break-all">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm text-gray-300">{user.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Registered On</p>
                  <p className="text-sm text-gray-300">{new Date(user.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
           <div className="bg-surface border border-border rounded-xl p-6">
             <h3 className="font-bold text-white mb-4 flex items-center">
               <Activity className="w-5 h-5 mr-2 text-accent" />
               Recent Transactions
             </h3>
             <div className="h-48 border border-border border-dashed rounded-lg flex items-center justify-center bg-background/50 text-gray-500">
               No transaction history found for this user.
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

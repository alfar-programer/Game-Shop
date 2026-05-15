import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Server, DollarSign, Activity } from 'lucide-react';

function StatCard({ title, value, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface border border-border p-6 rounded-xl flex items-center justify-between neon-box-primary bg-opacity-40 backdrop-blur-sm"
    >
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-wide">{value}</h3>
      </div>
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
        <Icon className="text-primary w-6 h-6" />
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    revenue: '$0',
    orders: 0,
    growth: '+0%'
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [statsRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/users/stats`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/users`, { headers })
        ]);

        setStats({
          totalUsers: statsRes.data.totalUsers,
          revenue: `$${statsRes.data.revenue.toLocaleString()}`,
          orders: statsRes.data.orders,
          growth: statsRes.data.growth
        });
        
        // Get the latest 5 users
        setRecentUsers(usersRes.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">System Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-primary neon-text-primary">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span>System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Registered Users" value={stats.totalUsers} icon={Users} delay={0.1} />
        <StatCard title="Fake Revenue (Today)" value={stats.revenue} icon={DollarSign} delay={0.2} />
        <StatCard title="Total Fake Orders" value={stats.orders} icon={Activity} delay={0.3} />
        <StatCard title="Server Load" value="12%" icon={Server} delay={0.4} />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-surface border border-border rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-border bg-surface flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            Recent Users
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-background/30 transition-colors">
                  <td className="p-4 font-medium text-white flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 font-bold text-xs border border-primary/30">
                      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    {user.name || 'Unknown'}
                  </td>
                  <td className="p-4 text-gray-400">{user.email}</td>
                  <td className="p-4 text-gray-400">{user.phone || 'Not provided'}</td>
                  <td className="p-4 text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

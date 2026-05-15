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

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/users/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats({
          totalUsers: data.totalUsers,
          revenue: `$${data.revenue.toLocaleString()}`,
          orders: data.orders,
          growth: data.growth
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    }
    fetchStats();
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
        className="mt-8 bg-surface border border-border rounded-xl p-6 h-64 flex items-center justify-center"
      >
        <p className="text-gray-500 font-mono">ACTIVITY_CHART_PLACEHOLDER [Initializing...]</p>
      </motion.div>
    </div>
  );
}

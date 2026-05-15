import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const data = await login(email, password);
      const role = data.role;

      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/store');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in. Check your credentials.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-border p-8 rounded-xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary neon-text-primary tracking-wider mb-2">NEXUS<span className="text-white">PAY</span></h1>
          <p className="text-gray-400">Admin Portal Login</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-center text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-primary text-black font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-all neon-box-primary mt-6 tracking-wide"
          >
            {loading ? 'AUTHENTICATING...' : 'ACCESS TERMINAL'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Need an account? <Link to="/register" className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4">Register here</Link>
        </div>
      </motion.div>
    </div>
  );
}

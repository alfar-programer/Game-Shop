import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, ShoppingCart, Zap, TrendingUp, Search, Play, Star, ShieldCheck } from 'lucide-react';

const MOCK_GAMES = [
  { id: 1, name: 'PUBG Mobile', category: 'Battle Royale', price: '$0.99', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', activeUsers: '2.4M', rating: 4.8 },
  { id: 2, name: 'Free Fire', category: 'Battle Royale', price: '$0.99', image: 'https://images.unsplash.com/photo-1616560938446-f9f237bfbcac?w=800&q=80', activeUsers: '1.8M', rating: 4.7 },
  { id: 3, name: 'Valorant', category: 'Tactical Shooter', price: '$4.99', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', activeUsers: '1.2M', rating: 4.9 },
  { id: 4, name: 'Mobile Legends', category: 'MOBA', price: '$0.99', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', activeUsers: '3.1M', rating: 4.8 },
  { id: 5, name: 'Call of Duty Mobile', category: 'Shooter', price: '$1.99', image: 'https://images.unsplash.com/photo-1616560938446-f9f237bfbcac?w=800&q=80', activeUsers: '1.5M', rating: 4.6 },
  { id: 6, name: 'League of Legends', category: 'MOBA', price: '$4.99', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', activeUsers: '4.2M', rating: 4.9 },
  { id: 7, name: 'Roblox', category: 'Sandbox', price: '$0.99', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', activeUsers: '5.5M', rating: 4.5 },
  { id: 8, name: 'Fortnite', category: 'Battle Royale', price: '$7.99', image: 'https://images.unsplash.com/photo-1616560938446-f9f237bfbcac?w=800&q=80', activeUsers: '2.8M', rating: 4.7 },
];

const STATS = [
  { label: 'Active Users', value: '12.5M+', icon: Users, color: 'text-blue-400' },
  { label: 'Daily Transactions', value: '450K+', icon: ShoppingCart, color: 'text-green-400' },
  { label: 'Supported Games', value: '150+', icon: Gamepad2, color: 'text-purple-400' },
  { label: 'Average Delivery', value: '< 5s', icon: Zap, color: 'text-yellow-400' },
];

const POPULAR_PACKS = [
  { name: 'PUBG 600 UC', price: '$9.99', discount: '-10%', game: 'PUBG Mobile' },
  { name: 'Valorant 1000 VP', price: '$9.99', discount: 'Hot', game: 'Valorant' },
  { name: 'MLBB 500 Diamonds', price: '$8.99', discount: '-15%', game: 'Mobile Legends' },
  { name: 'Free Fire 1060 Diamonds', price: '$9.99', discount: 'Hot', game: 'Free Fire' },
];

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState('All Games');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = ['All Games', 'Battle Royale', 'MOBA', 'Shooter'];
  const filteredGames = activeCategory === 'All Games' 
    ? MOCK_GAMES 
    : MOCK_GAMES.filter(g => g.category.includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[30%] h-[30%] rounded-full bg-pink-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Nexus<span className="text-purple-400">Play</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
              <a href="#" className="hover:text-white transition-colors text-white">Store</a>
              <a href="#" className="hover:text-white transition-colors">Trending</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex relative items-center">
                <Search className="w-4 h-4 absolute left-3 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search games..." 
                  className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all w-48 lg:w-64"
                />
              </div>
              <button className="bg-white/10 hover:bg-white/15 px-5 py-2.5 rounded-full text-sm font-medium transition-colors border border-white/5">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-12 mb-24"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                #1 Gaming Store
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Level Up Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  Gaming Experience
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-xl leading-relaxed">
                Instant delivery, secure payments, and the best prices for your favorite games. Join millions of gamers worldwide.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" /> Explore Games
                </button>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <ShieldCheck className="w-5 h-5 text-green-400" /> Secure Payments
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" /> Flash Sales
                  </h3>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-medium">Ends in 02:45:10</span>
                </div>
                <div className="space-y-4">
                  {POPULAR_PACKS.map((pack, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center p-1 border border-white/5">
                           <Gamepad2 className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{pack.name}</p>
                          <p className="text-xs text-white/40">{pack.game}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{pack.price}</p>
                        <p className="text-xs text-red-400 font-medium">{pack.discount}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/[0.07] transition-colors"
              >
                <stat.icon className={`w-8 h-8 mb-3 ${stat.color}`} />
                <h4 className="text-2xl font-bold mb-1">{stat.value}</h4>
                <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Game Grid */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Games</h2>
                <p className="text-white/50">Top up your favorite games instantly</p>
              </div>
              
              <div className="flex overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 hide-scrollbar gap-2 max-w-full">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-white text-black' 
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="relative bg-[#1a1a24] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)]">
                      {/* Image section */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] to-transparent z-10" />
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={game.image} 
                          alt={game.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 border border-white/10">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" /> {game.rating}
                        </div>
                      </div>
                      
                      {/* Content section */}
                      <div className="p-5 relative z-20 -mt-6">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors line-clamp-1">{game.name}</h3>
                        </div>
                        <p className="text-xs text-white/50 mb-4">{game.category} • {game.activeUsers} Players</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <p className="text-xs text-white/40 mb-0.5">Starts from</p>
                            <p className="font-bold text-lg">{game.price}</p>
                          </div>
                          <button className="bg-white/10 hover:bg-purple-600 px-4 py-2 rounded-xl text-sm font-medium transition-all group-hover:shadow-[0_0_15px_-3px_rgba(168,85,247,0.5)]">
                            Top Up
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/40 mt-12 py-12 text-center text-white/40 text-sm">
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 mb-2 opacity-50 grayscale">
                <Gamepad2 className="w-5 h-5 text-white" />
                <span className="text-lg font-bold">NexusPlay</span>
             </div>
             <p>© 2026 NexusPlay Entertainment. Demo frontend presentation.</p>
          </div>
        </footer>
      </div>
      
      {/* Dynamic styles mapping */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

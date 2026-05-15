import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, LogOut, ChevronRight, Gamepad2, X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const GAMES = [
  { id: 1, name: "Valorant", category: "Riot Games", currency: "VP Points", image: "https://images.unsplash.com/photo-1643916244583-0498a442dc8c?w=500&q=80", color: "from-red-500/20 to-rose-500/5", packages: [{ amount: 500, price: 4.99 }, { amount: 1050, price: 9.99, popular: true }, { amount: 2050, price: 19.99 }, { amount: 5350, price: 49.99 }] },
  { id: 2, name: "League of Legends", category: "Riot Games", currency: "RP", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80", color: "from-blue-500/20 to-sky-500/5", packages: [{ amount: 650, price: 5.00 }, { amount: 1380, price: 10.00, popular: true }, { amount: 2800, price: 20.00 }, { amount: 5000, price: 35.00 }] },
  { id: 3, name: "Genshin Impact", category: "HoYoverse", currency: "Genesis Crystals", image: "https://images.unsplash.com/photo-1621508654686-809f23efdabc?w=500&q=80", color: "from-amber-500/20 to-yellow-500/5", packages: [{ amount: 60, price: 0.99 }, { amount: 300, price: 4.99 }, { amount: 980, price: 14.99, popular: true }, { amount: 1980, price: 29.99 }] },
  { id: 4, name: "PUBG Mobile", category: "Tencent", currency: "UC", image: "https://images.unsplash.com/photo-1598555620853-2945d820bdfb?w=500&q=80", color: "from-orange-500/20 to-amber-500/5", packages: [{ amount: 60, price: 0.99 }, { amount: 325, price: 4.99 }, { amount: 660, price: 9.99, popular: true }, { amount: 1800, price: 24.99 }] }
];

export default function Landing() {
  const { currentUser, logout } = useAuth();
  const [selectedGame, setSelectedGame] = useState(null);
  
  return (
    <div className="min-h-screen bg-background text-gray-300 font-sans">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-6 md:px-12 bg-surface/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-accent neon-text-accent tracking-widest">NEXUS<span className="text-white">STORE</span></h1>
        
        <div className="flex items-center space-x-6">
          {currentUser?.role === 'admin' && (
            <Link to="/dashboard" className="hidden md:flex text-sm text-primary hover:text-white transition-colors border border-primary px-3 py-1.5 rounded-full bg-primary/10">
              Admin Portal
            </Link>
          )}
          <div className="flex items-center space-x-3 bg-surface border border-border px-4 py-2 rounded-full">
             <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent text-accent flex items-center justify-center font-bold text-sm">
               {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
             </div>
             <span className="text-white font-medium text-sm hidden md:block">{currentUser?.name || 'Player'}</span>
          </div>
          <button onClick={() => logout()} className="text-red-400 hover:text-red-300 transition-colors bg-surface border border-border p-2 rounded-full">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden flex items-center justify-center border-b border-border">
        <div className="absolute inset-0 bg-accent/5 backdrop-blur-[100px] -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
        
        <div className="text-center max-w-3xl z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Power Up Your Gameplay <br/> Instantly.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 mb-10"
          >
            Direct top-ups for your favorite games. Fast, secure, and purely for players. Select a title below to browse packs.
          </motion.p>
          <motion.button 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-accent text-white font-bold py-4 px-10 rounded-full hover:bg-accent/90 transition-all neon-box-accent text-lg flex items-center mx-auto"
          >
            <Gamepad2 className="mr-3 w-6 h-6" />
            BROWSE CATALOG
          </motion.button>
        </div>
      </section>

      {/* Games Catalog */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-bold text-white flex items-center">
             <ShoppingCart className="mr-3 text-accent" />
             Popular Titles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GAMES.map((game, idx) => (
            <motion.div 
              key={game.id}
              onClick={() => setSelectedGame(game)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-surface border border-border rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/50 transition-colors relative`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-100 transition-opacity z-0`}></div>
              
              <div className="h-48 overflow-hidden relative z-10">
                 <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              </div>
              
              <div className="p-6 relative z-10 -mt-10">
                <span className="text-xs font-bold text-accent tracking-widest uppercase mb-1 block">{game.category}</span>
                <h4 className="text-xl font-bold text-white mb-2">{game.name}</h4>
                <p className="text-sm text-gray-400 mb-6 border-b border-border/50 pb-4">Top-up {game.currency} directly to your player ID.</p>
                
                <button className="flex items-center text-sm font-bold text-white group-hover:text-accent transition-colors w-full justify-between">
                  SELECT PACKAGES
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Packages Modal */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGame(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row h-[85vh] md:h-[600px]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedGame(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Game Banner Sidebar */}
              <div className="md:w-5/12 relative bg-surface border-r border-border h-48 md:h-full flex-shrink-0">
                <img src={selectedGame.image} alt={selectedGame.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#06070a] to-[#06070a]/20`}></div>
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-left">
                   <div className={`absolute inset-0 bg-gradient-to-bl ${selectedGame.color} opacity-30 mix-blend-overlay z-0`}></div>
                   <div className="relative z-10">
                     <span className="text-sm font-bold text-accent tracking-widest uppercase mb-2 block glow-accent">{selectedGame.category}</span>
                     <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedGame.name}</h3>
                     <p className="text-gray-300 text-sm md:text-base hidden md:block">
                       Select a package to securely top-up {selectedGame.currency} directly to your player account.
                     </p>
                   </div>
                </div>
              </div>

              {/* Packages Grid */}
              <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto bg-surface/50">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  Available Packages
                  <div className="ml-4 h-px bg-border/50 flex-1"></div>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedGame.packages?.map((pkg, idx) => (
                    <div key={idx} className="bg-[#0b0d14] border border-border hover:border-accent/50 rounded-xl p-4 transition-all hover:-translate-y-1 cursor-pointer relative overflow-hidden group">
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center z-10">
                          <Star className="w-3 h-3 mr-1" fill="currentColor" />
                          POPULAR
                        </div>
                      )}
                      
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex items-center space-x-3 mb-4">
                           <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-border border-b-2 font-bold text-accent">
                             <Gamepad2 className="w-5 h-5 text-accent" />
                           </div>
                           <div>
                             <h5 className="font-bold text-white text-lg leading-none">{pkg.amount}</h5>
                             <span className="text-xs text-gray-500 uppercase tracking-widest">{selectedGame.currency}</span>
                           </div>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-border/50 pt-3">
                           <span className="text-xl font-bold text-white">${pkg.price}</span>
                           <button className="bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/30 hover:border-accent transition-colors px-3 py-1.5 rounded-md text-xs font-bold w-auto">
                             BUY
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

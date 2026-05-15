import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Users, ShoppingCart, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
  const { logout, currentUser } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const NavLinks = ({ onClick }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClick}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 mb-2 ${
              isActive 
                ? 'bg-primary/10 text-primary border border-primary/30 neon-box-primary' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary' : ''}`} />
            <span className="font-medium tracking-wide">{item.name}</span>
          </Link>
        )
      })}
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-surface/90 border-r border-border hidden md:flex flex-col backdrop-blur-xl">
        <div className="h-24 flex items-center px-8 border-b border-border/50">
          <h1 className="text-3xl font-bold text-primary neon-text-primary tracking-widest">NEXUS<span className="text-white">PAY</span></h1>
        </div>
        
        <nav className="flex-1 py-10 px-6 overflow-y-auto">
          <NavLinks />
        </nav>

        <div className="p-6 border-t border-border/50 bg-background/50">
          <div className="flex items-center px-4 py-3 mb-4 rounded-xl bg-surface/50 border border-border shadow-lg">
             <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent text-accent flex items-center justify-center font-bold mr-4">
               {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold text-white truncate">{currentUser?.name || 'Administrator'}</p>
               <p className="text-xs text-gray-400 truncate">{currentUser?.email || 'admin@nexus.com'}</p>
             </div>
          </div>
          <button 
            onClick={() => logout()}
            className="flex items-center justify-center w-full px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-transparent hover:border-red-500/50 rounded-xl transition-all duration-300 font-bold tracking-wide"
          >
            <LogOut className="h-5 w-5 mr-3" />
            DISCONNECT
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" 
            />
            <motion.aside 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-surface border-r border-border flex flex-col z-50 shadow-2xl"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
                <h1 className="text-2xl font-bold text-primary neon-text-primary tracking-widest">NEXUS<span className="text-white">PAY</span></h1>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 py-8 px-4 overflow-y-auto">
                <NavLinks onClick={() => setMobileMenuOpen(false)} />
              </nav>
              <div className="p-6 border-t border-border/50 bg-background/50">
                <button 
                  onClick={() => logout()}
                  className="flex items-center justify-center w-full px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl transition-all font-bold"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  DISCONNECT
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#06070a]">
        <header className="h-24 flex items-center justify-between px-6 md:px-12 bg-surface/80 backdrop-blur-xl border-b border-border z-10 sticky top-0 shadow-md">
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-400 hover:text-white p-2 -ml-2 mr-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-gray-700"
            >
              <Menu className="h-7 w-7" />
            </button>
            <h1 className="text-xl font-bold text-primary neon-text-primary tracking-widest">NEXUS<span className="text-white">PAY</span></h1>
          </div>
          
          <div className="hidden md:flex flex-1 items-center">
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono flex items-center tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
              SECURE LINK ACTIVE
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="md:hidden w-10 h-10 rounded-full bg-accent/20 border border-accent text-accent flex items-center justify-center font-bold shadow-[0_0_10px_rgba(255,0,255,0.2)]">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-10 relative scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

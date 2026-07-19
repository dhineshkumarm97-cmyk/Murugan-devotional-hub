import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, PlaySquare, Info, MessageSquare, Sparkles, Youtube, Volume2 } from 'lucide-react';
import HomeView from './components/HomeView';
import VideosView from './components/VideosView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import ChantPlayer from './components/ChantPlayer';

type TabId = 'home' | 'videos' | 'about' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, component: <HomeView /> },
    { id: 'videos', label: 'Videos', icon: PlaySquare, component: <VideosView /> },
    { id: 'about', label: 'About', icon: Info, component: <AboutView /> },
    { id: 'contact', label: 'Contact Us', icon: MessageSquare, component: <ContactView /> },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-amber-50 via-white to-amber-50 text-slate-900 selection:bg-amber-200">
      
      {/* Top Devotional Ticker Banner */}
      <div id="divine-ticker-banner" className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-100 py-1.5 px-4 text-xs font-medium tracking-wide shadow-sm border-b border-amber-950/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Moving Ticker */}
          <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
            <span className="shrink-0 bg-amber-600 text-gold-100 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
              Divine Mantra
            </span>
            <div className="whitespace-nowrap animate-marquee flex gap-4 text-[11px] font-display font-medium text-gold-200">
              <span>🕉️ Om Saravana Bhava</span> • 
              <span>Vetrivel Muruganukku Arohara!</span> • 
              <span>Om Subramanyaya Namaha</span> • 
              <span>Kandan Karunai Potri!</span>
            </div>
          </div>

          {/* Quick info */}
          <div className="hidden md:flex items-center gap-4 text-[11px] text-amber-200 font-medium">
            <span>🌺 Blessed Space</span>
            <span>•</span>
            <span>No Account Required to Connect</span>
          </div>
        </div>
      </div>

      {/* Main Beautiful Nav Header */}
      <header id="main-app-header" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo / Sacred Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-gold-400 flex items-center justify-center text-white shadow-md shadow-amber-900/10 ring-2 ring-amber-100">
              <span className="text-2xl" title="Divine Vel">🔱</span>
            </div>
            <div>
              <h1 className="font-display font-extrabold text-base sm:text-xl text-amber-950 tracking-wider flex items-center gap-1.5 leading-none">
                MURUGAN <span className="text-amber-600">HUB</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-widest font-mono uppercase mt-1">
                Vetrivel Thunai 🌺
              </p>
            </div>
          </div>

          {/* Center tabs for Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 bg-amber-100/30 p-1 rounded-full border border-amber-200/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-nav-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-white' 
                      : 'text-amber-950 hover:bg-amber-100/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 bg-amber-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Sound Control widget right */}
          <div className="flex items-center gap-2">
            <ChantPlayer />
          </div>
        </div>
      </header>

      {/* Main Devotional Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full"
          >
            {tabs.find((t) => t.id === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-amber-100 z-50 py-2.5 px-4 shadow-2xl flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-1 transition-all duration-300 ${
                isActive ? 'text-amber-600 scale-105 font-bold' : 'text-slate-500 hover:text-amber-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold tracking-wide uppercase">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 border-t border-amber-900 py-10 pb-20 md:pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔱</span>
              <h4 className="font-display font-bold text-base text-gold-300 tracking-wider">LORD MURUGAN DEVOTIONAL HUB</h4>
            </div>
            <p className="text-xs text-amber-200/70 leading-relaxed max-w-sm">
              Connecting global devotees with traditional Tamil bhajans, sacred rituals, and sea-shore Virtual Darshans. May His Vel guide us through all shadows.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-gold-300 uppercase tracking-wider">Divine Spaces</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="text-left text-amber-200/80 hover:text-gold-400 transition-colors uppercase tracking-wider text-[11px]"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-gold-300 uppercase tracking-wider">Direct Inbox</h4>
            <p className="text-xs text-amber-200/70 leading-relaxed">
              No account required. Use the simple form in the <strong>Contact Us</strong> tab to send feedback or advertising proposals directly to our inbox.
            </p>
            <p className="text-[10px] text-amber-300/50 font-mono">
              May Lord Murugan’s blessings be with you always.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-400/50">
          <p>© 2026 Lord Murugan Devotional Hub. All Rights Reserved.</p>
          <p className="font-mono">Vetrivel Muruganukku Arohara! 🙏</p>
        </div>
      </footer>
    </div>
  );
}

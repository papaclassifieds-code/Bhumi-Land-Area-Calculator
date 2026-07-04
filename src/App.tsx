import { useState } from 'react';
import { ViewState } from './types';
import Home from './views/Home';
import Converter from './views/Converter';
import Calculator from './views/Calculator';
import History from './views/History';
import Guide from './views/Guide';
import Settings from './views/Settings';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: 'home', title: 'Dashboard', icon: '📊' },
    { id: 'converter', title: 'Unit Converter', icon: '🔄' },
    { id: 'calculator', title: 'Area Calculator', icon: '📐' },
    { id: 'history', title: 'Recent History', icon: '🕒' },
    { id: 'guide', title: 'Unit Guide', icon: '📖' },
    { id: 'settings', title: 'Settings', icon: '⚙️' },
  ] as const;

  const getTitle = () => {
    switch (currentView) {
      case 'home': return 'Dashboard';
      case 'converter': return 'Unit Converter';
      case 'calculator': return 'Area Calculator';
      case 'history': return 'Recent Conversions';
      case 'guide': return 'Unit Guide';
      case 'settings': return 'Settings';
    }
  };

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden transition-colors duration-300 bg-[#F6FBF4] dark:bg-slate-950 text-slate-800 dark:text-slate-100 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} bg-[#E7F3E5] dark:bg-slate-900 flex flex-col border-r border-[#D0E4CD] dark:border-slate-800`}>
        <div className="p-8 pb-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              </div>
              <h1 className="text-2xl font-bold text-[#1B5E20] dark:text-green-400 tracking-tight">Bhumi</h1>
            </div>
            <p className="text-xs font-semibold text-[#4CAF50] uppercase tracking-widest ml-1">Land Area Calculator</p>
          </div>
          <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-colors ${currentView === item.id ? 'bg-[#C8E6C9] dark:bg-green-900/40 text-[#1B5E20] dark:text-green-300 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5'}`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.title}
            </button>
          ))}
        </nav>
        
        <div className="p-6 bg-[#DCEBDA] dark:bg-green-950/30 m-4 rounded-3xl">
          <p className="text-[10px] text-[#2E7D32] dark:text-green-500 leading-tight font-medium opacity-80 uppercase mb-2 tracking-wider">Disclaimer</p>
          <p className="text-[9px] text-[#1B5E20] dark:text-green-400/80 leading-[1.4] italic">Land area conversions vary by state. Please verify with local authorities for legal decisions.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col w-full h-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#F6FBF4] dark:bg-slate-950 border-b border-green-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 dark:text-slate-300">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">{getTitle()}</h1>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 max-w-6xl mx-auto w-full">
          {currentView === 'home' && <Home onNavigate={navigate} />}
          {currentView === 'converter' && <Converter />}
          {currentView === 'calculator' && <Calculator />}
          {currentView === 'history' && <History />}
          {currentView === 'guide' && <Guide />}
          {currentView === 'settings' && <Settings isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />}
        </div>
      </main>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

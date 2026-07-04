import React from 'react';
import { Moon, Sun, Info, Shield, Star, Share2, Globe } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Settings({ isDarkMode, toggleDarkMode }: SettingsProps) {
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bhumi Land Area Calculator',
        text: 'Try Bhumi Land Area Calculator for all your land measurement and conversion needs!',
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-4 shadow-sm border border-[#E0E0E0] dark:border-slate-700">
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl">
              {isDarkMode ? <Moon className="w-6 h-6 text-slate-700 dark:text-slate-300" /> : <Sun className="w-6 h-6 text-slate-700 dark:text-slate-300" />}
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toggle application theme</p>
            </div>
          </div>
          <button 
            onClick={toggleDarkMode}
            className={`w-14 h-8 rounded-full transition-colors relative ${isDarkMode ? 'bg-[#4CAF50]' : 'bg-slate-300 dark:bg-slate-600'}`}
          >
            <span className={`block w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-2 mx-4" />

        <div className="p-4 flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl">
              <Globe className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Language</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">English (Hindi coming soon)</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-2 mx-4" />

        <button onClick={handleShareApp} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-2xl text-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-2xl">
              <Share2 className="w-6 h-6 text-[#2E7D32] dark:text-green-400" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Share App</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Recommend to friends</p>
            </div>
          </div>
        </button>

        <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-2 mx-4" />

        <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-2xl text-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-2xl">
              <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Rate App</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Support us on Play Store</p>
            </div>
          </div>
        </button>

        <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-2 mx-4" />

        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-2xl cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Privacy Policy</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-2 mx-4" />

        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-2xl cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl">
              <Info className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">About</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Bhumi v1.0.0</p>
            </div>
          </div>
        </div>

      </div>
      
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 space-y-3 px-6 pt-4 font-medium">
        <p>Land area conversions are based on commonly accepted conversion values. Certain traditional land measurement units, such as Bigha, may vary by state or region.</p>
        <p>Users should verify measurements with local authorities or qualified professionals before making legal, commercial, or agricultural decisions.</p>
      </div>

    </div>
  );
}

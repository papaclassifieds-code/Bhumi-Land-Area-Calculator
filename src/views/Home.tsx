import React from 'react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export default function Home({ onNavigate }: HomeProps) {
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
    <div className="animate-in flex flex-col h-full">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Good Morning, <span className="text-green-700 dark:text-green-400">Krishak</span>
        </h2>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-green-200 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm opacity-50 cursor-not-allowed">English</button>
          <button onClick={handleShareApp} className="px-5 py-2.5 bg-green-700 rounded-full text-sm font-semibold text-white shadow-md hover:bg-green-800 transition-colors">Share App</button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div onClick={() => onNavigate('converter')} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-[#E0E0E0] dark:border-slate-700 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-[#E8F5E9] dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🌾</div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-slate-800 dark:text-slate-100">Unit<br/>Converter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Convert Acre to Bigha</p>
          </div>
        </div>

        <div onClick={() => onNavigate('calculator')} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-[#E0E0E0] dark:border-slate-700 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-[#FFF3E0] dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📏</div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-slate-800 dark:text-slate-100">Area<br/>Calculator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calculate via Dimensions</p>
          </div>
        </div>

        <div onClick={() => onNavigate('history')} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-[#E0E0E0] dark:border-slate-700 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-[#F3E5F5] dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🕒</div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-slate-800 dark:text-slate-100">Recent<br/>Conversions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last 20 operations</p>
          </div>
        </div>

        <div onClick={() => onNavigate('guide')} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-[#E0E0E0] dark:border-slate-700 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-[#E1F5FE] dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📖</div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-slate-800 dark:text-slate-100">Unit<br/>Guide</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Educational Resources</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-[#D0E4CD] dark:border-slate-700 shadow-sm p-8 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold text-[#1B5E20] dark:text-green-400 mb-2">Ready to measure?</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">Select an option from the dashboard above or the sidebar menu to start calculating and converting land area quickly and accurately offline.</p>
      </div>
    </div>
  );
}

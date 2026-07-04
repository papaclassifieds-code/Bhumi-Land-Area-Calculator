import React, { useState, useEffect } from 'react';
import { getHistory, removeHistoryItem, clearHistory } from '../utils/storage';
import { ConversionRecord } from '../types';
import { formatNumber, convert } from '../utils/conversions';
import { Trash2, ArrowRight } from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState<ConversionRecord[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    removeHistoryItem(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400 animate-in fade-in duration-500">
        <p>No recent conversions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Recent Activity</h2>
        <button 
          onClick={handleClearAll}
          className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {history.map(record => {
          const result = convert(record.fromValue, record.fromUnit, record.toUnit, record.fromBighaState, record.toBighaState);
          const date = new Date(record.timestamp).toLocaleDateString(undefined, { 
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
          });

          return (
            <div key={record.id} className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm border border-[#E0E0E0] dark:border-slate-700 flex justify-between items-center group relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex-1">
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider">{date}</div>
                <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-100">
                  <span className="font-bold text-lg">{formatNumber(record.fromValue)}</span>
                  <span className="text-sm font-medium opacity-80">{record.fromUnit}</span>
                  <ArrowRight className="w-4 h-4 text-[#4CAF50]" />
                  <span className="font-bold text-lg text-[#2E7D32] dark:text-green-400">{formatNumber(result)}</span>
                  <span className="text-sm font-medium text-[#2E7D32] dark:text-green-400 opacity-80">{record.toUnit}</span>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(record.id)}
                className="p-3 bg-red-50 dark:bg-red-900/20 text-red-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors"
                aria-label="Delete record"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

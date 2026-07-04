import React, { useState, useEffect } from 'react';
import { Unit, BighaState, FavoriteRecord } from '../types';
import { allUnits, allBighaStates, convert, getAllConversions, formatNumber } from '../utils/conversions';
import { addHistory, addFavorite, getFavorites, removeFavorite } from '../utils/storage';
import { Share2, Star } from 'lucide-react';

export default function Converter() {
  const [fromUnit, setFromUnit] = useState<Unit>('Acre');
  const [toUnit, setToUnit] = useState<Unit>('Hectare');
  const [inputValue, setInputValue] = useState<string>('5.0');
  
  const [fromBighaState, setFromBighaState] = useState<BighaState>('Standard');
  const [toBighaState, setToBighaState] = useState<BighaState>('Standard');
  
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (!isNaN(val) && val > 0) {
      const timeout = setTimeout(() => {
        addHistory({
          fromValue: val,
          fromUnit,
          toUnit,
          fromBighaState,
          toBighaState,
        });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [inputValue, fromUnit, toUnit, fromBighaState, toBighaState]);

  const numValue = parseFloat(inputValue) || 0;
  const result = convert(numValue, fromUnit, toUnit, fromBighaState, toBighaState);
  const multiResults = getAllConversions(numValue, fromUnit, fromBighaState, toBighaState);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromBighaState(toBighaState);
    setToBighaState(fromBighaState);
  };

  const handleShare = () => {
    if (numValue <= 0) return;
    let text = `Land Area Conversion\n\n${formatNumber(numValue)} ${fromUnit}\n=\n`;
    multiResults.slice(0, 5).forEach(res => {
      text += `${formatNumber(res.value)} ${res.unit}\n=\n`;
    });
    text = text.slice(0, -3);
    text += `\n\nGenerated using Bhumi Land Area Calculator`;
    if (navigator.share) {
      navigator.share({ title: 'Land Area Conversion', text: text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const handleToggleFavorite = () => {
    const isFav = favorites.find(f => f.fromUnit === fromUnit && f.toUnit === toUnit);
    if (isFav) {
      removeFavorite(isFav.id);
    } else {
      addFavorite({ fromUnit, toUnit, fromBighaState, toBighaState });
    }
    setFavorites(getFavorites());
  };

  const isCurrentFavorite = favorites.some(f => f.fromUnit === fromUnit && f.toUnit === toUnit);

  return (
    <div className="animate-in flex flex-col h-full gap-6">
      
      {favorites.length > 0 && (
        <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          {favorites.map(fav => (
            <button
              key={fav.id}
              onClick={() => {
                setFromUnit(fav.fromUnit);
                setToUnit(fav.toUnit);
                if (fav.fromBighaState) setFromBighaState(fav.fromBighaState);
                if (fav.toBighaState) setToBighaState(fav.toBighaState);
              }}
              className="flex-shrink-0 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-full text-sm font-semibold border border-[#D0E4CD] dark:border-slate-700 shadow-sm"
            >
              {fav.fromUnit} → {fav.toUnit}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 flex gap-8 flex-col lg:flex-row min-h-0">
        <div className="flex-1 bg-white dark:bg-slate-800 border border-[#D0E4CD] dark:border-slate-700 rounded-[2.5rem] shadow-sm p-6 sm:p-8 flex flex-col">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Quick Converter</h3>
            <div className="flex bg-[#F1F8E9] dark:bg-green-900/20 rounded-full p-1 border border-[#D0E4CD] dark:border-green-900/50">
              <button className="px-4 py-1.5 bg-[#2E7D32] text-white rounded-full text-xs font-bold shadow-sm">Converter</button>
              <button onClick={swapUnits} className="px-4 py-1.5 text-[#2E7D32] dark:text-green-400 rounded-full text-xs font-bold hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">Swap Units</button>
            </div>
          </div>

          <div className="space-y-6 flex-1 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">From Unit</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as Unit)}
                  className="w-full p-4 bg-[#F8F8F8] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl appearance-none font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32]"
                >
                  {allUnits.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <div className="absolute right-4 top-10 pointer-events-none text-slate-400 text-xs">▼</div>
              </div>
              
              <div className="relative">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">To Unit</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value as Unit)}
                  className="w-full p-4 bg-[#F8F8F8] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl appearance-none font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32]"
                >
                  {allUnits.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <div className="absolute right-4 top-10 pointer-events-none text-slate-400 text-xs">▼</div>
              </div>
            </div>

            {(fromUnit === 'Bigha' || toUnit === 'Bigha') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fromUnit === 'Bigha' && (
                  <div className="relative">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">From Region</label>
                    <select
                      value={fromBighaState}
                      onChange={(e) => setFromBighaState(e.target.value as BighaState)}
                      className="w-full p-3 bg-[#F8F8F8] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl appearance-none font-medium text-sm text-slate-800 dark:text-slate-100 outline-none"
                    >
                      {allBighaStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="absolute right-4 top-9 pointer-events-none text-slate-400 text-[10px]">▼</div>
                  </div>
                )}
                {toUnit === 'Bigha' && (
                  <div className="relative">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">To Region</label>
                    <select
                      value={toBighaState}
                      onChange={(e) => setToBighaState(e.target.value as BighaState)}
                      className="w-full p-3 bg-[#F8F8F8] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl appearance-none font-medium text-sm text-slate-800 dark:text-slate-100 outline-none"
                    >
                      {allBighaStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="absolute right-4 top-9 pointer-events-none text-slate-400 text-[10px]">▼</div>
                  </div>
                )}
              </div>
            )}

            <div className="py-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Enter Area Value</label>
                <button 
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${isCurrentFavorite ? 'text-yellow-600 dark:text-yellow-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  <Star className={`w-3.5 h-3.5 ${isCurrentFavorite ? 'fill-current' : ''}`} /> {isCurrentFavorite ? 'Saved' : 'Save'}
                </button>
              </div>
              <div className="flex items-center border-b-2 border-[#2E7D32] dark:border-green-500 py-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full text-5xl sm:text-6xl font-bold text-[#2E7D32] dark:text-green-400 bg-transparent outline-none p-0 border-none focus:ring-0"
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className="mt-auto">
              {numValue > 0 ? (
                <div className="bg-[#F1F8E9] dark:bg-green-900/20 p-6 rounded-3xl border border-[#D0E4CD] dark:border-green-900/50 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#1B5E20] dark:text-green-400 break-all pr-4">{formatNumber(result)}</span>
                  <span className="px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full text-sm font-bold text-[#1B5E20] dark:text-green-400 border border-[#C8E6C9] dark:border-green-900/50 whitespace-nowrap">{toUnit}</span>
                </div>
              ) : (
                <div className="bg-[#F8F8F8] dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
                  <span className="text-sm font-semibold">Enter a value to see result</span>
                </div>
              )}
            </div>
            
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="flex-1 bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-6 text-white overflow-hidden flex flex-col shadow-xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#4CAF50] mb-4">Multi-Unit Equivalent</h4>
            <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
              {numValue > 0 ? multiResults.filter(r => r.unit !== fromUnit).map((res) => (
                <div key={res.unit} className="p-3 bg-white/10 hover:bg-white/15 transition-colors rounded-2xl flex justify-between items-center">
                  <span className="text-xs text-white/60">{res.unit} {res.unit === 'Bigha' && fromUnit !== 'Bigha' ? `(${toBighaState})` : ''}</span>
                  <span className="font-mono font-bold text-sm truncate pl-2">{formatNumber(res.value)}</span>
                </div>
              )) : (
                <div className="text-sm text-white/40 text-center py-8">Waiting for input...</div>
              )}
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <button onClick={handleShare} disabled={numValue <= 0} className="w-full py-3 bg-[#4CAF50] hover:bg-[#388E3C] disabled:opacity-50 disabled:hover:bg-[#4CAF50] transition-colors text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share Results
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

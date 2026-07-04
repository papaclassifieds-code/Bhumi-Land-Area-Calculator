import React, { useState } from 'react';
import { Unit } from '../types';
import { allUnits, convert, formatNumber } from '../utils/conversions';

export default function Calculator() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [inputUnit, setInputUnit] = useState<'Feet' | 'Meter' | 'Yard'>('Feet');

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const areaValue = l * w;

  let fromAreaUnit: Unit = 'Square Feet';
  if (inputUnit === 'Meter') fromAreaUnit = 'Square Meter';
  if (inputUnit === 'Yard') fromAreaUnit = 'Square Yard';

  const multiResults = areaValue > 0 ? allUnits.map(u => ({
    unit: u,
    value: convert(areaValue, fromAreaUnit, u)
  })) : [];

  return (
    <div className="animate-in flex flex-col h-full gap-6">
      
      <div className="flex-1 flex gap-8 flex-col lg:flex-row min-h-0">
        <div className="flex-1 bg-white dark:bg-slate-800 border border-[#D0E4CD] dark:border-slate-700 rounded-[2.5rem] shadow-sm p-6 sm:p-8 flex flex-col">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Area Calculator</h3>
            <div className="flex bg-[#F1F8E9] dark:bg-green-900/20 rounded-full p-1 border border-[#D0E4CD] dark:border-green-900/50">
              <span className="px-4 py-1.5 bg-[#2E7D32] text-white rounded-full text-xs font-bold shadow-sm">L × W</span>
            </div>
          </div>

          <div className="space-y-6 flex-1 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Length</label>
                <div className="flex items-center bg-[#F8F8F8] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 focus-within:border-[#2E7D32] focus-within:ring-1 focus-within:ring-[#2E7D32] transition-shadow">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full text-xl font-bold text-slate-800 dark:text-slate-100 bg-transparent outline-none p-0 border-none focus:ring-0"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Width</label>
                <div className="flex items-center bg-[#F8F8F8] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 focus-within:border-[#2E7D32] focus-within:ring-1 focus-within:ring-[#2E7D32] transition-shadow">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full text-xl font-bold text-slate-800 dark:text-slate-100 bg-transparent outline-none p-0 border-none focus:ring-0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Input Measurement Unit</label>
              <div className="flex bg-[#F8F8F8] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1.5 rounded-2xl">
                {(['Feet', 'Meter', 'Yard'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setInputUnit(u)}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                      inputUnit === u 
                        ? 'bg-white dark:bg-slate-800 text-[#1B5E20] dark:text-green-400 shadow-sm border border-slate-100 dark:border-slate-700' 
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              {areaValue > 0 ? (
                <div className="bg-[#F1F8E9] dark:bg-green-900/20 p-6 rounded-3xl border border-[#D0E4CD] dark:border-green-900/50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#4CAF50] tracking-widest mb-1">Total Area</p>
                    <span className="text-2xl font-bold text-[#1B5E20] dark:text-green-400 break-all">{formatNumber(areaValue)}</span>
                  </div>
                  <span className="px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full text-sm font-bold text-[#1B5E20] dark:text-green-400 border border-[#C8E6C9] dark:border-green-900/50 whitespace-nowrap">{fromAreaUnit}</span>
                </div>
              ) : (
                <div className="bg-[#F8F8F8] dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
                  <span className="text-sm font-semibold">Enter dimensions to calculate</span>
                </div>
              )}
            </div>
            
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="flex-1 bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-6 text-white overflow-hidden flex flex-col shadow-xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#4CAF50] mb-4">Equivalent Area</h4>
            <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
              {areaValue > 0 ? multiResults.filter(r => r.unit !== fromAreaUnit).map((res) => (
                <div key={res.unit} className="p-3 bg-white/10 hover:bg-white/15 transition-colors rounded-2xl flex justify-between items-center">
                  <span className="text-xs text-white/60">{res.unit}</span>
                  <span className="font-mono font-bold text-sm truncate pl-2">{formatNumber(res.value)}</span>
                </div>
              )) : (
                <div className="text-sm text-white/40 text-center py-8">Waiting for input...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

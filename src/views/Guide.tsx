import React from 'react';
import { allBighaStates, bighaStateToSqMeter } from '../utils/conversions';

export default function Guide() {
  const guides = [
    {
      unit: 'Acre',
      desc: 'A unit of land area used in the imperial and US customary systems. It is traditionally defined as the area of one chain by one furlong (66 by 660 feet).',
      eq: '1 Acre = 43,560 sq ft = 4,046.86 sq meters'
    },
    {
      unit: 'Hectare',
      desc: 'A metric unit of square measure, equal to 100 ares (10,000 square meters). Commonly used in agriculture worldwide.',
      eq: '1 Hectare = 10,000 sq meters = ~2.47 acres'
    },
    {
      unit: 'Bigha',
      desc: 'A traditional unit of land measurement in South Asia. Its size varies significantly depending on the region.',
      eq: 'Varies by state (e.g., 27,225 sq ft in UP)'
    },
    {
      unit: 'Guntha',
      desc: 'Also spelled as Gunta, it is a measure of land area used in parts of India. 40 Gunthas make up 1 Acre.',
      eq: '1 Guntha = 1,089 sq ft = ~101.17 sq meters'
    },
    {
      unit: 'Kanal',
      desc: 'A traditional unit of land area used in northern India and Pakistan. 8 Kanals typically make 1 Acre.',
      eq: '1 Kanal = 5,445 sq ft = ~505.86 sq meters'
    },
    {
      unit: 'Marla',
      desc: 'A traditional unit of area used in India and Pakistan. It is equal to one-twentieth of a Kanal.',
      eq: '1 Marla = 272.25 sq ft = ~25.29 sq meters'
    },
    {
      unit: 'Cent',
      desc: 'A unit of land area primarily used in southern India. 100 Cents make up 1 Acre.',
      eq: '1 Cent = 435.6 sq ft = ~40.47 sq meters'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#E7F3E5] dark:bg-green-900/20 p-6 rounded-[2rem] border border-[#D0E4CD] dark:border-green-900/50">
        <p className="text-sm font-medium text-[#1B5E20] dark:text-green-300 leading-relaxed">
          Land area conversions are based on commonly accepted values. Certain traditional units may vary by region. Verify measurements with local authorities for legal decisions.
        </p>
      </div>

      <div className="space-y-5">
        {guides.map(g => (
          <div key={g.unit} className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-[#E0E0E0] dark:border-slate-700 transition-all hover:shadow-md">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{g.unit}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 leading-relaxed">{g.desc}</p>
            <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl inline-block border border-slate-100 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-mono tracking-tight">{g.eq}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 px-2">Bigha Variations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBighaStates.filter(s => s !== 'Standard').map(state => (
            <div key={state} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-[#E0E0E0] dark:border-slate-700 flex justify-between items-center transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{state}</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">~{bighaStateToSqMeter[state]} sq m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Unit, BighaState } from '../types';

export const unitToSqMeter: Record<Unit, number> = {
  'Acre': 4046.85642,
  'Hectare': 10000,
  'Square Meter': 1,
  'Square Feet': 0.09290304,
  'Square Yard': 0.83612736,
  'Bigha': 2529.28,
  'Guntha': 101.171,
  'Kanal': 505.857,
  'Marla': 25.2929,
  'Cent': 40.4686,
  'Decimal': 40.4686,
  'Rood': 1011.71,
};

export const bighaStateToSqMeter: Record<BighaState, number> = {
  'Standard': 2529.28,
  'Punjab': 1011.71,
  'Haryana': 1011.71,
  'Rajasthan': 1618.7,
  'Madhya Pradesh': 1083.33,
  'Uttar Pradesh': 2529.28,
  'Bihar': 2529.28,
  'Gujarat': 1618.7,
};

export function getSqMeterMultiplier(unit: Unit, bighaState: BighaState = 'Standard') {
  if (unit === 'Bigha') {
    return bighaStateToSqMeter[bighaState] || bighaStateToSqMeter['Standard'];
  }
  return unitToSqMeter[unit] || 1;
}

export function convert(value: number, fromUnit: Unit, toUnit: Unit, fromState: BighaState = 'Standard', toState: BighaState = 'Standard'): number {
  if (!value || isNaN(value)) return 0;
  const inSqMeter = value * getSqMeterMultiplier(fromUnit, fromState);
  return inSqMeter / getSqMeterMultiplier(toUnit, toState);
}

export function getAllConversions(value: number, fromUnit: Unit, fromState: BighaState = 'Standard', toState: BighaState = 'Standard'): { unit: Unit, value: number }[] {
  const units: Unit[] = [
    'Acre', 'Hectare', 'Square Meter', 'Square Feet', 'Square Yard',
    'Bigha', 'Guntha', 'Kanal', 'Marla', 'Cent', 'Decimal', 'Rood'
  ];
  return units.map(u => ({
    unit: u,
    value: convert(value, fromUnit, u, fromState, u === 'Bigha' ? toState : 'Standard')
  }));
}

export function formatNumber(num: number, maxDecimals: number = 4): string {
  if (num === 0) return '0';
  if (num < 0.0001) return num.toExponential(4);
  
  // Format with commas and appropriate decimal places
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maxDecimals,
  }).format(num);
  
  return formatted;
}

export const allUnits: Unit[] = [
  'Acre', 'Hectare', 'Square Meter', 'Square Feet', 'Square Yard',
  'Bigha', 'Guntha', 'Kanal', 'Marla', 'Cent', 'Decimal', 'Rood'
];

export const allBighaStates: BighaState[] = [
  'Standard', 'Punjab', 'Haryana', 'Rajasthan', 'Madhya Pradesh', 'Uttar Pradesh', 'Bihar', 'Gujarat'
];

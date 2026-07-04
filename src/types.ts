export type Unit = 
  | 'Acre' | 'Hectare' | 'Square Meter' | 'Square Feet' | 'Square Yard'
  | 'Bigha' | 'Guntha' | 'Kanal' | 'Marla' | 'Cent' | 'Decimal' | 'Rood';

export type BighaState = 
  | 'Standard' | 'Punjab' | 'Haryana' | 'Rajasthan' | 'Madhya Pradesh' | 'Uttar Pradesh' | 'Bihar' | 'Gujarat';

export interface ConversionRecord {
  id: string;
  timestamp: number;
  fromValue: number;
  fromUnit: Unit;
  toUnit: Unit;
  fromBighaState?: BighaState;
  toBighaState?: BighaState;
}

export interface FavoriteRecord {
  id: string;
  fromUnit: Unit;
  toUnit: Unit;
  fromBighaState?: BighaState;
  toBighaState?: BighaState;
}

export type ViewState = 'home' | 'converter' | 'calculator' | 'history' | 'guide' | 'settings';

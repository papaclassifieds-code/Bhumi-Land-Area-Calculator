import { ConversionRecord, FavoriteRecord } from '../types';

const HISTORY_KEY = 'bhumi_history';
const FAVORITES_KEY = 'bhumi_favorites';

export function getHistory(): ConversionRecord[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addHistory(record: Omit<ConversionRecord, 'id' | 'timestamp'>) {
  const current = getHistory();
  const newRecord: ConversionRecord = {
    ...record,
    id: Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
  };
  const updated = [newRecord, ...current].slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function removeHistoryItem(id: string) {
  const current = getHistory();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getFavorites(): FavoriteRecord[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(record: Omit<FavoriteRecord, 'id'>) {
  const current = getFavorites();
  const exists = current.find(r => 
    r.fromUnit === record.fromUnit && r.toUnit === record.toUnit &&
    r.fromBighaState === record.fromBighaState && r.toBighaState === record.toBighaState
  );
  if (exists) return;

  const newRecord: FavoriteRecord = {
    ...record,
    id: Math.random().toString(36).substring(2, 9),
  };
  const updated = [...current, newRecord];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function removeFavorite(id: string) {
  const current = getFavorites();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

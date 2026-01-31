import { create } from 'zustand';
import { type Stats, type GameScreen, type EraData, type StatChange } from '../types';

interface GameState {
  // Session
  sessionId: string | null;
  currentScreen: GameScreen;
  currentEra: number;
  stats: Stats;
  
  // Data
  eraData: EraData | null;
  isLoading: boolean;

  // Actions
  setScreen: (screen: GameScreen) => void;
  updateStats: (newStats: Stats) => void;
  startGame: () => Promise<void>;
  loadEra: (eraId: number) => Promise<void>;
}

// Mock initial stats for UI dev before backend is ready
const INITIAL_STATS: Stats = {
  military: 50,
  economy: 50,
  stability: 50,
  republic: 50
};

export const useGameStore = create<GameState>((set) => ({
  sessionId: null,
  currentScreen: 'TITLE',
  currentEra: 1,
  stats: INITIAL_STATS,
  eraData: null,
  isLoading: false,

  setScreen: (screen) => set({ currentScreen: screen }),
  
  updateStats: (newStats) => set({ stats: newStats }),

  startGame: async () => {
    set({ isLoading: true });
    // TODO: Connect to Person B's API
    // const res = await fetch('http://localhost:8000/game/start', { method: 'POST' });
    // const data = await res.json();
    
    // Mocking for now:
    setTimeout(() => {
      set({ 
        sessionId: 'mock-session', 
        stats: INITIAL_STATS,
        currentEra: 1,
        currentScreen: 'ERA_INTRO',
        isLoading: false
      });
    }, 500);
  },

  loadEra: async (eraId) => {
    set({ isLoading: true });
    // TODO: Fetch era data
    set({ isLoading: false });
  }
}));
import { create } from 'zustand';
import { type Stats, type GameScreen, type EraData } from '../types';

interface GameState {
    // Session
    sessionId: string | null;
    currentScreen: GameScreen;
    currentEra: number;
    stats: Stats;
    evidenceViewed: string[]; // List of evidence IDs
    advisorsConsulted: string[]; // List of advisors IDs

    // Data
    eraData: EraData | null;
    isLoading: boolean;

    // Actions
    setScreen: (screen: GameScreen) => void;
    updateStats: (newStats: Stats) => void;
    startGame: () => Promise<void>;
    loadEra: (eraId: number) => Promise<void>;
    viewEvidence: (id: string) => void;
    consultAdvisor: (id: string) => void;
    checkReadyForDecision: () => boolean;
}

// Mock initial stats for UI dev before backend is ready
const INITIAL_STATS: Stats = {
    military: 50,
    economy: 50,
    stability: 50,
    republic: 50
};

export const useGameStore = create<GameState>((set, get) => ({
    sessionId: null,
    currentScreen: 'TITLE',
    currentEra: 1,
    stats: INITIAL_STATS,
    eraData: null,
    isLoading: false,
    evidenceViewed: [],
    advisorsConsulted: [],

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

    loadEra: async (_eraId) => {
        set({ isLoading: true });
        // Simulate API delay
        setTimeout(async () => {
            // Import mock data here to avoid circular dependency issues at top level if needed
            const { MOCK_ERA_1 } = await import('../data/mockData');
            set({
                eraData: MOCK_ERA_1,
                evidenceViewed: [],
                advisorsConsulted: [],
                isLoading: false
            });
        }, 300);
    },

    viewEvidence: (id) => {
        const { evidenceViewed, stats, eraData } = get();
        if (evidenceViewed.includes(id)) return;

        console.log(stats);

        // Apply immediate stat impact from Mock Data
        const evidenceItem = eraData?.evidence.find(e => e.id === id);
        if (evidenceItem && evidenceItem.stat_impact) {
            // logic to update stats would go here
            // For now just mark viewed
        }

        set({ evidenceViewed: [...evidenceViewed, id] });
    },

    consultAdvisor: (id) => {
        const { advisorsConsulted } = get();
        if (!advisorsConsulted.includes(id)) {
            set({ advisorsConsulted: [...advisorsConsulted, id] });
        }
    },

    checkReadyForDecision: () => {
        const { evidenceViewed, advisorsConsulted } = get();
        // Rule: 3 Evidence + 1 Advisor (from guide)
        return evidenceViewed.length >= 3 && advisorsConsulted.length >= 1;
    }
}));
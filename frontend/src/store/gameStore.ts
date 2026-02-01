import { create } from 'zustand';
import { type Stats, type GameScreen, type EraData } from '../types';
import { api } from '../lib/api';

interface GameState {
    // Session
    sessionId: string | null;
    currentScreen: GameScreen;
    currentEra: number;
    stats: Stats;

    // Data
    eraData: EraData | null;
    isLoading: boolean;
    error: string | null;

    // Interaction State
    evidenceViewed: string[]; // List of evidence IDs
    advisorsConsulted: string[]; // List of advisors IDs
    activePopup: 'evidence' | 'advisor' | null;
    activeItemId: string | null;

    // Actions
    setScreen: (screen: GameScreen) => void;
    startGame: () => Promise<void>;
    loadEra: (eraId: number) => Promise<void>;
    viewEvidence: (id: string) => void;
    consultAdvisor: (id: string) => void; // Still local/simulated for now
    updateStats: (newStats: Stats) => void;
    makeDecision: (choiceId: string) => Promise<void>;

    // updateStats: (newStats: Stats) => void;
    // UI Actions
    checkReadyForDecision: () => boolean;
    openPopup: (type: 'evidence' | 'advisor', id: string) => void;
    closePopup: () => void;
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
    currentScreen: 'RESULTS',
    currentEra: 1,
    stats: INITIAL_STATS,
    eraData: null,
    isLoading: false,
    error: null,
    evidenceViewed: [],
    advisorsConsulted: [],
    activePopup: null,
    activeItemId: null,

    setScreen: (screen) => set({ currentScreen: screen }),
    updateStats: (newStats) => set({ stats: newStats }),
    openPopup: (type, id) => {
        set({ activePopup: type, activeItemId: id });
    },
    closePopup: () => {
        set({ activePopup: null, activeItemId: null });
    },

    // updateStats: (newStats) => set({ stats: newStats }),

    startGame: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await api.start();
            set({
                sessionId: data.session_id,
                stats: data.stats,
                currentEra: data.current_era,
                currentScreen: 'ERA_INTRO',
                // Reset era specific state
                evidenceViewed: [],
                advisorsConsulted: [],
                eraData: null
            });
        } catch (err) {
            console.error(err);
            set({ error: "Failed to connect to Rome." });
        } finally {
            set({ isLoading: false });
        }
    },

    loadEra: async (eraId) => {
        set({ isLoading: true, error: null });
        try {
            const data = await api.getEra(eraId);
            set({
                eraData: data,
                currentEra: eraId,
                // Reset interaction state for new era
                evidenceViewed: [],
                advisorsConsulted: [],
                activePopup: null
            });
        } catch (err) {
            set({ error: "Failed to load era data." });
        } finally {
            set({ isLoading: false });
        }
    },

    viewEvidence: async(id) => {
        const { sessionId, evidenceViewed, openPopup, stats } = get();

        // Open the UI
        openPopup('evidence', id);

        // If already viewed, don't hit API again
        if (evidenceViewed.includes(id)) return;

        if (!sessionId) return;

        try {
            // Call API to register view and get stat updates
            // The API response structure wasn't fully detailed in the snippet 
            // but usually returns the new game state.
            const response = await api.viewEvidence(id, sessionId);

            set({
                evidenceViewed: [...evidenceViewed, id],
                stats: response.new_stats || stats // Assuming API returns new_stats
            });
        } catch (err) {
            console.error("Failed to record evidence view", err);
        }
    },

    consultAdvisor: (id) => {
        const { advisorsConsulted, openPopup } = get();
        if (!advisorsConsulted.includes(id)) {
            set({ advisorsConsulted: [...advisorsConsulted, id] });
            openPopup('advisor', id);
        }
    },

    makeDecision: async (choiceId) => {
        const { sessionId } = get();
        if (!sessionId) return;

        set({ isLoading: true });
        try {
            const result = await api.makeDecision(choiceId, sessionId);

            // Update stats based on result
            set({
                stats: result.new_stats,
                currentScreen: 'DIVERGENCE',
                // We might want to store the result/outcome text here to display it
            });

            // Return result for the component to use (e.g. for outcome text)
            return result;
        } catch (err) {
            set({ error: "Decision failed." });
        } finally {
            set({ isLoading: false });
        }
    },

    checkReadyForDecision: () => {
        const { evidenceViewed, advisorsConsulted } = get();
        // Rule: 3 Evidence + 1 Advisor (from guide)
        return evidenceViewed.length >= 3 && advisorsConsulted.length >= 1;
    }
}));
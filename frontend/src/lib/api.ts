const API_BASE = import.meta.env.VITE_API_URL;

export const api = {
    async start() {
        const res = await fetch(`${API_BASE}/game/start`, { method: 'POST' });
        if (!res.ok) throw new Error('Failed to start game');
        return res.json();
    },

    async getEra(eraId: number) {
        const res = await fetch(`${API_BASE}/era/${eraId}`);
        if (!res.ok) throw new Error(`Failed to load era ${eraId}`);
        return res.json();
    },

    async viewEvidence(evidenceId: string, sessionId: string) {
        const res = await fetch(`${API_BASE}/evidence/${evidenceId}/view?session_id=${sessionId}`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to view evidence');
        return res.json();
    },

    async makeDecision(choiceId: string, sessionId: string) {
        const res = await fetch(`${API_BASE}/game/decision?session_id=${sessionId}&choice_id=${choiceId}`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to submit decision');
        return res.json();
    },

    async chatWithAdvisor(advisorId: string, message: string, sessionId: string) {
        const res = await fetch(`${API_BASE}/advisor/${advisorId}/chat?session_id=${sessionId}&message=${encodeURIComponent(message)}`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to chat');
        return res.json(); // Expected: { response: "...", message_count: X }
    },

    async getGame(sessionId: string) {
        const res = await fetch(`${API_BASE}/game/${sessionId}`);
        if (!res.ok) throw new Error('Failed to fetch game state');
        return res.json();
    },

    async getResults(sessionId: string) {
        const res = await fetch(`${API_BASE}/results/${sessionId}`);
        if (!res.ok) throw new Error('Failed to get results');
        return res.json();
    },

    async getTimeline(sessionId: string) {
        const res = await fetch(`${API_BASE}/timeline/${sessionId}`);
        if (!res.ok) throw new Error('Failed to get timeline');
        return res.json();
    }
};
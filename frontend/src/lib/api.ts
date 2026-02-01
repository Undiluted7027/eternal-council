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
  
  // Note: Chat endpoint wasn't in your docs, so we keep simulation for now
  // or add it if you find it later.
};
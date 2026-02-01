from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid
from typing import Dict
from content.era1 import ERA_1_DATA
from models.game import GameSession, Stats

def update_stats(current_stats, impact_dict):
    """
    Takes the current stats and applies the changes from an evidence/choice.
    Clamps values between 0 and 100.
    """
    new_stats = current_stats.copy()
    
    for stat, change in impact_dict.items():
        if hasattr(new_stats, stat):
            current_val = getattr(new_stats, stat)
            # Apply change and keep between 0-100
            setattr(new_stats, stat, max(0, min(100, current_val + change)))
            
    return new_stats

ALL_ERAS = {
    1: ERA_1_DATA,
    # 2: ERA_2_DATA, 
}

app = FastAPI()

# Allow the frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory "database" (resets when you restart the server)
sessions: Dict[str, GameSession] = {}

@app.get("/")
def read_root():
    return {"status": "The Council is online"}

@app.post("/game/start", response_model=GameSession)
async def start_game():
    session_id = str(uuid.uuid4())
    new_session = GameSession(session_id=session_id)
    sessions[session_id] = new_session
    print(f"DEBUG: Created session {session_id}") 
    return new_session

@app.get("/game/{session_id}", response_model=GameSession)
async def get_game_state(session_id: str):
    if session_id not in sessions:
        # This triggers the 404 error
        raise HTTPException(status_code=404, detail="Session not found")
    return sessions[session_id]

@app.get("/era/{era_id}")
async def get_era(era_id: int):
    if era_id == 1:
        return ERA_1_DATA
    else:
        raise HTTPException(status_code=404, detail="Era not implemented yet")

@app.post("/evidence/{evidence_id}/view")
async def view_evidence(evidence_id: str, session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session = sessions[session_id]
    
    # 1. Find the evidence in our content
    evidence_item = next((e for e in ERA_1_DATA["evidence"] if e["id"] == evidence_id), None)
    
    if not evidence_item:
        raise HTTPException(status_code=404, detail="Evidence not found")

    # 2. Check if they already viewed it (prevent double-dipping stats)
    if evidence_id in session.evidence_viewed:
        return {"message": "Already viewed"}

    # 3. Record that it was viewed
    session.evidence_viewed.append(evidence_id)
    
    return {
        "message": f"Viewed {evidence_item['title']}",
        "evidence_content": evidence_item["content"]
    }

@app.post("/game/decision")
async def make_decision(session_id: str, choice_id: str):
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # LOAD DATA BASED ON THE SESSION'S CURRENT ERA
    era_data = ALL_ERAS.get(session.current_era)
    if not era_data:
        raise HTTPException(status_code=400, detail=f"Content for Era {session.current_era} not found")

    # 1. Find the choice in the current Era data
    choice = next((c for c in ERA_1_DATA["choices"] if c["id"] == choice_id), None)
    
    if not choice:
        raise HTTPException(status_code=400, detail="Invalid choice")

    # 2. Apply the massive stat impact
    session.stats = update_stats(session.stats, choice["stat_impact"])
    
    # 3. Store the choice and advance the Era
    session.choices[session.current_era] = choice_id
    session.current_era += 1 

    return {
        "outcome_text": choice["outcome_text"],
        "new_stats": session.stats,
        "next_era": session.current_era
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
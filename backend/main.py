from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid
from typing import Dict
from content.era1 import ERA_1_DATA
from content.era2 import ERA_2_DATA
from content.era3 import ERA_3_DATA
from content.era4 import ERA_4_DATA
from content.era5 import ERA_5_DATA
from models.game import GameSession, Stats
from ai.advisor_logic import get_advisor_response
from datetime import datetime

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
    2: ERA_2_DATA,
    3: ERA_3_DATA,
    4: ERA_4_DATA,
    5: ERA_5_DATA, 
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
    new_session = GameSession(
        session_id=session_id, 
        start_time=datetime.now() 
    )    
    sessions[session_id] = new_session
    return new_session

@app.get("/game/{session_id}", response_model=GameSession)
async def get_game_state(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    return sessions[session_id]

@app.get("/era/{era_id}")
async def get_era(era_id: int):
    era_data = ALL_ERAS.get(era_id)
    if not era_data:
        raise HTTPException(status_code=404, detail=f"Era {era_id} not found")
    return era_data

@app.post("/evidence/{evidence_id}/view")
async def view_evidence(evidence_id: str, session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session = sessions[session_id]
    
    era_data = ALL_ERAS.get(session.current_era)

    # 1. Find the evidence in our content
    evidence_item = next((e for e in era_data["evidence"] if e["id"] == evidence_id), None)
    
    if not evidence_item:
        raise HTTPException(status_code=404, detail="Evidence not found")

    # 2. Check if they already viewed it (prevent double-dipping stats)
    if evidence_id in session.evidence_viewed:
        return {"message": "Already viewed"}
    
    session.stats = update_stats(session.stats, evidence_item["stat_impact"])

    session.evidence_viewed.append(evidence_id)
    
    return {
        "message": f"Viewed {evidence_item['title']}",
        "evidence_content": evidence_item["content"],
        "evidence_insight": evidence_item["insight"]
    }

@app.get("/game/{session_id}/stats", response_model=Stats)
async def get_stats(session_id: str):
    """Returns only the stats for a specific session"""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return sessions[session_id].stats

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
    choice = next((c for c in era_data["choices"] if c["id"] == choice_id), None)
    
    if not choice:
        raise HTTPException(status_code=400, detail="Invalid choice")

    # 2. Apply the massive stat impact
    session.stats = update_stats(session.stats, choice["stat_impact"])
    
    # 3. Store the choice and advance the Era
    session.choices[session.current_era] = choice_id
    session.current_era += 1 
    session.evidence_viewed = []

    return {
        "outcome_text": choice["outcome_text"],
        "new_stats": session.stats,
        "next_era": session.current_era
    }

@app.post("/advisor/{advisor_id}/chat")
async def chat_with_advisor(advisor_id: str, session_id: str, message: str):
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    era_data = ALL_ERAS.get(session.current_era)
    
    # Get the AI response and the updated history
    ai_reply, updated_history = await get_advisor_response(
        advisor_id, message, session, era_data
    )
    
    # Save the history back to the session
    session.chats[advisor_id] = updated_history
    sessions[session_id] = session
    
    return {
        "advisor_id": advisor_id,
        "response": ai_reply
    }

@app.get("/results/{session_id}")
async def get_results(session_id: str):
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session.end_time = datetime.now()
    duration = session.end_time - session.start_time
    total_seconds = int(duration.total_seconds())
    minutes = total_seconds // 60
    seconds = total_seconds % 60
    time_string = f"{minutes}m {seconds}s" if minutes > 0 else f"{seconds}s"

    # Calculate correlation (matches / 5 eras)
    matches = sum(1 for era_id in range(1, 6)
                  if session.choices.get(era_id) == ALL_ERAS.get(era_id, {}).get("historical_choice"))
    correlation_score = int((matches / 5) * 100)

    # Determine final state based on stats
    stats = session.stats
    survival_year = 476 + (stats.stability - 50) * 5
    survival_year = max(300, min(1453, survival_year))

    if stats.republic >= 60:
        government = "Constitutional Republic"
    elif stats.military >= 60:
        government = "Military Dictatorship"
    else:
        government = "Principate"

    legacy = "The Alternative Timeline"
    if stats.stability >= 70:
        legacy = "The Golden Age"
    elif stats.military >= 70:
        legacy = "The Iron Legions"

    return {
        "final_stats": {"military": stats.military, "economy": stats.economy,
                       "stability": stats.stability, "republic": stats.republic},
        "final_state": {"survival_year": f"{survival_year} AD",
                       "government": government, "legacy": legacy},
        "total_time_played": time_string,
        "correlation_score": correlation_score
    }


@app.get("/timeline/{session_id}")
async def get_timeline(session_id: str):
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    eras = []
    matches = 0

    for era_id in range(1, 6):
        era_data = ALL_ERAS.get(era_id)
        if not era_data:
            continue

        player_choice_id = session.choices.get(era_id)
        historical_choice_id = era_data.get("historical_choice")

        # Find the choice objects
        player_choice = next((c for c in era_data["choices"] if c["id"] == player_choice_id), None)
        historical_choice = next((c for c in era_data["choices"] if c["id"] == historical_choice_id), None)

        aligned = player_choice_id == historical_choice_id
        if aligned:
            matches += 1

        era_info = {
            "era_id": era_id,
            "title": era_data["title"],
            "year": era_data["year"],
            "player_choice_id": player_choice_id or "",
            "player_choice_title": player_choice["title"] if player_choice else "No choice made",
            "player_choice_image": player_choice.get("image", "") if player_choice else "",
            "player_outcome_text": player_choice["outcome_text"] if player_choice else "",
            "historical_choice_id": historical_choice_id or "",
            "historical_choice_title": historical_choice["title"] if historical_choice else "",
            "historical_choice_image": historical_choice.get("image", "") if historical_choice else "",
            "historical_outcome_text": era_data.get("historical_outcome", ""),
            "aligned_with_history": aligned,
            "stat_impact": player_choice["stat_impact"] if player_choice else {}
        }
        eras.append(era_info)

    correlation_score = int((matches / 5) * 100)

    return {
        "eras": eras,
        "correlation_score": correlation_score
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
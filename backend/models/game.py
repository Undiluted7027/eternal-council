from pydantic import BaseModel
from typing import List, Dict, Optional

class Stats(BaseModel):
    military: int = 50
    economy: int = 50
    stability: int = 50
    republic: int = 50

class GameSession(BaseModel):
    session_id: str
    current_era: int = 1
    stats: Stats = Stats()
    evidence_viewed: List[str] = []
    choices: Dict[int, str] = {}
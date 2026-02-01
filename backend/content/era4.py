ERA_4_DATA = {
    "id": 4,
    "title": "The Crisis",
    "year": "235 AD",
    "intro_text": """The Golden Age is over. Emperor Severus Alexander has been murdered by his own troops.
The General Maximinus Thrax claims the throne. He is a soldier, not a politician.
The borders burn. The money is worthless. The Empire is fracturing.""",
    
    "scene_background": "/assets/gameplaybg.png",
    
    "evidence": [
        {
            "id": "era4_debased_coin",
            "title": "Handful of Antoniniani",
            "position": {"x": 45, "y": 68},
            "sprite": "/assets/evidence/vase.png",
            "content": """New silver coins issued by the mint.
Wait... the silver rubs off. Underneath, it is copper.
Silver content: Less than 40%.""",
            "insight": "Hyperinflation. The government is debasing currency to pay the army. Savings are being wiped out.",
            "stat_impact": {"economy": -15, "stability": -5}
        },
        {
            "id": "era4_border_report",
            "title": "Bloodied Dispatch",
            "position": {"x": 43, "y": 73},
            "sprite": "/assets/evidence/scroll.png",
            "content": """Rhine Frontier: The Alamanni have breached the limes.
Danube Frontier: The Goths are massing.
We need more men. We need more gold.""",
            "insight": "The empire is being attacked on all sides. The current army size is insufficient.",
            "stat_impact": {"military": -10, "stability": -10}
        },
        {
            "id": "era4_senate_letter",
            "title": "Senate Condemnation",
            "position": {"x": 49, "y": 73},
            "sprite": "/assets/evidence/letter.png",
            "content": """To the Legions:
Maximinus is a barbarian usurper. He is declared Enemy of the State.
The Senate recognizes Gordian as Emperor.""",
            "insight": "Civil war. The Senate is actively fighting the Military. Governance has broken down.",
            "stat_impact": {"republic": 5, "stability": -15}
        },
        {
            "id": "era4_plague_report",
            "title": "Physician's Ledger",
            "position": {"x": 55, "y": 73},
            "sprite": "/assets/evidence/scroll.png",
            "content": """The 'Plague of Cyprian' spreads.
5,000 die daily in Rome. The fields lie fallow. The army is understrength.""",
            "insight": "Demographic collapse. There aren't enough men to farm or fight.",
            "stat_impact": {"economy": -10, "military": -5}
        },
        {
            "id": "era4_soldier_demand",
            "title": "Soldier's Graffiti",
            "position": {"x": 52, "y": 68},
            "sprite": "/assets/evidence/tablet.png",
            "content": """Scratched into the wall:
'Enrich the soldiers, scorn all other men.'
- Septimius Severus""",
            "insight": "The army knows it holds all the power. They will kill any Emperor who stops paying raises.",
            "stat_impact": {"military": 5, "economy": -10}
        }
    ],
    
    "advisors": [
        {
            "id": "maximinus",
            "name": "General Thrax",
            "position": {"x": 27, "y": 53.5},
            "sprite": "/assets/advisors/thrax_sprite.png"
        },
        {
            "id": "gordian",
            "name": "Senator Gordian",
            "position": {"x": 70, "y": 53},
            "sprite": "/assets/advisors/gordian_sprite.png"
        },
        {
            "id": "timesitheus",
            "name": "Prefect Timesitheus",
            "position": {"x": 57, "y": 57},
            "sprite": "/assets/advisors/timesitheus_sprite.png"
        },
        {
            "id": "merchant_guild",
            "name": "Guildmaster",
            "position": {"x": 86, "y": 68},
            "sprite": "/assets/advisors/merchant_sprite.png"
        }
    ],
    
    "choices": [
        {
            "id": "1",
            "title": "CENTRALIZE & MILITARIZE",
            "description": "Crush the Senate. Debase the coin further to pay the legions. Rome is an army with a state.",
            "supporters": ["maximinus", "timesitheus"],
            "image": "/assets/choices/era4_military.png",
            "stat_impact": {"military": 20, "economy": -20, "stability": 10, "republic": -20},
            "outcome_text": "The Empire survives as a military dictatorship. The economy is ruined, but the borders hold... for now.",
            "outcome_scene": "era4_dictator"
        },
        {
            "id": "2",
            "title": "EMPOWER PROVINCES",
            "description": "Allow Gaul and Palmyra to govern themselves. Focus on local defense. Decentralize Rome.",
            "supporters": ["gordian", "merchant_guild"],
            "image": "/assets/choices/era4_split.png",
            "stat_impact": {"military": -10, "economy": 15, "stability": -10, "republic": 5},
            "outcome_text": "The Empire splits into three. While economically healthier, the unified Roman front is gone forever.",
            "outcome_scene": "era4_split"
        }
    ],
    
    "historical_choice": "1",
    "historical_outcome": "Rome chose militarization. Diocletian eventually cemented this as the Dominate."
}
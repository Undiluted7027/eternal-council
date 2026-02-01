ERA_5_DATA = {
    "id": 5,
    "title": "The Fall",
    "year": "476 AD",
    "intro_text": """Ravenna, the last capital. The boy Romulus wears the purple.
His father Orestes rules in his name.
Outside the walls, the barbarian general Odoacer waits. He demands land, or he will take the city.""",
    
    "scene_background": "/assets/gameplaybg.png",
    
    "evidence": [
        {
            "id": "era5_empty_treasury",
            "title": "The Imperial Vault",
            "position": {"x": 20, "y": 60},
            "sprite": "/assets/evidence/vase.png",
            "content": """Dust and cobwebs.
There is no gold to pay the mercenaries.
We have not paid the Foederati (allied troops) in months.""",
            "insight": "Bankruptcy. Rome literally cannot pay its defenders with money. Land is the only currency left.",
            "stat_impact": {"economy": -20}
        },
        {
            "id": "era5_odoacer_petition",
            "title": "Odoacer's Petition",
            "position": {"x": 50, "y": 45},
            "sprite": "/assets/evidence/scroll.png",
            "content": """My troops have fought for Rome for years. We have no homes.
Grant us one-third of the land in Italy to settle, and we will serve you as loyal subjects forever.""",
            "insight": "A demand for settlement, not destruction. They want to be Roman landlords, not invaders.",
            "stat_impact": {"military": 5, "stability": -5}
        },
        {
            "id": "era5_zeno_letter",
            "title": "Letter from Constantinople",
            "position": {"x": 80, "y": 30},
            "sprite": "/assets/evidence/letter.png",
            "content": """From Emperor Zeno (East Rome):
"I cannot send troops. The West is your problem.
However, Odoacer seems... reasonable. Treat with him." """,
            "insight": "The East has abandoned the West. No help is coming.",
            "stat_impact": {"stability": -10}
        },
        {
            "id": "era5_romulus_toy",
            "title": "Child's Toy",
            "position": {"x": 35, "y": 75},
            "sprite": "/assets/evidence/vase.png",
            "content": """A wooden sword belonging to Emperor Romulus.
He is twelve years old. He cries during council meetings.""",
            "insight": "The Emperor is a figurehead. Orestes (his father) holds the real power.",
            "stat_impact": {"republic": -5, "stability": -5}
        },
        {
            "id": "era5_bishop_sermon",
            "title": "Bishop's Sermon",
            "position": {"x": 65, "y": 55},
            "sprite": "/assets/evidence/book.png",
            "content": """The City of God is eternal; the City of Man crumbles.
It matters not who wears the crown, so long as the Church is respected.""",
            "insight": "The Church is preparing for life after the Empire. They will accept a barbarian King if he is Christian.",
            "stat_impact": {"stability": 5, "republic": -10}
        }
    ],
    
    "advisors": [
        {
            "id": "orestes",
            "name": "Regent Orestes",
            "position": {"x": 30, "y": 40},
            "sprite": "/assets/advisors/orestes_sprite.png"
        },
        {
            "id": "odoacer_envoy",
            "name": "Gothic Envoy",
            "position": {"x": 70, "y": 50},
            "sprite": "/assets/advisors/envoy_sprite.png"
        },
        {
            "id": "bishop",
            "name": "Bishop of Ravenna",
            "position": {"x": 15, "y": 65},
            "sprite": "/assets/advisors/bishop_sprite.png"
        },
        {
            "id": "sidonius",
            "name": "Sidonius (Noble)",
            "position": {"x": 85, "y": 60},
            "sprite": "/assets/advisors/sidonius_sprite.png"
        }
    ],
    
    "choices": [
        {
            "id": "1",
            "title": "RESIST DEMANDS",
            "description": "Refuse the land. Rome does not bow to mercenaries. Defend the sovereignty of the Empire.",
            "supporters": ["orestes", "sidonius"],
            "image": "/assets/choices/era5_resist.png",
            "stat_impact": {"republic": 10, "military": -20, "stability": -20, "economy": -10},
            "outcome_text": "Odoacer storms the city. Orestes is executed. Romulus is deposed. The Western Empire falls.",
            "outcome_scene": "era5_fall"
        },
        {
            "id": "2",
            "title": "INTEGRATE & FEDERATE",
            "description": "Grant the land. Accept Odoacer as Supreme Commander. Create a new Roman-Gothic state.",
            "supporters": ["odoacer_envoy", "bishop"],
            "image": "/assets/choices/era5_integrate.png",
            "stat_impact": {"stability": 15, "military": 15, "republic": -30, "economy": 10},
            "outcome_text": "The Empire evolves. A hybrid kingdom rises, preserving Roman law under Gothic swords. The 'Fall' never happens.",
            "outcome_scene": "era5_survival"
        }
    ],
    
    "historical_choice": "1",
    "historical_outcome": "Orestes refused. Odoacer deposed the Emperor. 476 AD is marked as the end of the West."
}
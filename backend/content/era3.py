ERA_3_DATA = {
    "id": 3,
    "title": "The Principate",
    "year": "27 BC",
    "intro_text": """Octavian has defeated Antony and Cleopatra. He is the sole master of the Roman world.
He stands before the Senate to 'surrender' his emergency powers.
The Senate must decide: Accept his protection (and his rule), or demand true freedom.""",
    
    "scene_background": "/assets/gameplaybg.png",
    
    "evidence": [
        {
            "id": "era3_res_gestae",
            "title": "Draft Speech",
            "position": {"x": 43, "y": 68},
            "sprite": "/assets/evidence/scroll.png",
            "content": """DRAFT: "I transferred the Republic from my own power to the dominion of the Senate and People of Rome."
NOTE IN MARGIN: Keep control of Egypt, Gaul, and Syria (where the legions are). Give the Senate peaceful provinces.""",
            "insight": "He is giving up authority in name, but keeping the army for himself. A disguised monarchy.",
            "stat_impact": {"republic": -5, "stability": 10}
        },
        {
            "id": "era3_proscription_list",
            "title": "Old Proscription List",
            "position": {"x": 52, "y": 73},
            "sprite": "/assets/evidence/tablet.png",
            "content": """A list of 'Enemies of the State' from 15 years ago.
Hundreds of Senators named. Bloodstains obscure the bottom names.
Octavian signed this.""",
            "insight": "A reminder of what happens when Octavian is challenged. The Senate is terrified of another purge.",
            "stat_impact": {"stability": -5, "republic": 5}
        },
        {
            "id": "era3_agrippa_plans",
            "title": "Building Blueprints",
            "position": {"x": 49, "y": 68},
            "sprite": "/assets/evidence/letter.png",
            "content": """Plans for a new Pantheon and massive aqueduct repairs.
Cost: 100 Million Sesterces (Personal donation from Octavian).""",
            "insight": "Octavian is buying the people's love with infrastructure. The Republic cannot afford to match this.",
            "stat_impact": {"economy": 10, "stability": 5}
        },
        {
            "id": "era3_virgil_poem",
            "title": "Poetry Scroll",
            "position": {"x": 55, "y": 68},
            "sprite": "/assets/evidence/scroll.png",
            "content": """Lines from Virgil:
"Roman, remember by your strength to rule the earth's peoples,
for your arts are to be these: To pacify, to impose the rule of law..." """,
            "insight": "Culture is being weaponized to support the new regime. Peace is being sold as superior to liberty.",
            "stat_impact": {"stability": 5, "republic": -5}
        },
        {
            "id": "era3_senate_decree",
            "title": "Proposed Decree",
            "position": {"x": 46, "y": 73},
            "sprite": "/assets/evidence/tablet.png",
            "content": """To confer upon Octavian the name 'AUGUSTUS' (The Revered One).
To hang the Civic Crown of oak leaves above his door.""",
            "insight": "The Senate is preparing to submit religiously. 'Augustus' is a title for gods, not men.",
            "stat_impact": {"republic": -10, "stability": 5}
        }
    ],
    
    "advisors": [
        {
            "id": "agrippa",
            "name": "General Agrippa",
            "position": {"x": 18, "y": 64.5},
            "sprite": "/assets/advisors/agrippa_sprite.png"
        },
        {
            "id": "maecenas",
            "name": "Maecenas",
            "position": {"x": 75, "y": 53.5},
            "sprite": "/assets/advisors/maecenas_sprite.png"
        },
        {
            "id": "livia",
            "name": "Livia Drusilla",
            "position": {"x": 35, "y": 56.5},
            "sprite": "/assets/advisors/livia_sprite.png"
        },
        {
            "id": "varro",
            "name": "Senator Varro",
            "position": {"x": 85, "y": 67},
            "sprite": "/assets/advisors/varro_sprite.png"
        }
    ],
    
    "choices": [
        {
            "id": "1",
            "title": "ACCEPT THE PRINCIPATE",
            "description": "Grant him the title Augustus. Trade liberty for peace. End the century of civil war.",
            "supporters": ["agrippa", "maecenas", "livia"],
            "image": "/assets/choices/era3_principate.png",
            "stat_impact": {"military": 5, "economy": 15, "stability": 25, "republic": -25},
            "outcome_text": "The Republic dies with applause. The Pax Romana begins. One man rules all.",
            "outcome_scene": "era3_empire"
        },
        {
            "id": "2",
            "title": "DEMAND RESTORATION",
            "description": "Call his bluff. Accept his resignation and demand he disband his legions. Risk war to save the Republic.",
            "supporters": ["varro"],
            "image": "/assets/choices/era3_republic.png",
            "stat_impact": {"military": -10, "economy": -20, "stability": -30, "republic": 20},
            "outcome_text": "Octavian signals his legions. The Senate is purged. The mask falls, and a naked military tyranny begins.",
            "outcome_scene": "era3_purge"
        }
    ],
    
    "historical_choice": "A",
    "historical_outcome": "Rome chose the Principate. Augustus became the first Emperor."
}
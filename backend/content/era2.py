ERA_2_DATA = {
    "id": 2,
    "title": "The Ides of March",
    "year": "44 BC",
    "intro_text": """Caesar has been named Dictator Perpetuo. The Republic is a memory.
Rumors swirl that he intends to be crowned King before marching on Parthia.
Sixty Senators have hidden daggers beneath their togas. The session is about to begin.""",
    
    "scene_background": "/assets/scenes/era2_senate.png",
    
    "evidence": [
        {
            "id": "era2_parthian_oracle",
            "title": "Sibylline Prophecy",
            "position": {"x": 49, "y": 68},
            "sprite": "/assets/evidence/scroll.png",
            "content": """FROM THE SIBYLLINE BOOKS:
"Only a King may conquer the Parthians."
(A proposal lies next to it: To grant Caesar the title of King for foreign wars only.)""",
            "insight": "This prophecy is being used as a pretext to crown Caesar. To the Republicans, this is the final straw.",
            "stat_impact": {"republic": -10, "military": 5}
        },
        {
            "id": "era2_anthony_diadem",
            "title": "Discarded Diadem",
            "position": {"x": 46, "y": 73},
            "sprite": "/assets/evidence/vase.png",
            "content": """A white ribbon (diadem) symbolizing royalty.
Antony offered this to Caesar at the Lupercalia festival.
Caesar refused it... but the crowd's applause was tepid until he did.""",
            "insight": "Caesar tested the waters for kingship. He refused it only because the people weren't ready.",
            "stat_impact": {"stability": -5, "republic": -5}
        },
        {
            "id": "era2_assassin_list",
            "title": "Scrap of Parchment",
            "position": {"x": 55, "y": 68},
            "sprite": "/assets/evidence/letter.png",
            "content": """Cassius,
Brutus wavers. He needs to believe this is for Rome, not for power.
If he strikes, the others will follow.
Burn this.""",
            "insight": "Proof of a conspiracy. Brutus is the key to its legitimacy.",
            "stat_impact": {"stability": -10, "republic": 5}
        },
        {
            "id": "era2_caesar_reforms",
            "title": "Administrative Tablet",
            "position": {"x": 52, "y": 74},
            "sprite": "/assets/evidence/tablet.png",
            "content": """CALENDAR REFORM: Year adjusted to 365 days.
DEBT REFORM: Interest capped.
COLONY PLANS: Land for 80,000 poor citizens in Carthage and Corinth.""",
            "insight": "Caesar is ruling effectively. The poor love him. The Senate hates him for bypassing them.",
            "stat_impact": {"economy": 10, "stability": 5}
        },
        {
            "id": "era2_calpurnia_dream",
            "title": "Calpurnia's Note",
            "position": {"x": 43, "y": 68},
            "sprite": "/assets/evidence/letter.png",
            "content": """My husband,
I dreamt the pinnacle of our house collapsed.
The windows flew open.
Do not go to the Senate today. Even the priests say the omens are bad without a heart.""",
            "insight": "Genuine supernatural or subconscious warning. Caesar is in immediate mortal danger.",
            "stat_impact": {"stability": -5}
        }
    ],
    
    "advisors": [
        {
            "id": "brutus",
            "name": "Senator Brutus",
            "position": {"x": 30, "y": 67},
            "sprite": "/assets/advisors/brutus_sprite.png",
            "faction": "senate",
        },
        {
            "id": "antony",
            "name": "Mark Antony",
            "position": {"x": 60, "y": 57},
            "sprite": "/assets/advisors/antony_sprite.png",
            "faction": "military"
        },
        {
            "id": "cassius",
            "name": "Senator Cassius",
            "position": {"x": 15, "y": 54},
            "sprite": "/assets/advisors/cassius_sprite.png",
            "faction": "senate"
        },
        {
            "id": "calpurnia",
            "name": "Calpurnia",
            "position": {"x": 75, "y": 54},
            "sprite": "/assets/advisors/calpurnia_sprite.png",
            "faction": "family"
        }
    ],
    
    "choices": [
        {
            "id": "1",
            "title": "ASSASSINATE CAESAR",
            "description": "The tree of liberty must be watered with the blood of tyrants. Strike him down in the Senate.",
            "supporters": ["brutus", "cassius"],
            "image": "/assets/choices/era2_assassinate.png",
            "stat_impact": {"military": -10, "economy": -10, "stability": -25, "republic": 15},
            "outcome_text": "Caesar falls beneath 23 daggers. But there is no plan for what comes next. Chaos engulfs Rome.",
            "outcome_scene": "era2_chaos"
        },
        {
            "id": "2",
            "title": "EXPOSE THE PLOT",
            "description": "Warn Caesar. Arrest the conspirators. Allow Caesar to rule as King in all but name.",
            "supporters": ["antony", "calpurnia"],
            "image": "/assets/choices/era2_expose.png",
            "stat_impact": {"military": 10, "economy": 10, "stability": 15, "republic": -20},
            "outcome_text": "The conspirators are arrested. Brutus is exiled. Caesar marches on Parthia, returning as absolute monarch.",
            "outcome_scene": "era2_monarchy"
        }
    ],
    
    "historical_choice": "1",
    "historical_outcome": "Rome chose assassination. It led to 13 more years of civil war and the death of the Republic anyway."
}
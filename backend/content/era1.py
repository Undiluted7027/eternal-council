ERA_1_DATA = {
    "id": 1,
    "title": "The Rubicon",
    "year": "49 BC",
    "intro_text": """Caesar stands at the Rubicon with his XIII Legion.
To cross is treason. To retreat is death.
The Council has gathered. They await your wisdom.""",
    
    "scene_background": "/assets/gameplaybg.png",
    
    "evidence": [
        {
            "id": "era1_caesar_letter",
            "title": "Caesar's Letter",
            "position": {"x": 43, "y": 68},  # % position in scene
            "sprite": "/assets/evidence/scroll.png",
            "content": """To the Conscript Fathers of the Senate:

I offer this compromise: I will disband my legions if Pompey disbands his.
Let us both return to Rome as private citizens, equals under the law.

If this is refused, let history record who chose war.
- G. Julius Caesar""",
            "insight": "Caesar offered mutual disarmament. The Senate refused this compromise.",
            "stat_impact": {"stability": 5, "republic": 5}
        },
        {
            "id": "era1_treasury_records",
            "title": "Treasury Records",
            "position": {"x": 52, "y": 74},
            "sprite": "/assets/evidence/tablet.png",
            "content": """SENATE TREASURY - DISBURSEMENTS 50 BC
Border Security (Hispania): 50,000 denarii
Recipient: [CLASSIFIED - Senate Eyes Only]""",
            "insight": "Massive funds sent to Pompey's forces, classified as 'border security.' The Senate was already preparing for war.",
            "stat_impact": {"economy": -5, "stability": -5}
        },
        {
            "id": "era1_merchant_complaint",
            "title": "Merchant Complaint",
            "position": {"x": 55, "y": 68},
            "sprite": "/assets/evidence/scroll.png",
            "content": """To the Aediles:
The Guild protests trade disruptions from 'military exercises.'
Both sides position for war while claiming peace.""",
            "insight": "Both Caesar and the Senate are positioning forces. Neither is innocent.",
            "stat_impact": {"economy": -5, "military": 5}
        },
        {
            "id": "era1_augury_report",
            "title": "Augury Report",
            "position": {"x": 46, "y": 74},
            "sprite": "/assets/evidence/vase.png",
            "content": """COLLEGIUM OF AUGURS - OFFICIAL REPORT
The sacred chickens have been consulted.
FINDING: The omens are UNFAVORABLE for crossing boundaries.
Signed: Metellus Pius, Pontifex""",
            "insight": "An official religious ruling against Caesar crossing the Rubicon.",
            "stat_impact": {"stability": -5, "republic": 5}
        },
        {
            "id": "era1_metellus_private",
            "title": "Private Letter",
            "position": {"x": 49, "y": 68},
            "sprite": "/assets/evidence/letter.png",
            "content": """Brother,
The augury is done. The chickens ate poorly but I recorded that they did not eat at all.
Caelius assures me our temple lands will be protected.
The gods will forgive a small lie in service of tradition.
Burn this letter. - M""",
            "insight": "The augury was fabricated. The priest lied about the omens to support the Senate.",
            "stat_impact": {"republic": -10, "stability": -5}
        }
    ],
    
    "advisors": [
        {
            "id": "caelius",
            "name": "Senator Caelius",
            "position": {"x": 30, "y": 53},
            "sprite": "/assets/advisors/caelius_sprite.png"
        },
        {
            "id": "labienus",
            "name": "General Labienus",
            "position": {"x": 18, "y": 65},
            "sprite": "/assets/advisors/labienus_sprite.png"
        },
        {
            "id": "balbus",
            "name": "Merchant Balbus",
            "position": {"x": 60, "y": 58.5},
            "sprite": "/assets/advisors/balbus_sprite.png"
        },
        {
            "id": "metellus",
            "name": "Priest Metellus",
            "position": {"x": 78, "y": 54},
            "sprite": "/assets/advisors/metellus_sprite.png"
        }
    ],
    
    "choices": [
        {
            "id": "1",
            "title": "RESIST CAESAR",
            "description": "Stand firm against the tyrant. Call upon Pompey. Defend the Republic at any cost.",
            "supporters": ["caelius", "metellus"],
            "image": "/assets/choices/era1_resist.png",
            "stat_impact": {"military": 20, "economy": -15, "stability": -20, "republic": 10},
            "outcome_text": "The Senate refuses negotiation. Caesar crosses the Rubicon. Civil war erupts.",
            "outcome_scene": "era1_war"
        },
        {
            "id": "2",
            "title": "NEGOTIATE",
            "description": "Accept the compromise. Grant veterans their land. Preserve peace.",
            "supporters": ["labienus", "balbus"],
            "image": "/assets/choices/era1_negotiate.png",
            "stat_impact": {"military": -10, "economy": 15, "stability": 20, "republic": -10},
            "outcome_text": "Caesar enters Rome as First Citizen. The Senate yields. Peace holds... for now.",
            "outcome_scene": "era1_peace"
        }
    ],
    
    "historical_choice": "1",
    "historical_outcome": "Rome chose resistance. Caesar crossed the Rubicon. Civil war consumed the Republic."
}
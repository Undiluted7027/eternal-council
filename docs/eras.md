```py
ERA_1 = {
    "id": 1,
    "title": "The Rubicon",
    "year": "49 BC",
    "intro_text": """Caesar stands at the Rubicon with his XIII Legion.
To cross is treason. To retreat is death.
The Council has gathered. They await your wisdom.""",
    
    "scene_background": "/assets/scenes/era1_forum.png",
    
    "evidence": [
        {
            "id": "era1_caesar_letter",
            "title": "Caesar's Letter",
            "position": {"x": 65, "y": 25},  # % position in scene
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
            "position": {"x": 35, "y": 55},
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
            "position": {"x": 55, "y": 70},
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
            "position": {"x": 80, "y": 40},
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
            "position": {"x": 20, "y": 75},
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
            "position": {"x": 20, "y": 40},
            "sprite": "/assets/advisors/caelius_sprite.png",
            "personality": "Silver tongued and charming, Reckless and oportunistic, Witty, Desperate for relevance, Energetic and impatient, Cynical about virtue",
            "hidden_agenda": "Provoke civil war to create chaos, then position himself as a 'moderate' peacemaker",
            "tell": "I defend the Republic"
        },
        {
            "id": "labienus",
            "name": "General Labienus",
            "position": {"x": 15, "y": 65},
            "sprite": "/assets/advisors/labienus_sprite.png",
            "personality": "Rigid and moralistic, Bitter and resentful, Coldly professional, Prideful about competence, Self-righteous, Humorless",
            "hidden_agenda": "Destroy Caesar to prove he was the real strategic genius behind the Gallic victories",
            "tell": "I defend Republican principles"
        },
        {
            "id": "balbus",
            "name": "Merchant Balbus",
            "position": {"x": 70, "y": 60},
            "sprite": "/assets/advisors/balbus_sprite.png",
            "personality": "Pragmatic and calculating, Quietly ambitious, Loyal to patrons, Patient and methodical, Cosmopolitan",
            "hidden_agenda": "Secure Roman citizenship and equestrian status by financing Caesar's rise",
            "tell": "Stability helps all Romans"
        },
        {
            "id": "metellus",
            "name": "Priest Metellus",
            "position": {"x": 85, "y": 35},
            "sprite": "/assets/advisors/metellus_sprite.png",
            "personality": "Sanctimonious and pious, Protective of privilege, Superstitious theater, Condescending, Fearful of change, Ceremonially minded",
            "hidden_agenda": "Secure Roman citizenship and equestrian status by financing Caesar's rise",
            "tell": "The Gods speak against Caesar"
        }
    ],
    
    "choices": [
        {
            "id": "A",
            "title": "RESIST CAESAR",
            "description": "Stand firm against the tyrant. Call upon Pompey. Defend the Republic at any cost.",
            "supporters": ["caelius", "metellus", "labienus"],
            "image": "/assets/choices/era1_resist.png",
            "stat_impact": {"military": 20, "economy": -15, "stability": -20, "republic": 10},
            "outcome_text": "The Senate refuses negotiation. Caesar crosses the Rubicon. Civil war erupts.",
            "outcome_scene": "era1_war"
        },
        {
            "id": "B",
            "title": "NEGOTIATE",
            "description": "Accept the compromise. Grant veterans their land. Preserve peace.",
            "supporters": ["balbus"],
            "image": "/assets/choices/era1_negotiate.png",
            "stat_impact": {"military": -10, "economy": 15, "stability": 20, "republic": -10},
            "outcome_text": "Caesar enters Rome as First Citizen. The Senate yields. Peace holds... for now.",
            "outcome_scene": "era1_peace"
        }
    ],
    
    "historical_choice": "A",
    "historical_outcome": "Rome chose resistance. Caesar crossed the Rubicon. Civil war consumed the Republic."
}
```
```py
ERA_2 = {
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
            "position": {"x": 80, "y": 30},
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
            "position": {"x": 25, "y": 70},
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
            "position": {"x": 15, "y": 80},
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
            "position": {"x": 60, "y": 55},
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
            "position": {"x": 40, "y": 25},
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
            "position": {"x": 30, "y": 45},
            "sprite": "/assets/advisors/brutus_sprite.png",
            "personality": "Intellectual and philosophical, Internally conflicted, Idealistic and naive, Burdened by legacy, Earnest and humorless, Needs moral justification",
            "hidden_agenda": "Restore his family's legendary reputation as tyrannicide and become Rome's moral leader",
            "tell": "I act without self-interest"
        },
        {
            "id": "antony",
            "name": "Mark Antony",
            "position": {"x": 70, "y": 40},
            "sprite": "/assets/advisors/antony_sprite.png",
            "personality": "Passionate and emotional, Intensely loyal, Charismatic and theatrical, Hedonistic, Militarily minded, Impulsive",
            "hidden_agenda": "Become Caesar's sole heir and eliminate rivals (especially young Octavian)",
            "tell": "I serve Caesar loyally"
        },
        {
            "id": "cassius",
            "name": "Senator Cassius",
            "position": {"x": 15, "y": 55},
            "sprite": "/assets/advisors/cassius_sprite.png",
            "personality": "Bitter and envious, Strategically brilliant, Paranoid, Lean and hungry, Atheistic/skeptical, Manipulative",
            "hidden_agenda": "Eliminate Caesar who denied him honors, then purge all populares to restore oligarchy",
            "tell": "This is about the Republic"
        },
        {
            "id": "calpurnia",
            "name": "Calpurnia",
            "position": {"x": 50, "y": 65},
            "sprite": "/assets/advisors/calpurnia_sprite.png",
            "personality": "Anxious and fearful, Protective, Superstitious, Politically astute, Quiet strength, Traditional Roman matron",
            "hidden_agenda": "Prevent Caesar's death to maintain her position and protect her family's wealth",
            "tell": "The Gods sent me omens"
        }
    ],
    
    "choices": [
        {
            "id": "A",
            "title": "ASSASSINATE CAESAR",
            "description": "The tree of liberty must be watered with the blood of tyrants. Strike him down in the Senate.",
            "supporters": ["brutus", "cassius"],
            "image": "/assets/choices/era2_assassinate.png",
            "stat_impact": {"republic": 15, "stability": -25, "economy": -10, "military": -10},
            "outcome_text": "Caesar falls beneath 23 daggers. But there is no plan for what comes next. Chaos engulfs Rome.",
            "outcome_scene": "era2_chaos"
        },
        {
            "id": "B",
            "title": "EXPOSE THE PLOT",
            "description": "Warn Caesar. Arrest the conspirators. Allow Caesar to rule as King in all but name.",
            "supporters": ["antony", "calpurnia"],
            "image": "/assets/choices/era2_expose.png",
            "stat_impact": {"republic": -20, "stability": 15, "economy": 10, "military": 10},
            "outcome_text": "The conspirators are arrested. Brutus is exiled. Caesar marches on Parthia, returning as absolute monarch.",
            "outcome_scene": "era2_monarchy"
        }
    ],
    
    "historical_choice": "A",
    "historical_outcome": "Rome chose assassination. It led to 13 more years of civil war and the death of the Republic anyway."
}
```
```py
ERA_3 = {
    "id": 3,
    "title": "The Principate",
    "year": "27 BC",
    "intro_text": """Octavian has defeated Antony and Cleopatra. He is the sole master of the Roman world.
He stands before the Senate to 'surrender' his emergency powers.
The Senate must decide: Accept his protection (and his rule), or demand true freedom.""",
    
    "scene_background": "/assets/scenes/era3_palace.png",
    
    "evidence": [
        {
            "id": "era3_res_gestae",
            "title": "Draft Speech",
            "position": {"x": 50, "y": 50},
            "sprite": "/assets/evidence/scroll.png",
            "content": """DRAFT: "I transferred the Republic from my own power to the dominion of the Senate and People of Rome."
NOTE IN MARGIN: Keep control of Egypt, Gaul, and Syria (where the legions are). Give the Senate peaceful provinces.""",
            "insight": "He is giving up authority in name, but keeping the army for himself. A disguised monarchy.",
            "stat_impact": {"republic": -5, "stability": 10}
        },
        {
            "id": "era3_proscription_list",
            "title": "Old Proscription List",
            "position": {"x": 20, "y": 75},
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
            "position": {"x": 80, "y": 35},
            "sprite": "/assets/evidence/letter.png",
            "content": """Plans for a new Pantheon and massive aqueduct repairs.
Cost: 100 Million Sesterces (Personal donation from Octavian).""",
            "insight": "Octavian is buying the people's love with infrastructure. The Republic cannot afford to match this.",
            "stat_impact": {"economy": 10, "stability": 5}
        },
        {
            "id": "era3_virgil_poem",
            "title": "Poetry Scroll",
            "position": {"x": 35, "y": 60},
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
            "position": {"x": 65, "y": 25},
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
            "position": {"x": 20, "y": 40},
            "sprite": "/assets/advisors/agrippa_sprite.png",
            "personality": "Utterly loyal, Competent and efficient, Self-effacing, Practical builder, Military professional, Humble origins",
            "hidden_agenda": "Ensure his bloodline inherits the empire by marrying his daughter to Augustus's heir",
            "tell": "Rome needs order"
        },
        {
            "id": "maecenas",
            "name": "Maecenas",
            "position": {"x": 75, "y": 45},
            "sprite": "/assets/advisors/maecenas_sprite.png",
            "personality": "Cultured aesthete, Diplomatic and subtle, Politically brilliant, Epicurean, Self-consciously unofficial, Manipulative through culture",
            "hidden_agenda": "Become the permanent 'power behind the throne' - the gray eminence who really rules",
            "tell": "I want no official power"
        },
        {
            "id": "livia",
            "name": "Livia Drusilla",
            "position": {"x": 45, "y": 30},
            "sprite": "/assets/advisors/livia_sprite.png",
            "personality": "Coldly intelligent, Patient and calculating, Steely composure, Ruthlessly maternal, Socially conservative facade, Quietly dominant",
            "hidden_agenda": "Ensure her sons (from previous marriage) inherit the empire, not Augustus's blood relatives",
            "tell": "The best man should rule"
        },
        {
            "id": "varro",
            "name": "Senator Varro",
            "position": {"x": 85, "y": 65},
            "sprite": "/assets/advisors/varro_sprite.png",
            "personality": "Nostalgic for Republic, Proud aristocrat, Stubborn and inflexiblem Courageous but foolish, Eloquent in decline, Tragically aware",
            "hidden_agenda": "Restore senatorial corruption and provincial extortion that enriched the old aristocracy",
            "tell": "The Republic was just"
        }
    ],
    
    "choices": [
        {
            "id": "A",
            "title": "ACCEPT THE PRINCIPATE",
            "description": "Grant him the title Augustus. Trade liberty for peace. End the century of civil war.",
            "supporters": ["agrippa", "maecenas", "livia"],
            "image": "/assets/choices/era3_principate.png",
            "stat_impact": {"stability": 25, "economy": 15, "republic": -25, "military": 5},
            "outcome_text": "The Republic dies with applause. The Pax Romana begins. One man rules all.",
            "outcome_scene": "era3_empire"
        },
        {
            "id": "B",
            "title": "DEMAND RESTORATION",
            "description": "Call his bluff. Accept his resignation and demand he disband his legions. Risk war to save the Republic.",
            "supporters": ["varro"],
            "image": "/assets/choices/era3_republic.png",
            "stat_impact": {"republic": 20, "stability": -30, "economy": -20, "military": -10},
            "outcome_text": "Octavian signals his legions. The Senate is purged. The mask falls, and a naked military tyranny begins.",
            "outcome_scene": "era3_purge"
        }
    ],
    
    "historical_choice": "A",
    "historical_outcome": "Rome chose the Principate. Augustus became the first Emperor."
}
```
```py
ERA_4 = {
    "id": 4,
    "title": "The Crisis",
    "year": "235 AD",
    "intro_text": """The Golden Age is over. Emperor Severus Alexander has been murdered by his own troops.
The General Maximinus Thrax claims the throne. He is a soldier, not a politician.
The borders burn. The money is worthless. The Empire is fracturing.""",
    
    "scene_background": "/assets/scenes/era4_camp.png",
    
    "evidence": [
        {
            "id": "era4_debased_coin",
            "title": "Handful of Antoniniani",
            "position": {"x": 30, "y": 65},
            "sprite": "/assets/evidence/coin.png",
            "content": """New silver coins issued by the mint.
Wait... the silver rubs off. Underneath, it is copper.
Silver content: Less than 40%.""",
            "insight": "Hyperinflation. The government is debasing currency to pay the army. Savings are being wiped out.",
            "stat_impact": {"economy": -15, "stability": -5}
        },
        {
            "id": "era4_border_report",
            "title": "Bloodied Dispatch",
            "position": {"x": 15, "y": 50},
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
            "position": {"x": 75, "y": 30},
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
            "position": {"x": 55, "y": 80},
            "sprite": "/assets/evidence/scroll.png",
            "content": """The 'Plague of Cyprian' spreads.
5,000 die daily in Rome. The fields lie fallow. The army is understrength.""",
            "insight": "Demographic collapse. There aren't enough men to farm or fight.",
            "stat_impact": {"economy": -10, "military": -5}
        },
        {
            "id": "era4_soldier_demand",
            "title": "Soldier's Graffiti",
            "position": {"x": 90, "y": 55},
            "sprite": "/assets/evidence/wall.png",
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
            "position": {"x": 25, "y": 35},
            "sprite": "/assets/advisors/thrax_sprite.png",
            "personality": "Brutal and direct, Low-born pride, Physically imposing, Anti-intellectual, Paranoid of betrayal, Violent solutions",
            "hidden_agenda": "Establish 'soldier emperors' from the ranks, breaking aristocratic monopoly on power",
            "tell": "The strong should rule"
        },
        {
            "id": "gordian",
            "name": "Senator Gordian",
            "position": {"x": 70, "y": 45},
            "sprite": "/assets/advisors/gordian_sprite.png",
            "personality": "Cultured aristocrat, Elderly and weary, Wealthy landowner, Regional pride, Reluctant Leader, Nostalgic for stability",
            "hidden_agenda": "Make African provinces (where his family has estates) autonomous to avoid imperial taxation",
            "tell": "Freedom for all provinces"
        },
        {
            "id": "timesitheus",
            "name": "Prefect Timesitheus",
            "position": {"x": 50, "y": 60},
            "sprite": "/assets/advisors/timesitheus_sprite.png",
            "personality": "Hyper-competent administrator, Workaholic, Control-oriented, Loyal to office but not person, Impatient with inefficiency, Believes in meritocracy",
            "hidden_agenda": "Become the real power as 'imperial regent' - let emperors be figureheads while he administers",
            "tell": "Efficiency saves Rome"
        },
        {
            "id": "merchant_guild",
            "name": "Guildmaster",
            "position": {"x": 85, "y": 70},
            "sprite": "/assets/advisors/merchant_sprite.png",
            "personality": "Pragmatic businessman, Cosmopolitan trader, Risk-averse, Guild solidarity, Suspicious of emperors, Patient accumulator",
            "hidden_agenda": "Break imperial trade monopolies to allow merchant guilds to control commerce",
            "tell": "Markets work best when free"
        }
    ],
    
    "choices": [
        {
            "id": "A",
            "title": "CENTRALIZE & MILITARIZE",
            "description": "Crush the Senate. Debase the coin further to pay the legions. Rome is an army with a state.",
            "supporters": ["maximinus", "timesitheus"],
            "image": "/assets/choices/era4_military.png",
            "stat_impact": {"military": 20, "stability": 10, "economy": -20, "republic": -20},
            "outcome_text": "The Empire survives as a military dictatorship. The economy is ruined, but the borders hold... for now.",
            "outcome_scene": "era4_dictator"
        },
        {
            "id": "B",
            "title": "EMPOWER PROVINCES",
            "description": "Allow Gaul and Palmyra to govern themselves. Focus on local defense. Decentralize Rome.",
            "supporters": ["gordian", "merchant_guild"],
            "image": "/assets/choices/era4_split.png",
            "stat_impact": {"economy": 15, "stability": -10, "military": -10, "republic": 5},
            "outcome_text": "The Empire splits into three. While economically healthier, the unified Roman front is gone forever.",
            "outcome_scene": "era4_split"
        }
    ],
    
    "historical_choice": "A",
    "historical_outcome": "Rome chose militarization. Diocletian eventually cemented this as the Dominate."
}
```
```py
ERA_5 = {
    "id": 5,
    "title": "The Fall",
    "year": "476 AD",
    "intro_text": """Ravenna, the last capital. The boy Romulus wears the purple.
His father Orestes rules in his name.
Outside the walls, the barbarian general Odoacer waits. He demands land, or he will take the city.""",
    
    "scene_background": "/assets/scenes/era5_ravenna.png",
    
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
            "sprite": "/assets/evidence/letter.png",
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
            "sprite": "/assets/advisors/orestes_sprite.png",
            "personality": "Former Attila aide, Ambitious climber, Protective of son, Paranoid of replacement, Pragmatic survivor, Embittered",
            "hidden_agenda": "Maintain his power as regent by preventing any strong leader (including Odoacer) from taking real control",
            "tell": "I protect the Emperor"
        },
        {
            "id": "odoacer_envoy",
            "name": "Gothic Envoy",
            "position": {"x": 70, "y": 50},
            "sprite": "/assets/advisors/envoy_sprite.png",
            "personality": "Weary warrior, Reasonable negotiator, Culturally hybrid, Frustrated by promises, Speaks for soldiers, Respectful but firm",
            "hidden_agenda": "Secure Odoacer's coronation as King of Italy, eliminating the imperial office entirely",
            "tell": "We'll preserve Roman traditions"
        },
        {
            "id": "bishop",
            "name": "Bishop of Ravenna",
            "position": {"x": 15, "y": 65},
            "sprite": "/assets/advisors/bishop_sprite.png",
            "personality": "Spiritual but political, Long view thinker, Pragmatic about Barbarians, Increasingly powerful, Apocalyptic undertones, Calm in crisis",
            "hidden_agenda": "Transfer loyalty from dying Empire to eternal Church; make Church the permanent institution",
            "tell": "Faith transcends empires"
        },
        {
            "id": "sidonius",
            "name": "Sidonius (Noble)",
            "position": {"x": 85, "y": 60},
            "sprite": "/assets/advisors/sidonius_sprite.png",
            "personality": "Last classical Roman, Cultured aristocrat, Mournful elegance, Landowner's concerns, Conflicted, Dignified in defeat",
            "hidden_agenda": "Preserve Roman aristocratic estates and prevent land redistribution to barbarian soldiers",
            "tell": "Roman civilization must endure"
        }
    ],
    
    "choices": [
        {
            "id": "A",
            "title": "RESIST DEMANDS",
            "description": "Refuse the land. Rome does not bow to mercenaries. Defend the sovereignty of the Empire.",
            "supporters": ["orestes", "sidonius"],
            "image": "/assets/choices/era5_resist.png",
            "stat_impact": {"republic": 10, "military": -20, "stability": -20, "economy": -10},
            "outcome_text": "Odoacer storms the city. Orestes is executed. Romulus is deposed. The Western Empire falls.",
            "outcome_scene": "era5_fall"
        },
        {
            "id": "B",
            "title": "INTEGRATE & FEDERATE",
            "description": "Grant the land. Accept Odoacer as Supreme Commander. Create a new Roman-Gothic state.",
            "supporters": ["odoacer_envoy", "bishop"],
            "image": "/assets/choices/era5_integrate.png",
            "stat_impact": {"stability": 15, "military": 15, "republic": -30, "economy": 10},
            "outcome_text": "The Empire evolves. A hybrid kingdom rises, preserving Roman law under Gothic swords. The 'Fall' never happens.",
            "outcome_scene": "era5_survival"
        }
    ],
    
    "historical_choice": "A",
    "historical_outcome": "Orestes refused. Odoacer deposed the Emperor. 476 AD is marked as the end of the West."
}
```
import { type EraData } from '../types';

export const MOCK_ERA_1: EraData = {
  id: 1,
  title: "The Rubicon",
  year: "49 BC",
  intro_text: "Caesar stands at the Rubicon with his XIII Legion. To cross is treason. To retreat is death. The Council has gathered. They await your wisdom.",
  scene_background: "https://placehold.co/1920x1080/2c2c2c/png?text=Roman+Forum+Background", // Placeholder
  evidence: [
    {
      id: "era1_caesar_letter",
      title: "Caesar's Letter",
      position: { x: 65, y: 25 }, 
      sprite: "📜", // Using emoji as temporary sprite
      content: "I offer this compromise: I will disband my legions if Pompey disbands his.",
      insight: "Caesar offered mutual disarmament. The Senate refused this compromise.",
      stat_impact: { stability: 5, republic: 5 }
    },
    {
      id: "era1_treasury_records",
      title: "Treasury Records",
      position: { x: 35, y: 55 },
      sprite: "📋",
      content: "Border Security (Hispania): 50,000 denarii. Recipient: [CLASSIFIED]",
      insight: "Massive funds sent to Pompey's forces.",
      stat_impact: { economy: -5, stability: -5 }
    },
    {
      id: "era1_merchant_complaint",
      title: "Merchant Complaint",
      position: { x: 55, y: 70 },
      sprite: "💰",
      content: "The Guild protests trade disruptions from 'military exercises.'",
      insight: "Both sides position for war while claiming peace.",
      stat_impact: { economy: -5, military: 5 }
    },
    {
      id: "era1_augury_report",
      title: "Augury Report",
      position: { x: 80, y: 40 },
      sprite: "🏺",
      content: "The omens are UNFAVORABLE for crossing boundaries.",
      insight: "An official religious ruling against Caesar.",
      stat_impact: { stability: -5, republic: 5 }
    },
    {
      id: "era1_metellus_private",
      title: "Private Letter",
      position: { x: 20, y: 75 },
      sprite: "📨",
      content: "The chickens ate poorly but I recorded that they did not eat at all.",
      insight: "The augury was fabricated.",
      stat_impact: { republic: -10, stability: -5 }
    }
  ],
  advisors: [
    {
      id: "caelius",
      name: "Senator Caelius",
      title: "Senior Senator",
      faction: "Senate",
      portrait: "https://placehold.co/200x200/8B0000/fff?text=Caelius",
      position: { x: 20, y: 40 },
      sprite: "👤"
    },
    {
      id: "labienus",
      name: "General Labienus",
      title: "Former Legate",
      faction: "Military",
      portrait: "https://placehold.co/200x200/333/fff?text=Labienus",
      position: { x: 15, y: 65 },
      sprite: "⚔️"
    },
    {
      id: "balbus",
      name: "Merchant Balbus",
      title: "Guild Head",
      faction: "Merchant",
      portrait: "https://placehold.co/200x200/C5A009/000?text=Balbus",
      position: { x: 70, y: 60 },
      sprite: "💰"
    },
    {
      id: "metellus",
      name: "Priest Metellus",
      title: "Pontifex",
      faction: "Religious",
      portrait: "https://placehold.co/200x200/F5F5F1/000?text=Metellus",
      position: { x: 85, y: 35 },
      sprite: "⛪"
    }
  ]
};
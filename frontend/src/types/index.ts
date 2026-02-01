export type GameScreen = | 'TITLE'
    | 'ERA_INTRO'
    | 'SCENE'
    | 'DECISION'
    | 'DIVERGENCE'
    | 'RESULTS'
    | 'TIMELINE';

export interface Stats {
    military: number;
    economy: number;
    stability: number;
    republic: number;
}

export interface StatChange {
    stat: keyof Stats;
    oldValue: number;
    newValue: number;
    change: number;
}

export interface Advisor {
    id: string;
    name: string;
    title: string;
    faction: string;
    portrait: string; // URL
    position: {x: number, y: number};
    sprite: string; // URL
}

export interface Evidence {
    id: string;
    title: string;
    position: { x: number; y: number };
    sprite: string;
    content: string;
    insight: string;
    stat_impact: Partial<Stats>;

}

export interface Choice {
  id: string;
  title: string;
  description: string;
  supporters: string[]; // list of advisor IDs
  stat_impact: Partial<Stats>;
}

export interface EraData {
  id: number;
  title: string;
  year: string;
  intro_text: string;
  scene_background: string;
  evidence: Evidence[];
  advisors: Advisor[];
  choices: Choice[];
}
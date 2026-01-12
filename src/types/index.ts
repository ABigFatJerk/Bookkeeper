import { Principle } from '../data/principles';

// Player's soul state - which souls they have and their evolution level
export interface PlayerSoul {
  id: string;
  owned: boolean;
  evolution: number; // 0 = base, 1 = +, 2 = ++, 3 = +++
}

// Player's skill state - level 0-9 for each skill
export interface PlayerSkill {
  id: string;
  level: number;
}

// Bonus values for tools, inks, and memories
export type PrincipleBonuses = Partial<Record<Principle, number>>;

// Complete player state
export interface PlayerState {
  souls: PlayerSoul[];
  skills: PlayerSkill[];
  toolBonuses: PrincipleBonuses;
  inkBonuses: PrincipleBonuses;
  memoryBonuses: PrincipleBonuses;
}

// Calculated principle totals
export type PrincipleTotals = Record<Principle, number>;

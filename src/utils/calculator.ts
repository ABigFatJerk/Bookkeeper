import { PRINCIPLES, Principle } from '../data/principles';
import { SOULS } from '../data/souls';
import { SKILLS } from '../data/skills';
import { PlayerState, PrincipleTotals } from '../types';

export function calculatePrincipleTotals(state: PlayerState): PrincipleTotals {
  // Initialize all principles to 0
  const totals: PrincipleTotals = {} as PrincipleTotals;
  for (const principle of PRINCIPLES) {
    totals[principle] = 0;
  }

  // Add soul contributions
  for (const playerSoul of state.souls) {
    if (!playerSoul.owned) continue;

    const soulDef = SOULS.find((s) => s.id === playerSoul.id);
    if (!soulDef) continue;

    // Each principle in the soul gets: base_value + evolution_level
    for (const [principle, baseValue] of Object.entries(soulDef.principles)) {
      const p = principle as Principle;
      totals[p] += baseValue + playerSoul.evolution;
    }
  }

  // Add skill contributions
  for (const playerSkill of state.skills) {
    if (playerSkill.level <= 0) continue;

    const skillDef = SKILLS.find((s) => s.id === playerSkill.id);
    if (!skillDef) continue;

    // Primary principle: +1 (fixed)
    totals[skillDef.primary] += 1;

    // Secondary principle: +skill level
    totals[skillDef.secondary] += playerSkill.level;
  }

  // Add tool bonuses
  for (const [principle, value] of Object.entries(state.toolBonuses)) {
    if (value && value > 0) {
      totals[principle as Principle] += value;
    }
  }

  // Add ink bonuses
  for (const [principle, value] of Object.entries(state.inkBonuses)) {
    if (value && value > 0) {
      totals[principle as Principle] += value;
    }
  }

  // Add memory bonuses
  for (const [principle, value] of Object.entries(state.memoryBonuses)) {
    if (value && value > 0) {
      totals[principle as Principle] += value;
    }
  }

  return totals;
}

// Get the crafting tier for a principle value
export function getCraftingTier(value: number): 'none' | 'prentice' | 'scholar' | 'keeper' {
  if (value >= 15) return 'keeper';
  if (value >= 10) return 'scholar';
  if (value >= 5) return 'prentice';
  return 'none';
}

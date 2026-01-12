import { PRINCIPLES, Principle } from '../data/principles';
import { SOULS, getSoulPrinciples } from '../data/souls';
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
    if (!playerSoul.owned || playerSoul.evolution < 0) continue;

    const soulDef = SOULS.find((s) => s.id === playerSoul.id);
    if (!soulDef) continue;

    const principles = getSoulPrinciples(soulDef, playerSoul.evolution);
    for (const [principle, value] of Object.entries(principles)) {
      totals[principle as Principle] += value;
    }
  }

  // Add skill contributions
  for (const playerSkill of state.skills) {
    if (playerSkill.level <= 0) continue;

    const skillDef = SKILLS.find((s) => s.id === playerSkill.id);
    if (!skillDef) continue;

    // Primary principle: level + 1
    totals[skillDef.primary] += playerSkill.level + 1;

    // Secondary principle: level
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

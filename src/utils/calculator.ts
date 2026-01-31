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

  // For each principle, find the best single soul contribution
  for (const principle of PRINCIPLES) {
    let bestSoulValue = 0;
    for (const playerSoul of state.souls) {
      if (!playerSoul.owned || playerSoul.evolution < 0) continue;
      const soulDef = SOULS.find((s) => s.id === playerSoul.id);
      if (!soulDef) continue;
      const principles = getSoulPrinciples(soulDef, playerSoul.evolution);
      const value = principles[principle] ?? 0;
      if (value > bestSoulValue) {
        bestSoulValue = value;
      }
    }
    totals[principle] += bestSoulValue;
  }

  // For each principle, find the best single skill contribution
  for (const principle of PRINCIPLES) {
    let bestSkillValue = 0;
    for (const playerSkill of state.skills) {
      if (playerSkill.level <= 0) continue;
      const skillDef = SKILLS.find((s) => s.id === playerSkill.id);
      if (!skillDef) continue;
      let value = 0;
      if (skillDef.primary === principle) {
        value = playerSkill.level + 1;
      } else if (skillDef.secondary === principle) {
        value = playerSkill.level;
      }
      if (value > bestSkillValue) {
        bestSkillValue = value;
      }
    }
    totals[principle] += bestSkillValue;
  }

  // For each principle, use the best tool or ink bonus (already one per principle)
  for (const principle of PRINCIPLES) {
    const toolValue = state.toolBonuses[principle] ?? 0;
    const inkValue = state.inkBonuses[principle] ?? 0;
    totals[principle] += Math.max(toolValue, inkValue);
  }

  // For each principle, find the best single memory bonus
  for (const principle of PRINCIPLES) {
    const value = state.memoryBonuses[principle] ?? 0;
    totals[principle] += value;
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

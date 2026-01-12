import { Principle } from './principles';

export interface SoulDefinition {
  id: string;
  name: string;
  description: string;
  primary: Principle;
  secondary: Principle | null;
  isHealth?: boolean; // Health has special evolution rules
}

export const SOULS: SoulDefinition[] = [
  {
    id: 'chor',
    name: 'Chor',
    description: 'Exuberance, instinct, rhythm',
    primary: 'Heart',
    secondary: 'Grail',
  },
  {
    id: 'ereb',
    name: 'Ereb',
    description: 'Pride, compassion, hatred and fear',
    primary: 'Grail',
    secondary: 'Edge',
  },
  {
    id: 'fet',
    name: 'Fet',
    description: 'That part of us which walks in dreams',
    primary: 'Rose',
    secondary: 'Moth',
  },
  {
    id: 'health',
    name: 'Health',
    description: 'The dwelling-place of the soul',
    primary: 'Heart',
    secondary: null,
    isHealth: true,
  },
  {
    id: 'mettle',
    name: 'Mettle',
    description: 'Will; self-discipline; that part which makes the right choice',
    primary: 'Forge',
    secondary: 'Edge',
  },
  {
    id: 'phost',
    name: 'Phost',
    description: 'Sight, perception, inspiration',
    primary: 'Lantern',
    secondary: 'Sky',
  },
  {
    id: 'shapt',
    name: 'Shapt',
    description: 'Eloquence and understanding; the door opens both ways',
    primary: 'Knock',
    secondary: 'Forge',
  },
  {
    id: 'trist',
    name: 'Trist',
    description: 'The change and the longing',
    primary: 'Moth',
    secondary: 'Moon',
  },
  {
    id: 'wist',
    name: 'Wist',
    description: 'Name, memory, that part which remains',
    primary: 'Winter',
    secondary: 'Lantern',
  },
];

// Get principle values for a soul at a given evolution level
// Evolution: -1 = None, 0 = Base, 1 = +, 2 = ++, 3 = +++
export function getSoulPrinciples(
  soul: SoulDefinition,
  evolution: number
): Record<string, number> {
  if (evolution < 0) {
    return {}; // Not owned
  }

  if (soul.isHealth) {
    // Health has special progression: Heart/Nectar increase each level, Scale increases at ++ and +++
    const heart = 1 + evolution;
    const nectar = 1 + evolution;
    const scale = evolution >= 2 ? evolution : 1;
    return { Heart: heart, Nectar: nectar, Scale: scale };
  }

  // Standard souls: Primary starts at 2, Secondary starts at 1, both +1 per evolution
  const primaryValue = 2 + evolution;
  const secondaryValue = 1 + evolution;

  const result: Record<string, number> = {
    [soul.primary]: primaryValue,
  };

  if (soul.secondary) {
    result[soul.secondary] = secondaryValue;
  }

  return result;
}

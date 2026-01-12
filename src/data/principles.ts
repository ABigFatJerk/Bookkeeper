export const PRINCIPLES = [
  'Edge',
  'Forge',
  'Grail',
  'Heart',
  'Knock',
  'Lantern',
  'Moon',
  'Moth',
  'Nectar',
  'Rose',
  'Scale',
  'Sky',
  'Winter',
] as const;

export type Principle = typeof PRINCIPLES[number];

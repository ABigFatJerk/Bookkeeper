import { Principle } from './principles';

export interface SoulDefinition {
  id: string;
  name: string;
  description: string;
  principles: Partial<Record<Principle, number>>;
}

export const SOULS: SoulDefinition[] = [
  {
    id: 'chor',
    name: 'Chor',
    description: 'Exuberance, instinct, rhythm',
    principles: { Heart: 2, Grail: 1 },
  },
  {
    id: 'ereb',
    name: 'Ereb',
    description: 'Pride, compassion, hatred and fear',
    principles: { Grail: 2, Edge: 1 },
  },
  {
    id: 'fet',
    name: 'Fet',
    description: 'That part of us which walks in dreams',
    principles: { Rose: 2, Moth: 1 },
  },
  {
    id: 'health',
    name: 'Health',
    description: 'The dwelling-place of the soul',
    principles: { Heart: 1, Nectar: 1, Scale: 1 },
  },
  {
    id: 'mettle',
    name: 'Mettle',
    description: 'Will; self-discipline; that part which makes the right choice',
    principles: { Forge: 2, Edge: 1 },
  },
  {
    id: 'phost',
    name: 'Phost',
    description: 'Sight, perception, inspiration',
    principles: { Lantern: 2, Sky: 1 },
  },
  {
    id: 'shapt',
    name: 'Shapt',
    description: 'Eloquence and understanding; the door opens both ways',
    principles: { Knock: 2, Forge: 1 },
  },
  {
    id: 'trist',
    name: 'Trist',
    description: 'The change and the longing',
    principles: { Moth: 2, Moon: 1 },
  },
  {
    id: 'wist',
    name: 'Wist',
    description: 'Name, memory, that part which remains',
    principles: { Winter: 2, Lantern: 1 },
  },
];

export const EVOLUTION_LEVELS = [
  { value: 0, label: 'Base' },
  { value: 1, label: '+' },
  { value: 2, label: '++' },
  { value: 3, label: '+++' },
] as const;

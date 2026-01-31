# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start Vite dev server (serves at /Bookkeeper/ path)
- `npm run build` - TypeScript compile + Vite production build
- `npm run lint` - Run ESLint

## Architecture

This is a Book of Hours companion app built with React 19, TypeScript, and Vite. It calculates principle totals based on the player's souls, skills, and equipment bonuses.

### Data Flow

1. **Static game data** (`src/data/`) defines principles, souls, and skills with their principle associations
2. **Player state** (`PlayerState` type) tracks owned souls, skill levels, and bonuses - persisted to localStorage
3. **Calculator** (`src/utils/calculator.ts`) computes principle totals from player state
4. **Components** display and allow editing of player state

### Key Domain Concepts

- **Principles**: 13 game attributes (Edge, Forge, Grail, Heart, Knock, Lantern, Moon, Moth, Nectar, Rose, Scale, Sky, Winter)
- **Souls**: 9 soul elements with evolution levels (-1 to 3), each contributing to principles
- **Skills**: 63 skills with levels 0-9, each has primary (+level+1) and secondary (+level) principle contributions
- **Bonuses**: Tool, ink, and memory bonuses add to principles. Tool and ink are mutually exclusive (use max of the two)

### State Management

Uses `useLocalStorage` hook for persistence. State shape:
- `souls[]` - owned status and evolution level per soul
- `skills[]` - level per skill
- `toolBonuses`, `inkBonuses`, `memoryBonuses` - principle bonus values

### Deployment

Configured for GitHub Pages with base path `/Bookkeeper/`.

## Git Workflow

- Never push to GitHub without asking the user first.

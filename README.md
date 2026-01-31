# Bookkeeper

A companion app for [Book of Hours](https://weatherfactory.biz/book-of-hours/) that calculates your maximum principle totals based on your souls, skills, and equipment.

**Live app:** https://abigfatjerk.github.io/Bookkeeper/

## Features

- Track your 9 souls and their evolution levels
- Record skill levels for all 63 skills
- Add tool, ink, and memory bonuses
- Automatically calculates the best single-item contribution for each principle
- Shows crafting tier thresholds (Prentice 5+, Scholar 10+, Keeper 15+)
- Dark mode support
- Data persists in local storage

## How It Works

For each of the 13 principles, the calculator finds your maximum potential by selecting:

- The **best single soul** contributing to that principle
- The **best single skill** (primary gives level+1, secondary gives level)
- The **best single memory** bonus
- The **best tool or ink** bonus (whichever is higher)

This reflects what you can achieve for reading books.

## Development

```bash
npm install
npm run dev     # Start dev server at http://localhost:5173/Bookkeeper/
npm run build   # Production build
npm run lint    # Run ESLint
```

Built with React 19, TypeScript, and Vite.

## License

MIT

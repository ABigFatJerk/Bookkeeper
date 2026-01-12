import { SOULS, getSoulPrinciples } from '../data/souls';
import { PlayerSoul } from '../types';
import './SoulSelector.css';

interface SoulSelectorProps {
  souls: PlayerSoul[];
  onChange: (souls: PlayerSoul[]) => void;
}

function getLevelLabel(evolution: number): string {
  if (evolution < 0) return 'None';
  if (evolution === 0) return 'Base';
  return '+'.repeat(evolution);
}

export function SoulSelector({ souls, onChange }: SoulSelectorProps) {
  const handleEvolutionChange = (id: string, evolution: number) => {
    onChange(
      souls.map((soul) =>
        soul.id === id ? { ...soul, evolution, owned: evolution >= 0 } : soul
      )
    );
  };

  return (
    <div className="soul-selector">
      <h2 className="soul-selector__title">Soul Elements</h2>
      <div className="soul-selector__grid">
        {SOULS.map((soulDef) => {
          const playerSoul = souls.find((s) => s.id === soulDef.id);
          const evolution = playerSoul?.evolution ?? -1;
          const principles = getSoulPrinciples(soulDef, evolution);

          return (
            <div key={soulDef.id} className="soul-selector__item">
              <span className="soul-selector__name">{soulDef.name}</span>
              <div className="soul-selector__evolution">
                <button
                  className="soul-selector__btn"
                  onClick={() => handleEvolutionChange(soulDef.id, Math.max(-1, evolution - 1))}
                  disabled={evolution <= -1}
                >
                  -
                </button>
                <span className="soul-selector__level">
                  {getLevelLabel(evolution)}
                </span>
                <button
                  className="soul-selector__btn"
                  onClick={() => handleEvolutionChange(soulDef.id, Math.min(3, evolution + 1))}
                  disabled={evolution >= 3}
                >
                  +
                </button>
              </div>
              <span className="soul-selector__principles">
                {evolution < 0
                  ? '\u00A0' // Non-breaking space to maintain layout
                  : Object.entries(principles)
                      .map(([p, v]) => `${p} ${v}`)
                      .join(', ')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

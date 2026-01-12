import { SOULS, EVOLUTION_LEVELS } from '../data/souls';
import { PlayerSoul } from '../types';
import './SoulSelector.css';

interface SoulSelectorProps {
  souls: PlayerSoul[];
  onChange: (souls: PlayerSoul[]) => void;
}

export function SoulSelector({ souls, onChange }: SoulSelectorProps) {
  const handleOwnedChange = (id: string, owned: boolean) => {
    onChange(
      souls.map((soul) => (soul.id === id ? { ...soul, owned } : soul))
    );
  };

  const handleEvolutionChange = (id: string, evolution: number) => {
    onChange(
      souls.map((soul) => (soul.id === id ? { ...soul, evolution } : soul))
    );
  };

  return (
    <div className="soul-selector">
      <h2 className="soul-selector__title">Soul Elements</h2>
      <div className="soul-selector__grid">
        {SOULS.map((soulDef) => {
          const playerSoul = souls.find((s) => s.id === soulDef.id);
          const isOwned = playerSoul?.owned ?? false;
          const evolution = playerSoul?.evolution ?? 0;

          return (
            <div key={soulDef.id} className="soul-selector__item">
              <label className="soul-selector__checkbox">
                <input
                  type="checkbox"
                  checked={isOwned}
                  onChange={(e) => handleOwnedChange(soulDef.id, e.target.checked)}
                />
                <span className="soul-selector__name">{soulDef.name}</span>
              </label>
              {isOwned && (
                <select
                  className="soul-selector__evolution"
                  value={evolution}
                  onChange={(e) => handleEvolutionChange(soulDef.id, Number(e.target.value))}
                >
                  {EVOLUTION_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              )}
              <span className="soul-selector__principles">
                {Object.entries(soulDef.principles)
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

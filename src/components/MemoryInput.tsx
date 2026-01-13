import { PRINCIPLES, Principle } from '../data/principles';
import { PrincipleBonuses, PrincipleNotes } from '../types';
import './MemoryInput.css';

interface MemoryInputProps {
  title: string;
  bonuses: PrincipleBonuses;
  notes: PrincipleNotes;
  onBonusChange: (bonuses: PrincipleBonuses) => void;
  onNotesChange: (notes: PrincipleNotes) => void;
}

export function MemoryInput({ title, bonuses, notes, onBonusChange, onNotesChange }: MemoryInputProps) {
  const handleBonusChange = (principle: Principle, value: number) => {
    onBonusChange({
      ...bonuses,
      [principle]: Math.max(0, Math.min(99, value)),
    });
  };

  const handleNoteChange = (principle: Principle, note: string) => {
    onNotesChange({
      ...notes,
      [principle]: note,
    });
  };

  return (
    <div className="memory-input">
      <h2 className="memory-input__title">{title}</h2>
      <div className="memory-input__grid">
        {PRINCIPLES.map((principle) => (
          <div key={principle} className="memory-input__item">
            <div className="memory-input__header">
              <label className="memory-input__label">{principle}</label>
              <input
                type="number"
                className="memory-input__value"
                min={0}
                max={99}
                value={bonuses[principle] ?? 0}
                onChange={(e) => handleBonusChange(principle, Number(e.target.value))}
              />
            </div>
            <input
              type="text"
              className="memory-input__note"
              placeholder="Note..."
              value={notes[principle] ?? ''}
              onChange={(e) => handleNoteChange(principle, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

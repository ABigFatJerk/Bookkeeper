import { PRINCIPLES, Principle } from '../data/principles';
import { PrincipleBonuses } from '../types';
import './BonusInput.css';

interface BonusInputProps {
  title: string;
  bonuses: PrincipleBonuses;
  onChange: (bonuses: PrincipleBonuses) => void;
}

export function BonusInput({ title, bonuses, onChange }: BonusInputProps) {
  const handleChange = (principle: Principle, value: number) => {
    onChange({
      ...bonuses,
      [principle]: Math.max(0, Math.min(99, value)),
    });
  };

  return (
    <div className="bonus-input">
      <h3 className="bonus-input__title">{title}</h3>
      <div className="bonus-input__grid">
        {PRINCIPLES.map((principle) => (
          <div key={principle} className="bonus-input__item">
            <label className="bonus-input__label">{principle}</label>
            <input
              type="number"
              className="bonus-input__field"
              min={0}
              max={99}
              value={bonuses[principle] ?? 0}
              onChange={(e) => handleChange(principle, Number(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

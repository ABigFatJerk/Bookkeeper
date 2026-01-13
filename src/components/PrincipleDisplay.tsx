import { PRINCIPLES } from '../data/principles';
import { PrincipleTotals } from '../types';
import './PrincipleDisplay.css';

interface PrincipleDisplayProps {
  totals: PrincipleTotals;
}

export function PrincipleDisplay({ totals }: PrincipleDisplayProps) {
  return (
    <div className="principle-display">
      <h2 className="principle-display__title">Principle Totals</h2>
      <div className="principle-display__grid">
        {PRINCIPLES.map((principle) => (
          <div key={principle} className="principle-item">
            <span className="principle-item__name">{principle}</span>
            <span className="principle-item__value">{totals[principle]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

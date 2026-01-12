import { PRINCIPLES } from '../data/principles';
import { PrincipleTotals } from '../types';
import { PrincipleBar } from './PrincipleBar';
import './PrincipleDisplay.css';

interface PrincipleDisplayProps {
  totals: PrincipleTotals;
}

export function PrincipleDisplay({ totals }: PrincipleDisplayProps) {
  return (
    <div className="principle-display">
      <h2 className="principle-display__title">Principle Totals</h2>
      <div className="principle-display__legend">
        <span className="principle-display__legend-item principle-display__legend-item--prentice">
          5+ Prentice
        </span>
        <span className="principle-display__legend-item principle-display__legend-item--scholar">
          10+ Scholar
        </span>
        <span className="principle-display__legend-item principle-display__legend-item--keeper">
          15+ Keeper
        </span>
      </div>
      <div className="principle-display__grid">
        {PRINCIPLES.map((principle) => (
          <PrincipleBar key={principle} name={principle} value={totals[principle]} />
        ))}
      </div>
    </div>
  );
}

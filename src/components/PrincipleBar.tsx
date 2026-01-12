import { getCraftingTier } from '../utils/calculator';
import './PrincipleBar.css';

interface PrincipleBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

export function PrincipleBar({ name, value, maxValue = 20 }: PrincipleBarProps) {
  const tier = getCraftingTier(value);
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="principle-bar">
      <div className="principle-bar__label">
        <span className="principle-bar__name">{name}</span>
        <span className="principle-bar__value">{value}</span>
      </div>
      <div className="principle-bar__track">
        {/* Threshold markers */}
        <div className="principle-bar__marker principle-bar__marker--5" />
        <div className="principle-bar__marker principle-bar__marker--10" />
        <div className="principle-bar__marker principle-bar__marker--15" />

        {/* Fill bar */}
        <div
          className={`principle-bar__fill principle-bar__fill--${tier}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

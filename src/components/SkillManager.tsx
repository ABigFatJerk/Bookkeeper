import { SKILLS } from '../data/skills';
import { PlayerSkill } from '../types';
import './SkillManager.css';

interface SkillManagerProps {
  skills: PlayerSkill[];
  onChange: (skills: PlayerSkill[]) => void;
}

export function SkillManager({ skills, onChange }: SkillManagerProps) {
  const handleLevelChange = (id: string, level: number) => {
    onChange(
      skills.map((skill) => (skill.id === id ? { ...skill, level } : skill))
    );
  };

  return (
    <div className="skill-manager">
      <h2 className="skill-manager__title">Skills</h2>
      <div className="skill-manager__list">
        {SKILLS.map((skillDef) => {
          const playerSkill = skills.find((s) => s.id === skillDef.id);
          const level = playerSkill?.level ?? 0;

          return (
            <div key={skillDef.id} className="skill-manager__item">
              <div className="skill-manager__info">
                <span className="skill-manager__name">{skillDef.name}</span>
                <span className="skill-manager__principles">
                  {level > 0
                    ? `${skillDef.primary} ${level + 1}, ${skillDef.secondary} ${level}`
                    : '\u00A0'}
                </span>
              </div>
              <div className="skill-manager__controls">
                <button
                  className="skill-manager__btn"
                  onClick={() => handleLevelChange(skillDef.id, Math.max(0, level - 1))}
                  disabled={level <= 0}
                >
                  -
                </button>
                <span className="skill-manager__level">{level}</span>
                <button
                  className="skill-manager__btn"
                  onClick={() => handleLevelChange(skillDef.id, Math.min(9, level + 1))}
                  disabled={level >= 9}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

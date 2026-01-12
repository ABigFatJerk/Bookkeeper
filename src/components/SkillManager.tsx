import { useState } from 'react';
import { SKILLS } from '../data/skills';
import { PlayerSkill } from '../types';
import './SkillManager.css';

interface SkillManagerProps {
  skills: PlayerSkill[];
  onChange: (skills: PlayerSkill[]) => void;
}

export function SkillManager({ skills, onChange }: SkillManagerProps) {
  const [search, setSearch] = useState('');

  const handleLevelChange = (id: string, level: number) => {
    onChange(
      skills.map((skill) => (skill.id === id ? { ...skill, level } : skill))
    );
  };

  const filteredSkills = SKILLS.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="skill-manager">
      <h2 className="skill-manager__title">Skills</h2>
      <input
        type="text"
        className="skill-manager__search"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="skill-manager__list">
        {filteredSkills.map((skillDef) => {
          const playerSkill = skills.find((s) => s.id === skillDef.id);
          const level = playerSkill?.level ?? 0;

          return (
            <div key={skillDef.id} className="skill-manager__item">
              <div className="skill-manager__info">
                <span className="skill-manager__name">{skillDef.name}</span>
                <span className="skill-manager__principles">
                  {skillDef.primary} +1, {skillDef.secondary} +lvl
                </span>
              </div>
              <input
                type="number"
                className="skill-manager__level"
                min={0}
                max={9}
                value={level}
                onChange={(e) =>
                  handleLevelChange(skillDef.id, Math.max(0, Math.min(9, Number(e.target.value))))
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

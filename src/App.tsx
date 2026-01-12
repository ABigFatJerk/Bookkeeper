import { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SOULS } from './data/souls';
import { SKILLS } from './data/skills';
import { PlayerState, PlayerSoul, PlayerSkill, PrincipleBonuses } from './types';
import { calculatePrincipleTotals } from './utils/calculator';
import { PrincipleDisplay } from './components/PrincipleDisplay';
import { SoulSelector } from './components/SoulSelector';
import { SkillManager } from './components/SkillManager';
import { BonusInput } from './components/BonusInput';
import './App.css';

// Initialize default state
function createInitialState(): PlayerState {
  return {
    souls: SOULS.map((soul) => ({
      id: soul.id,
      owned: false,
      evolution: 0,
    })),
    skills: SKILLS.map((skill) => ({
      id: skill.id,
      level: 0,
    })),
    toolBonuses: {},
    inkBonuses: {},
    memoryBonuses: {},
  };
}

function App() {
  const [state, setState] = useLocalStorage<PlayerState>('bookkeeper-state', createInitialState());

  // Calculate totals whenever state changes
  const totals = useMemo(() => calculatePrincipleTotals(state), [state]);

  const handleSoulsChange = (souls: PlayerSoul[]) => {
    setState((prev) => ({ ...prev, souls }));
  };

  const handleSkillsChange = (skills: PlayerSkill[]) => {
    setState((prev) => ({ ...prev, skills }));
  };

  const handleToolBonusesChange = (toolBonuses: PrincipleBonuses) => {
    setState((prev) => ({ ...prev, toolBonuses }));
  };

  const handleInkBonusesChange = (inkBonuses: PrincipleBonuses) => {
    setState((prev) => ({ ...prev, inkBonuses }));
  };

  const handleMemoryBonusesChange = (memoryBonuses: PrincipleBonuses) => {
    setState((prev) => ({ ...prev, memoryBonuses }));
  };

  const handleReset = () => {
    if (confirm('Reset all data to defaults?')) {
      setState(createInitialState());
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Bookkeeper</h1>
        <p>Book of Hours Companion</p>
        <button className="app__reset" onClick={handleReset}>
          Reset
        </button>
      </header>

      <main className="app__main">
        <aside className="app__sidebar">
          <PrincipleDisplay totals={totals} />
        </aside>

        <div className="app__content">
          <SoulSelector souls={state.souls} onChange={handleSoulsChange} />

          <SkillManager skills={state.skills} onChange={handleSkillsChange} />

          <div className="app__bonuses">
            <BonusInput
              title="Tool Bonuses"
              bonuses={state.toolBonuses}
              onChange={handleToolBonusesChange}
            />
            <BonusInput
              title="Ink Bonuses"
              bonuses={state.inkBonuses}
              onChange={handleInkBonusesChange}
            />
            <BonusInput
              title="Memory Bonuses"
              bonuses={state.memoryBonuses}
              onChange={handleMemoryBonusesChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

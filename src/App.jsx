import React, { useState } from 'react';
import { useCupSimulation } from './hooks/useCupSimulation';
import { GroupsDisplay } from './components/GroupsDisplay';
import { GroupMatches } from './components/GroupMatches';
import { StandingsTable } from './components/StandingsTable';
import { KnockoutBracket } from './components/KnockoutBracket';
import { SimulateButton } from './components/SimulateButton';
import './styles/App.css';

function App() {
  const {
    cupData,
    isSimulating,
    simulationPhase,
    matchesPlayed,
    simulateGroups,
    simulateKnockout,
    reset
  } = useCupSimulation();

  const [activeTab, setActiveTab] = useState('groups');

  const handleSimulate = () => {
    if (simulationPhase === 'groups') {
      simulateGroups();
    } else {
      simulateKnockout();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container">
          <h1>⚽ Simulador de Copa do Mundo</h1>
          <p className="subtitle">Simule a fase de grupos e a fase knockout</p>
        </div>
      </header>

      <main className="container">
        {}
        <SimulateButton
          onSimulate={handleSimulate}
          onReset={reset}
          isSimulating={isSimulating}
          simulationPhase={simulationPhase}
          matchesPlayed={matchesPlayed}
          totalMatches={cupData.groupMatches.length}
        />

        {}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Fase de Grupos
          </button>
          <button
            className={`tab-button ${activeTab === 'knockout' ? 'active' : ''}`}
            onClick={() => setActiveTab('knockout')}
            disabled={simulationPhase === 'groups'}
          >
            Fase Knockout
          </button>
        </div>

        {}
        {activeTab === 'groups' && (
          <div className="tab-content">
            <GroupsDisplay groups={cupData.groups} />
            <GroupMatches matches={cupData.groupMatches} title="Partidas da Fase de Grupos" />

            {Object.keys(cupData.groupStandings).length > 0 && (
              <div className="standings-section">
                <h2>Classificação dos Grupos</h2>
                <div className="standings-grid">
                  {Object.entries(cupData.groupStandings).map(([groupName, standings]) => (
                    <StandingsTable
                      key={groupName}
                      standings={standings}
                      groupName={groupName}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'knockout' && (
          <div className="tab-content">
            <KnockoutBracket knockoutPhases={cupData.knockoutPhases} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 Simulador de Copa do Mundo | Desenvolvido com React + Vite</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

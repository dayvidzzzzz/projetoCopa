import React, { useState } from 'react';
import { useWorldCupData } from './hooks/useWorldCupData';
import { useGroupSimulation } from './hooks/useGroupSimulation';
import { useKnockoutSimulation } from './hooks/useKnockoutSimulation';
import { postFinalResult } from './api/worldCupApi';
import { GroupsDisplay } from './components/groups/GroupsDisplay';
import { GroupMatches } from './components/groups/GroupMatches';
import { StandingsTable } from './components/standings/StandingsTable';
import { KnockoutBracket } from './components/knockout/KnockoutBracket';
import { SimulationControls } from './components/simulation/SimulationControls';
import { Loading } from './components/common/Loading';
import { ErrorMessage } from './components/common/ErrorMessage';

function App() {
  const { 
    groups, 
    groupMatches, 
    teamTokens, 
    loading, 
    error, 
    resetGroups 
  } = useWorldCupData();
  
  const { 
    groupStandings, 
    qualified, 
    simulateGroups,
    resetSimulation: resetGroupSimulation
  } = useGroupSimulation();
  
  const { 
    knockoutPhases, 
    simulateKnockout,
    resetKnockout
  } = useKnockoutSimulation();
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [simulationCompleted, setSimulationCompleted] = useState(false);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setSimulationCompleted(false);
    
    resetGroupSimulation();
    resetKnockout();

    setProgressText('Simulando fase de grupos...');
    setSimulationProgress(10);
    
    const { qualifiedTeams } = simulateGroups(groupMatches);
    setSimulationProgress(40);
    
    await new Promise(resolve => setTimeout(resolve, 300));

    setProgressText('Simulando oitavas de final...');
    setSimulationProgress(50);
    
    const phases = simulateKnockout(qualifiedTeams);
    setSimulationProgress(80);
    
    await new Promise(resolve => setTimeout(resolve, 200));

    setProgressText('Enviando resultado para API...');
    setSimulationProgress(90);
    
    const finalMatch = phases.final;
    
    if (finalMatch) {
      const finalData = {
        equipeA: teamTokens[finalMatch.team1] || '00000000-0000-0000-0000-000000000000',
        equipeB: teamTokens[finalMatch.team2] || '00000000-0000-0000-0000-000000000000',
        golsEquipeA: finalMatch.score1 || 0,
        golsEquipeB: finalMatch.score2 || 0,
        golsPenaltyTimeA: finalMatch.penalties?.team1 || 0,
        golsPenaltyTimeB: finalMatch.penalties?.team2 || 0
      };

      try {
        await postFinalResult(finalData);
        console.log('Resultado enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar resultado:', error);
      }
    }

    setSimulationProgress(100);
    setProgressText('Simulação concluída!');
    
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationCompleted(true);
    }, 500);
  };

  const handleReset = () => {
    resetGroups();
    resetGroupSimulation();
    resetKnockout();
    setSimulationCompleted(false);
    setSimulationProgress(0);
    setProgressText('');
  };

  if (loading) {
    return (
      <div className="app-container">
        <header className="app-header">
          <div className="container">
            <h1>⚽ Simulador de Copa do Mundo</h1>
          </div>
        </header>
        <main className="container">
          <Loading text="Carregando times da API..." />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <header className="app-header">
          <div className="container">
            <h1>⚽ Simulador de Copa do Mundo</h1>
          </div>
        </header>
        <main className="container">
          <ErrorMessage error={error} onRetry={handleReset} />
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container">
          <h1>⚽ Simulador de Copa do Mundo</h1>
          <p className="subtitle">Simulação completa da fase de grupos até a final</p>
        </div>
      </header>

      <main className="container">
        <SimulationControls
          onSimulate={handleSimulate}
          onReset={handleReset}
          isSimulating={isSimulating}
          progress={simulationProgress}
          progressText={progressText}
        />

        {Object.keys(groups).length > 0 && (
          <GroupsDisplay groups={groups} />
        )}

        {groupMatches.length > 0 && groupMatches[0]?.score1 !== null && (
          <GroupMatches matches={groupMatches} title="Partidas da Fase de Grupos" />
        )}

        {Object.keys(groupStandings).length > 0 && (
          <div className="standings-section">
            <h2>Classificação dos Grupos</h2>
            <div className="standings-grid">
              {Object.entries(groupStandings).map(([groupName, standings]) => (
                <StandingsTable
                  key={groupName}
                  standings={standings}
                  groupName={groupName}
                />
              ))}
            </div>
          </div>
        )}

        {/* Chaveamento do Mata-Mata */}
        {simulationCompleted && knockoutPhases.roundOf16?.length > 0 && (
          <KnockoutBracket knockoutPhases={knockoutPhases} />
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2026 Simulador de Copa do Mundo | Desenvolvido para Processo Seletivo</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
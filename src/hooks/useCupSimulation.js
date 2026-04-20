// src/hooks/useCupSimulation.js
import { useState, useCallback, useEffect } from 'react';
import { fetchTeams, transformApiData } from '../service/api';
import {
  generateGroupMatches,
  simulateGroupMatches,
  getQualifiedTeams
} from '../core/simulation';
import { createRoundOf16, simulatePhase, getWinners } from '../core/knockout';

export function useCupSimulation() {
  const [cupData, setCupData] = useState({
    groups: {},
    groupMatches: [],
    groupStandings: {},
    qualified: [],
    knockoutPhases: {
      roundOf16: [],
      quarterfinals: [],
      semifinals: [],
      final: [],
      champion: null
    }
  });
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationPhase, setSimulationPhase] = useState('groups');
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega times da API e sorteia grupos
  useEffect(() => {
    async function loadTeams() {
      setLoading(true);
      try {
        const apiData = await fetchTeams();
        const transformed = transformApiData(apiData);
        
        if (transformed) {
          const groupMatches = generateGroupMatches(transformed.groups);
          
          setCupData(prev => ({
            ...prev,
            groups: transformed.groups,
            groupMatches: groupMatches,
          }));
          setSimulationPhase('groups');
        } else {
          setError('Não foi possível carregar os times');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTeams();
  }, []);

  // Simula fase de grupos
  const simulateGroups = useCallback(() => {
    setIsSimulating(true);
    setMatchesPlayed(0);

    // Agrupa partidas por grupo
    const matchesByGroup = cupData.groupMatches.reduce((acc, match) => {
      if (!acc[match.group]) acc[match.group] = [];
      acc[match.group].push(match);
      return acc;
    }, {});

    const allStandings = {};
    let totalMatches = 0;

    // Simula cada grupo
    Object.entries(matchesByGroup).forEach(([group, matches]) => {
      const standings = simulateGroupMatches(matches);
      allStandings[group] = standings;
      totalMatches += matches.length;
    });

    // Determina classificados
    const qualified = getQualifiedTeams(allStandings);

    setCupData(prev => ({
      ...prev,
      groupStandings: allStandings,
      qualified: qualified,
    }));
    
    setMatchesPlayed(totalMatches);
    setIsSimulating(false);
    setSimulationPhase('knockout');
  }, [cupData.groupMatches]);

  // Simula fase knockout
  const simulateKnockout = useCallback(() => {
    setIsSimulating(true);
    
    const roundOf16Matches = createRoundOf16(cupData.qualified);
    const playedRound16 = simulatePhase(roundOf16Matches);
    const qualifiedQF = getWinners(playedRound16);

    const qfMatches = [];
    for (let i = 0; i < qualifiedQF.length; i += 2) {
      qfMatches.push({ team1: qualifiedQF[i], team2: qualifiedQF[i + 1] });
    }
    const playedQF = simulatePhase(qfMatches);
    const qualifiedSF = getWinners(playedQF);

    const sfMatches = [
      { team1: qualifiedSF[0], team2: qualifiedSF[1] },
      { team1: qualifiedSF[2], team2: qualifiedSF[3] },
    ];
    const playedSF = simulatePhase(sfMatches);
    const finalists = getWinners(playedSF);

    const finalMatch = { team1: finalists[0], team2: finalists[1] };
    const playedFinal = simulatePhase([finalMatch])[0];

    setCupData(prev => ({
      ...prev,
      knockoutPhases: {
        roundOf16: playedRound16,
        quarterfinals: playedQF,
        semifinals: playedSF,
        final: playedFinal,
        champion: playedFinal.winner,
      },
    }));
    
    setIsSimulating(false);
  }, [cupData.qualified]);

  // Reset: recarrega a página para novo sorteio
  const reset = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    cupData,
    isSimulating,
    simulationPhase,
    matchesPlayed,
    loading,
    error,
    simulateGroups,
    simulateKnockout,
    reset
  };
}
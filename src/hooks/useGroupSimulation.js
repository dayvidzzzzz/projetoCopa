import { useState, useCallback } from 'react';
import { simulateAllGroups } from '../core/simulation/groupStage';
import { getQualifiedTeams } from '../core/simulation/scoring';

export const useGroupSimulation = () => {
  const [groupStandings, setGroupStandings] = useState({});
  const [qualified, setQualified] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateGroups = useCallback((groupMatches) => {
    setIsSimulating(true);
    
    const standings = simulateAllGroups(groupMatches);
    const qualifiedTeams = getQualifiedTeams(standings);
    
    setGroupStandings(standings);
    setQualified(qualifiedTeams);
    setIsSimulating(false);
    
    return { standings, qualifiedTeams };
  }, []);

  const resetSimulation = useCallback(() => {
    setGroupStandings({});
    setQualified([]);
  }, []);

  return {
    groupStandings,
    qualified,
    isSimulating,
    simulateGroups,
    resetSimulation
  };
};
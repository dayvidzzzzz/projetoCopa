import { useState, useCallback } from 'react';
import { createRoundOf16, simulatePhase, getWinners, createNextPhase } from '../core/simulation/knockoutStage';

export const useKnockoutSimulation = () => {
  const [knockoutPhases, setKnockoutPhases] = useState({
    roundOf16: [],
    quarterfinals: [],
    semifinals: [],
    final: null,
    champion: null
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateKnockout = useCallback((qualifiedTeams) => {
    setIsSimulating(true);

    const roundOf16 = createRoundOf16(qualifiedTeams);
    const playedRound16 = simulatePhase(roundOf16);
    const qfWinners = getWinners(playedRound16);

    const quarterfinals = createNextPhase(qfWinners);
    const playedQF = simulatePhase(quarterfinals);
    const sfWinners = getWinners(playedQF);

    const semifinals = createNextPhase(sfWinners);
    const playedSF = simulatePhase(semifinals);
    const finalists = getWinners(playedSF);

    const final = createNextPhase(finalists)[0];
    const playedFinal = simulatePhase([final])[0];

    const phases = {
      roundOf16: playedRound16,
      quarterfinals: playedQF,
      semifinals: playedSF,
      final: playedFinal,
      champion: playedFinal.winner
    };

    setKnockoutPhases(phases);
    setIsSimulating(false);

    return phases;
  }, []);

  const resetKnockout = useCallback(() => {
    setKnockoutPhases({
      roundOf16: [],
      quarterfinals: [],
      semifinals: [],
      final: null,
      champion: null
    });
  }, []);

  return {
    knockoutPhases,
    isSimulating,
    simulateKnockout,
    resetKnockout
  };
};
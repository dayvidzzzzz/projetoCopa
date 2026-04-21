import { randomInt } from '../utils/random';

export const createKnockoutMatch = (team1, team2) => ({
  team1: typeof team1 === 'string' ? team1 : team1.name,
  team2: typeof team2 === 'string' ? team2 : team2.name,
  score1: null,
  score2: null,
  extraTime: null,
  penalties: null,
  winner: null,
  status: 'pending'
});

export const simulateKnockoutMatch = (team1, team2) => {
  let score1 = randomInt(0, 3);
  let score2 = randomInt(0, 3);
  let extraTime = null;
  let penalties = null;
  let winner = null;

  if (score1 === score2) {
    extraTime = {
      score1: Math.random() < 0.5 ? 1 : 0,
      score2: Math.random() < 0.5 ? 1 : 0
    };
    score1 += extraTime.score1;
    score2 += extraTime.score2;

    if (score1 === score2) {
      penalties = {
        team1: randomInt(3, 5),
        team2: randomInt(3, 5)
      };
      while (penalties.team1 === penalties.team2) {
        penalties.team2 = randomInt(3, 5);
      }
      winner = penalties.team1 > penalties.team2 ? team1 : team2;
    } else {
      winner = score1 > score2 ? team1 : team2;
    }
  } else {
    winner = score1 > score2 ? team1 : team2;
  }

  return {
    team1,
    team2,
    score1,
    score2,
    extraTime,
    penalties,
    winner,
    status: 'completed'
  };
};

export const createRoundOf16 = (qualified) => {
  const matches = [];
  const pairings = [
    [0, 1], [2, 3], [4, 5], [6, 7],
    [8, 9], [10, 11], [12, 13], [14, 15]
  ];
  
  pairings.forEach(([idx1, idx2]) => {
    if (qualified[idx1] && qualified[idx2]) {
      matches.push(createKnockoutMatch(qualified[idx1], qualified[idx2]));
    }
  });
  
  return matches;
};

export const simulatePhase = (matches) => {
  return matches.map(match => simulateKnockoutMatch(match.team1, match.team2));
};

export const getWinners = (matches) => {
  return matches.filter(match => match.winner).map(match => match.winner);
};

export const createNextPhase = (winners) => {
  const matches = [];
  for (let i = 0; i < winners.length; i += 2) {
    matches.push(createKnockoutMatch(winners[i], winners[i + 1]));
  }
  return matches;
};
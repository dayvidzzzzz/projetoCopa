export function createKnockoutMatch(team1, team2) {
  return {
    team1: team1.name || team1,
    team2: team2.name || team2,
    score1: null,
    score2: null,
    extraTime: null,
    penalties: null,
    winner: null,
    status: 'pending' 
  };
}

export function simulateKnockoutMatch(team1, team2, team1Strength = 50, team2Strength = 50) {
  const team1Expected = (team1Strength / 100) * 3;
  const team2Expected = (team2Strength / 100) * 3;

  let score1 = Math.floor(Math.random() * 3) + (Math.random() < team1Expected / 3 ? 1 : 0);
  let score2 = Math.floor(Math.random() * 3) + (Math.random() < team2Expected / 3 ? 1 : 0);

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
        team1: Math.floor(Math.random() * 3) + 3,
        team2: Math.floor(Math.random() * 3) + 3
      };

      while (penalties.team1 === penalties.team2) {
        penalties.team1 = Math.floor(Math.random() * 3) + 3;
        penalties.team2 = Math.floor(Math.random() * 3) + 3;
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
}

export function createRoundOf16(qualified) {
  const matches = [];

  const pairings = [
    [0, 1],   // A1 vs B2
    [2, 3],   // C1 vs D2
    [4, 5],   // E1 vs F2
    [6, 7],   // G1 vs H2
    [8, 9],   // A2 vs B1
    [10, 11], // C2 vs D1
    [12, 13], // E2 vs F1
    [14, 15]  // G2 vs H1
  ];

  pairings.forEach(([idx1, idx2]) => {
    if (qualified[idx1] && qualified[idx2]) {
      matches.push(createKnockoutMatch(qualified[idx1], qualified[idx2]));
    }
  });

  return matches;
}

export function getWinners(matches) {
  return matches
    .filter(match => match.winner)
    .map(match => match.winner);
}

export function simulatePhase(matches) {
  return matches.map(match => 
    simulateKnockoutMatch(match.team1, match.team2)
  );
}

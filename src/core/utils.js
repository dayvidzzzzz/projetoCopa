// utils.js - Versão corrigida

export function generateGroupMatches(groups) {
  const matches = [];
  Object.entries(groups).forEach(([groupName, teams]) => {
    // Gera todas as combinações de times (round-robin)
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          group: groupName,
          team1: teams[i],
          team2: teams[j],
          score1: null,
          score2: null,
          status: 'pending'
        });
      }
    }
  });
  return matches;
}

export function generateMockData() {
  const groups = {
    A: ['Brasil', 'Suíça', 'Sérvia', 'Camarões'],
    B: ['Espanha', 'Alemanha', 'Japão', 'Costa Rica'],
    C: ['Argentina', 'Polônia', 'México', 'Arábia Saudita'],
    D: ['França', 'Dinamarca', 'Peru', 'Tunísia']
  };

  const matches = generateGroupMatches(groups).map(match => ({
    ...match,
    // Pré-simula alguns resultados para exemplo (opcional)
    score1: Math.floor(Math.random() * 4),
    score2: Math.floor(Math.random() * 4)
  }));

  return { groups, matches };
}

// Mantenha as outras funções existentes (sortTeamsByPoints, etc.)
export function sortTeamsByPoints(teams) {
  return [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });
}

export function formatTeam(team) {
  return {
    ...team,
    winRate: team.played > 0 ? ((team.wins / team.played) * 100).toFixed(1) : 0,
    displayPoints: `${team.points}pts`
  };
}

export function validateMatch(match) {
  return (
    match &&
    typeof match.team1 === 'string' &&
    typeof match.team2 === 'string' &&
    typeof match.score1 === 'number' &&
    typeof match.score2 === 'number' &&
    match.score1 >= 0 &&
    match.score2 >= 0
  );
}

export function calculateGeneralStats(matches) {
  const validMatches = matches.filter(m => m.score1 !== null && m.score2 !== null);
  
  if (validMatches.length === 0) {
    return {
      totalMatches: 0,
      totalGoals: 0,
      averageGoals: 0,
      highestScoringMatch: null
    };
  }

  const totalGoals = validMatches.reduce((sum, m) => sum + m.score1 + m.score2, 0);
  const highestMatch = validMatches.reduce((max, m) => {
    const mTotal = m.score1 + m.score2;
    const maxTotal = max.score1 + max.score2;
    return mTotal > maxTotal ? m : max;
  });

  return {
    totalMatches: validMatches.length,
    totalGoals,
    averageGoals: (totalGoals / validMatches.length).toFixed(2),
    highestScoringMatch: {
      match: `${highestMatch.team1} ${highestMatch.score1}x${highestMatch.score2} ${highestMatch.team2}`,
      goals: highestMatch.score1 + highestMatch.score2
    }
  };
}
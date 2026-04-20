export function generateGroupMatches(groups) {
  const matches = [];
  
  Object.entries(groups).forEach(([groupName, teams]) => {
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

export function simulateScore(team1Strength = 50, team2Strength = 50) {
  const total = team1Strength + team2Strength;
  const lambda1 = (team1Strength / total) * 2.5;
  const lambda2 = (team2Strength / total) * 2.5;

  let score1 = Math.floor(Math.random() * (lambda1 + 1));
  let score2 = Math.floor(Math.random() * (lambda2 + 1));
  
  if (Math.random() < 0.3) score1++;
  if (Math.random() < 0.3) score2++;

  return { score1, score2 };
}

export function processGroupMatch(match, standings) {
  const { team1, team2, score1, score2 } = match;
  
  [team1, team2].forEach(team => {
    if (!standings[team]) {
      standings[team] = {
        name: team,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      };
    }
  });

  standings[team1].played++;
  standings[team2].played++;
  standings[team1].goalsFor += score1;
  standings[team1].goalsAgainst += score2;
  standings[team2].goalsFor += score2;
  standings[team2].goalsAgainst += score1;

  if (score1 > score2) {
    standings[team1].wins++;
    standings[team1].points += 3;
    standings[team2].losses++;
  } else if (score2 > score1) {
    standings[team2].wins++;
    standings[team2].points += 3;
    standings[team1].losses++;
  } else {
    standings[team1].draws++;
    standings[team2].draws++;
    standings[team1].points += 1;
    standings[team2].points += 1;
  }

  standings[team1].goalDifference = standings[team1].goalsFor - standings[team1].goalsAgainst;
  standings[team2].goalDifference = standings[team2].goalsFor - standings[team2].goalsAgainst;

  return standings;
}

export function simulateGroupMatches(matches, teamStrengthMap = {}) {
  const standings = {};
  
  matches.forEach(match => {
    const strength1 = teamStrengthMap[match.team1] || 50;
    const strength2 = teamStrengthMap[match.team2] || 50;
    const { score1, score2 } = simulateScore(strength1, strength2);
    
    match.score1 = score1;
    match.score2 = score2;
    match.status = 'completed';
    
    processGroupMatch(match, standings);
  });
  
  return standings;
}

export function sortGroupStandings(standings) {
  const teams = Object.values(standings);
  return teams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.name.localeCompare(b.name);
  });
}

export function getQualifiedTeams(groupStandings) {
  const qualified = [];
  Object.values(groupStandings).forEach(group => {
    const sorted = sortGroupStandings(group);
    qualified.push(sorted[0].name, sorted[1].name);
  });
  return qualified;
}
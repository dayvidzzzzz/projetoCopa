import { POINTS } from '../../constants';

export const createTeamRecord = (teamName) => ({
  name: teamName,
  played: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  goalDifference: 0,
  points: 0
});

export const processMatch = (match, standings) => {
  const { team1, team2, score1, score2 } = match;
  
  [team1, team2].forEach(team => {
    if (!standings[team]) {
      standings[team] = createTeamRecord(team);
    }
  });

  const t1 = standings[team1];
  const t2 = standings[team2];

  t1.played++;
  t2.played++;
  t1.goalsFor += score1;
  t1.goalsAgainst += score2;
  t2.goalsFor += score2;
  t2.goalsAgainst += score1;

  if (score1 > score2) {
    t1.wins++;
    t1.points += POINTS.WIN;
    t2.losses++;
  } else if (score2 > score1) {
    t2.wins++;
    t2.points += POINTS.WIN;
    t1.losses++;
  } else {
    t1.draws++;
    t2.draws++;
    t1.points += POINTS.DRAW;
    t2.points += POINTS.DRAW;
  }

  t1.goalDifference = t1.goalsFor - t1.goalsAgainst;
  t2.goalDifference = t2.goalsFor - t2.goalsAgainst;

  return standings;
};

export const sortStandings = (standings) => {
  const teams = Object.values(standings);
  return teams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return Math.random() - 0.5; // Sorteio
  });
};

export const getQualifiedTeams = (groupStandings) => {
  const qualified = [];
  Object.values(groupStandings).forEach(group => {
    const sorted = sortStandings(group);
    qualified.push(sorted[0].name, sorted[1].name);
  });
  return qualified;
};
import { sortTeamsByPoints } from './utils';

export function processGroupMatch(match, standings) {
  const { team1, team2, score1, score2 } = match;

  if (!standings[team1]) {
    standings[team1] = {
      name: team1,
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

  if (!standings[team2]) {
    standings[team2] = {
      name: team2,
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
    standings[team1].points += 1;
    standings[team2].draws++;
    standings[team2].points += 1;
  }

  standings[team1].goalDifference = standings[team1].goalsFor - standings[team1].goalsAgainst;
  standings[team2].goalDifference = standings[team2].goalsFor - standings[team2].goalsAgainst;

  return standings;
}

export function getGroupRanking(groupStandings) {
  const teams = Object.values(groupStandings);
  return sortTeamsByPoints(teams);
}

export function getQualifiedTeams(groupStandings) {
  const ranking = getGroupRanking(groupStandings);
  return ranking.slice(0, 2);
}

export function simulateGroupStage(matches) {
  let standings = {};

  matches.forEach(match => {
    standings = processGroupMatch(match, standings);
  });

  return standings;
}

import { poissonSample } from '../utils/random';
import { processMatch } from './scoring';

export const generateGroupMatches = (groups) => {
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
};

export const simulateMatchScore = (team1Strength = 50, team2Strength = 50) => {
  const total = team1Strength + team2Strength;
  const lambda1 = (team1Strength / total) * 2.5;
  const lambda2 = (team2Strength / total) * 2.5;
  
  let score1 = poissonSample(lambda1);
  let score2 = poissonSample(lambda2);
  
  if (Math.random() < 0.3) score1++;
  if (Math.random() < 0.3) score2++;
  
  return { score1, score2 };
};

export const simulateGroupMatches = (matches) => {
  const standings = {};
  
  matches.forEach(match => {
    const { score1, score2 } = simulateMatchScore(50, 50);
    match.score1 = score1;
    match.score2 = score2;
    match.status = 'completed';
    processMatch(match, standings);
  });
  
  return standings;
};

export const simulateAllGroups = (groupMatches) => {
  const matchesByGroup = groupMatches.reduce((acc, match) => {
    if (!acc[match.group]) acc[match.group] = [];
    acc[match.group].push(match);
    return acc;
  }, {});

  const allStandings = {};
  
  Object.entries(matchesByGroup).forEach(([group, matches]) => {
    allStandings[group] = simulateGroupMatches(matches);
  });

  return allStandings;
};
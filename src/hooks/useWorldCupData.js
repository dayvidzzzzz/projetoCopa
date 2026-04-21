import { useState, useEffect } from 'react';
import { fetchTeams, transformApiData } from '../api/worldCupApi';
import { GROUP_NAMES, TEAMS_PER_GROUP } from '../constants';
import { shuffleArray } from '../core/utils/random';
import { generateGroupMatches } from '../core/simulation/groupStage';

export const useWorldCupData = () => {
  const [groups, setGroups] = useState({});
  const [groupMatches, setGroupMatches] = useState([]);
  const [teamTokens, setTeamTokens] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const drawGroups = (teams) => {
    const shuffled = shuffleArray(teams);
    const newGroups = {};
    
    GROUP_NAMES.forEach((groupName, index) => {
      newGroups[groupName] = shuffled.slice(
        index * TEAMS_PER_GROUP, 
        index * TEAMS_PER_GROUP + TEAMS_PER_GROUP
      );
    });
    
    return newGroups;
  };

  const loadTeams = async () => {
    setLoading(true);
    try {
      const apiData = await fetchTeams();
      const { teamTokens } = transformApiData(apiData);
      
      const teams = apiData.map(item => item.nome);
      const newGroups = drawGroups(teams);
      const matches = generateGroupMatches(newGroups);
      
      setTeamTokens(teamTokens);
      setGroups(newGroups);
      setGroupMatches(matches);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetGroups = () => {
    if (Object.keys(groups).length > 0) {
      const allTeams = Object.values(groups).flat();
      const newGroups = drawGroups(allTeams);
      const matches = generateGroupMatches(newGroups);
      setGroups(newGroups);
      setGroupMatches(matches);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return {
    groups,
    groupMatches,
    teamTokens,
    loading,
    error,
    resetGroups,
    reloadTeams: loadTeams
  };
};
const API_BASE_URL = 'https://api.worldcup.aimsapi.com';

export async function fetchTeams() {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`);
    if (!response.ok) throw new Error('Erro ao buscar times');
    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export async function fetchGroups() {
  try {
    const response = await fetch(`${API_BASE_URL}/groups`);
    if (!response.ok) throw new Error('Erro ao buscar grupos');
    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export async function fetchMatches() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`);
    if (!response.ok) throw new Error('Erro ao buscar partidas');
    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export async function fetchWorldCupData() {
  try {
    const [teams, groups, matches] = await Promise.all([
      fetchTeams(),
      fetchGroups(),
      fetchMatches()
    ]);

    return {
      teams,
      groups,
      matches,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Erro ao buscar dados da Copa:', error);
    return null;
  }
}

const API_BASE_URL = 'https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams';
const GIT_USER = 'dayvidzzzzz';

export async function fetchTeams() {
  try {
    const response = await fetch(API_BASE_URL, {
      headers: { 'git-user': GIT_USER }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Times recebidos:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    return null;
  }
}

export function transformApiData(apiData) {
  if (!apiData || !Array.isArray(apiData) || apiData.length !== 32) {
    console.error('Dados inválidos da API');
    return null;
  }

  const teams = apiData.map(item => item.nome);
  const shuffled = [...teams].sort(() => Math.random() - 0.5);

  const groups = {};
  const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  groupNames.forEach((groupName, index) => {
    groups[groupName] = shuffled.slice(index * 4, index * 4 + 4);
  });

  console.log('🎲 Grupos sorteados:', groups);
  
  return {
    groups,
    teams,
    tokens: apiData.reduce((acc, item) => {
      acc[item.nome] = item.token;
      return acc;
    }, {})
  };
}
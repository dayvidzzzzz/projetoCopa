import { API_BASE_URL, GIT_USER } from '../constants';

export const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAllTeams`, {
      headers: { 'git-user': GIT_USER }
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    console.log('Times recebidos:', data.length);
    return data;
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    throw error;
  }
};

export const transformApiData = (apiData) => {
  if (!apiData || !Array.isArray(apiData) || apiData.length !== 32) {
    throw new Error('Dados inválidos da API');
  }

  const teamTokens = {};
  apiData.forEach(item => {
    teamTokens[item.nome] = item.token;
  });

  return { teamTokens };
};

export const postFinalResult = async (finalData) => {
  try {
    console.log('📤 Enviando resultado:', finalData);
    
    const response = await fetch(`${API_BASE_URL}/FinalResult`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'git-user': GIT_USER
      },
      body: JSON.stringify(finalData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Resultado enviado!');
    return data;
  } catch (error) {
    console.error('Erro ao enviar resultado:', error);
    throw error;
  }
};
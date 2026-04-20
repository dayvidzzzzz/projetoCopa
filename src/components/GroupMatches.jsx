import React from 'react';


export function GroupMatches({ matches, title = 'Partidas' }) {
  if (!matches || matches.length === 0) {
    return <div className="group-matches">Nenhuma partida para exibir</div>;
  }

  return (
    <div className="group-matches">
      <h3>{title}</h3>
      <div className="matches-list">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            <div className="match-content">
              <div className="team team1">
                <span className="team-name">{match.team1}</span>
              </div>

              <div className="match-result">
                {match.score1 !== null && match.score2 !== null ? (
                  <>
                    <span className="score">{match.score1}</span>
                    <span className="vs">x</span>
                    <span className="score">{match.score2}</span>
                  </>
                ) : (
                  <span className="pending">vs</span>
                )}
              </div>

              <div className="team team2">
                <span className="team-name">{match.team2}</span>
              </div>
            </div>

            {match.extraTime && (
              <div className="extra-info">
                Prorrogação: {match.extraTime.score1}x{match.extraTime.score2}
              </div>
            )}

            {match.penalties && (
              <div className="extra-info">
                Pênaltis: {match.penalties.team1}x{match.penalties.team2}
              </div>
            )}

            {match.winner && (
              <div className="match-winner">
                Vencedor: {match.winner}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

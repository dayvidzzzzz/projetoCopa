import React from 'react';

export function KnockoutBracket({ knockoutPhases }) {
  if (!knockoutPhases) {
    return <div className="knockout-bracket">Aguardando fase knockout...</div>;
  }

  const leftRoundOf16 = knockoutPhases.roundOf16.slice(0, 4);
  const rightRoundOf16 = knockoutPhases.roundOf16.slice(4);
  const leftQuarters = knockoutPhases.quarterfinals.slice(0, 2);
  const rightQuarters = knockoutPhases.quarterfinals.slice(2);
  const [semi1, semi2] = knockoutPhases.semifinals;
  const finalMatch = knockoutPhases.final;

  const renderBracketMatch = (match, key) => (
    <div key={key} className="bracket-match">
      <div className="match-teams">
        <div className="match-team">
          <span>{match.team1}</span>
          <span className="match-score">{match.score1 !== null ? match.score1 : '-'}</span>
        </div>
        <div className="match-team">
          <span>{match.team2}</span>
          <span className="match-score">{match.score2 !== null ? match.score2 : '-'}</span>
        </div>
      </div>
      {match.winner && <div className="match-winner">{match.winner}</div>}
    </div>
  );

  return (
    <div className="knockout-bracket">
      <h3>Fase Knockout</h3>
      <div className="bracket-layout">
        <div className="bracket-column left-side">
          <div className="bracket-stage">Oitavas</div>
          {leftRoundOf16.map((match, index) => renderBracketMatch(match, `r16-left-${index}`))}
        </div>

        <div className="bracket-column left-side">
          <div className="bracket-stage">Quartas</div>
          {leftQuarters.map((match, index) => renderBracketMatch(match, `qf-left-${index}`))}
        </div>

        <div className="bracket-center">
          <div className="bracket-stage">Semifinal</div>
          {semi1 && renderBracketMatch(semi1, 'sf-1')}
          {semi2 && renderBracketMatch(semi2, 'sf-2')}
          <div className="final-section">
            <div className="bracket-stage">Final</div>
            {finalMatch && renderBracketMatch(finalMatch, 'final')}
          </div>
        </div>

        <div className="bracket-column right-side">
          <div className="bracket-stage">Quartas</div>
          {rightQuarters.map((match, index) => renderBracketMatch(match, `qf-right-${index}`))}
        </div>

        <div className="bracket-column right-side">
          <div className="bracket-stage">Oitavas</div>
          {rightRoundOf16.map((match, index) => renderBracketMatch(match, `r16-right-${index}`))}
        </div>
      </div>

      {knockoutPhases.champion && (
        <div className="champion">
          <h2>🏆 Campeão: {knockoutPhases.champion}</h2>
        </div>
      )}
    </div>
  );
}

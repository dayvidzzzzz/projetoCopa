import React from 'react';

export const BracketMatch = ({ match, isFinal = false }) => {
  if (!match) return null;

  const isCompleted = match.score1 !== null && match.score2 !== null;
  const hasExtraTime = match.extraTime !== null;
  const hasPenalties = match.penalties !== null;

  return (
    <div className={`bracket-match ${isFinal ? 'final-match' : ''}`}>
      <div className="match-teams">
        <div className={`match-team ${match.winner === match.team1 ? 'winner' : ''}`}>
          <span className="team-name">{match.team1}</span>
          <span className="match-score">
            {isCompleted ? match.score1 : '-'}
          </span>
        </div>
        
        <div className={`match-team ${match.winner === match.team2 ? 'winner' : ''}`}>
          <span className="team-name">{match.team2}</span>
          <span className="match-score">
            {isCompleted ? match.score2 : '-'}
          </span>
        </div>
      </div>

      {hasExtraTime && (
        <div className="extra-time-info">
          <small>Prorrogação: {match.extraTime.score1}x{match.extraTime.score2}</small>
        </div>
      )}

      {hasPenalties && (
        <div className="penalties-info">
          <small>Pênaltis: {match.penalties.team1}x{match.penalties.team2}</small>
        </div>
      )}

      {match.winner && (
        <div className="match-winner">
          {match.winner}
        </div>
      )}
    </div>
  );
};
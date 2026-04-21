import React from 'react';
import { BracketMatch } from './BracketMatch';
import { ChampionDisplay } from './ChampionDisplay';

export const KnockoutBracket = ({ knockoutPhases }) => {
  if (!knockoutPhases || !knockoutPhases.roundOf16?.length) {
    return (
      <div className="knockout-bracket">
        <h3>Fase Knockout</h3>
        <p>Aguardando simulação...</p>
      </div>
    );
  }

  const { roundOf16, quarterfinals, semifinals, final, champion } = knockoutPhases;
  
  const leftRoundOf16 = roundOf16.slice(0, 4);
  const rightRoundOf16 = roundOf16.slice(4);
  const leftQuarters = quarterfinals.slice(0, 2);
  const rightQuarters = quarterfinals.slice(2);
  const [semi1, semi2] = semifinals;

  return (
    <div className="knockout-bracket">
      <h3>Fase Knockout</h3>
      
      <div className="bracket-layout">
        <div className="bracket-column left-side">
          <div className="bracket-stage">Oitavas</div>
          {leftRoundOf16.map((match, i) => (
            <BracketMatch key={`r16-left-${i}`} match={match} />
          ))}
        </div>

        <div className="bracket-column left-side">
          <div className="bracket-stage">Quartas</div>
          {leftQuarters.map((match, i) => (
            <BracketMatch key={`qf-left-${i}`} match={match} />
          ))}
        </div>

        <div className="bracket-center">
          <div className="bracket-stage">Semifinal</div>
          {semi1 && <BracketMatch match={semi1} />}
          {semi2 && <BracketMatch match={semi2} />}
          
          <div className="final-section">
            <div className="bracket-stage">Final</div>
            {final && <BracketMatch match={final} isFinal />}
          </div>
        </div>

        <div className="bracket-column right-side">
          <div className="bracket-stage">Quartas</div>
          {rightQuarters.map((match, i) => (
            <BracketMatch key={`qf-right-${i}`} match={match} />
          ))}
        </div>

        <div className="bracket-column right-side">
          <div className="bracket-stage">Oitavas</div>
          {rightRoundOf16.map((match, i) => (
            <BracketMatch key={`r16-right-${i}`} match={match} />
          ))}
        </div>
      </div>

      {champion && <ChampionDisplay champion={champion} />}
    </div>
  );
};
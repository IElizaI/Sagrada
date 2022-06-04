import React from 'react';
import { StainedGlass } from '../../../../constans/constans';
import RowPatternStainedGlass from '../RowPatternStainedGlass/RowPatternStainedGlass';
import './StainedGlassOfOtherPlayers.css';

const StainedGlassOfOtherPlayers = ({ player }) => {
  let desiredStainedGlassId = StainedGlass.find(
    (elem) => elem.id === Number(player.selectedPattern.slice(0, -1))
  );
  desiredStainedGlassId =
    player.selectedPattern.slice(-1) === 'a'
      ? desiredStainedGlassId.pattern1.pattern
      : desiredStainedGlassId.pattern2.pattern;

  return (
    <div className="container-other-players-stained-glass">
      {desiredStainedGlassId.map((_, index) => (
        <RowPatternStainedGlass
          patternRow={desiredStainedGlassId[index]}
          key={player.id}
          row={index}
          cubes={player.pattern[index]}
        />
      ))}
      <div className="login">{player.login}</div>
    </div>
  );
};

export default StainedGlassOfOtherPlayers;

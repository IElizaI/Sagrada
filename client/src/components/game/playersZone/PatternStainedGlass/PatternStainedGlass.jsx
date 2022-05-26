import React from 'react';
import { useSelector } from 'react-redux';
import RowPatternStainedGlass from '../RowPatternStainedGlass/RowPatternStainedGlass';
import './PatternStainedGlass.css';
import { StainedGlass } from '../../../../constans/constans';
import axios from 'axios';

const PatternStainedGlass = () => {
  const currentStainedGlass = useSelector((state) => state.player.stainedGlass);
  const spacedСubes = useSelector((state) => state.player.spacedСubes);
  const lobby = useSelector((state) => state.lobby);
  const activePlayer = useSelector((state) => state.game.activePlayer);
  const user = useSelector((state) => state.user.id);
  const rounds = useSelector((state) => state.game.rounds);

  const droppedCubes = useSelector((state) => state.game.droppedCubes);
  const playerStainedGlassId = useSelector(
    (state) => state.player.stainedGlass
  );

  let desiredStainedGlassId = StainedGlass.find(
    (elem) => elem.id === Number(playerStainedGlassId.slice(0, -1))
  );
  desiredStainedGlassId =
    playerStainedGlassId.slice(-1) === 'a'
      ? desiredStainedGlassId.pattern1.pattern
      : desiredStainedGlassId.pattern2.pattern;

  const handlePass = async () => {
    await axios.post(
      'http://localhost:3001/game/cube/stained_glass',
      {
        gameId: lobby.id,
        pass: 'pass',
      },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <div className="container-pattern-stained-glass">
      {desiredStainedGlassId.map((_, index) => (
        <RowPatternStainedGlass
          patternRow={desiredStainedGlassId[index]}
          key={playerStainedGlassId}
          row={index}
          cubes={spacedСubes[index]}
        />
      ))}
      <p className="container-pattern-stained-glass-title">
        {currentStainedGlass.title}
      </p>
      {activePlayer === user && rounds.length !== 10 ? (
        <button onClick={handlePass}>Пропустить ход</button>
      ) : (
        ''
      )}
    </div>
  );
};

export default PatternStainedGlass;

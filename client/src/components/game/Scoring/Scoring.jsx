import React from 'react';
import { useSelector } from 'react-redux';
import {
  countPersonalGoalPoints,
  countEmptySpaces,
  countCommonGoals,
} from '../../../features/scoring';

const Scoring = () => {
  const id = useSelector((state) => state.player.personalGoal);
  const spacedСubes = useSelector((state) => state.player.spacedСubes);

  const countPoints = () => {
    const personalGoal = countPersonalGoalPoints(id, spacedСubes);
    const fine = countEmptySpaces(spacedСubes);
  };

  return (
    <div>
      <div>Считаем очки</div>
    </div>
  );
};

export default Scoring;

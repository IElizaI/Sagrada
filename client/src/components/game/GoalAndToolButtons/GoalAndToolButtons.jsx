import React from 'react';
import './GoalAndToolButtons.css';
import ButtonCommonGoals from './ButtonCommonGoals/ButtonCommonGoals';
import ButtonPersonalGoal from './ButtonPersonalGoal/ButtonPersonalGoal';
import ButtonInstruments from './ButtonInstruments/ButtonInstruments';
import { useSelector } from 'react-redux';

const GoalAndToolButtons = () => {
  const activePlayer = useSelector((state) => state.game.activePlayer);
  if (!activePlayer) {
    return null;
  }
  return (
    <div className="container-goal-tool">
      <ButtonCommonGoals />
      <ButtonPersonalGoal />
      <ButtonInstruments />
    </div>
  );
};

export default GoalAndToolButtons;

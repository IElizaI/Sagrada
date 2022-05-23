import React from 'react';
import './GoalAndToolButtons.css';
import ButtonCommonGoals from './ButtonCommonGoals/ButtonCommonGoals';
import ButtonPersonalGoal from './ButtonPersonalGoal/ButtonPersonalGoal';
import ButtonInstruments from './ButtonInstruments/ButtonInstruments';

const GoalAndToolButtons = () => {
  return (
    <div className="container-goal-tool">
      <ButtonCommonGoals />
      <ButtonPersonalGoal />
      <ButtonInstruments />
    </div>
  );
};

export default GoalAndToolButtons;

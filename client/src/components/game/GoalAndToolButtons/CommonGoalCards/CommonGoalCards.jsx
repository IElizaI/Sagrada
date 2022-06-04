import React from 'react';
import './CommonGoalCards.css';
import Сarousel from '../../../Сarousel/Сarousel';
import { useSelector } from 'react-redux';
import { CommonGoals } from '../../../../constans/constans';

const CommonGoalCards = () => {
  const stateCommonGoalsId = useSelector((state) => state.game.commonGoals);

  const stateCommonGoals = CommonGoals.filter((goal) =>
    stateCommonGoalsId.includes(goal.id)
  );

  return <Сarousel arrayCommonGoals={stateCommonGoals} />;
};

export default CommonGoalCards;

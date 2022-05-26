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

  // let stateCommonGoals;
  // if (stateCommonGoalsId >= 0) {
  //   stateCommonGoals = stateCommonGoalsId.map((goal, index) => {
  //     const currGoal = CommonGoals.find((current) => current.id === goal.id);
  //     if (currGoal) {
  //       return currGoal;
  //     }
  //   });
  // }

  console.log('stateCommonGoals', stateCommonGoals);

  return (
    // <div className="container-common-goals">
    //   {goals.map((card) => {
    //     return <CommonGoal card={card} key={card.id} />;
    //   })}
    // </div>
    <Сarousel arrayCommonGoals={stateCommonGoals} />
  );
};

export default CommonGoalCards;

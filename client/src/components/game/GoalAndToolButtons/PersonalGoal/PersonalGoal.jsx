import React from 'react';
import { useSelector } from 'react-redux';
import './PersonalGoal.css';
import { PersonalGoals } from '../../../../constans/constans';

const PersonalGoal = () => {
  const statePersonalGoalId = useSelector((state) => state.player.personalGoal);
  const statePersonalGoal = PersonalGoals.find(
    (goal) => goal.id === statePersonalGoalId
  );
  return (
    <div className="container-personal-goal">
      <img
        className="img-personal-goal"
        src={statePersonalGoal.src}
        alt={statePersonalGoal.title}
      />
      <div className="title-personal-goal">{statePersonalGoal.title}</div>
      <div>{statePersonalGoal.description}</div>
    </div>
  );
};
export default PersonalGoal;

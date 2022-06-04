import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  countPersonalGoalPoints,
  countEmptySpaces,
  countCommonGoals,
} from '../../../features/scoring';
import { CommonGoals } from '../../../constans/constans';
import { addPlayerPoints } from '../../../store/actions/game';
import './Scoring.css';

const countPoints = (personalGoal, pattern, goals) => {
  const personalGoalPoints = countPersonalGoalPoints(personalGoal, pattern);
  const fine = countEmptySpaces(pattern);
  let commonGoals = countCommonGoals(goals.first, pattern);
  commonGoals += countCommonGoals(goals.second, pattern);
  commonGoals += countCommonGoals(goals.third, pattern);
  return personalGoalPoints + commonGoals - fine;
};

const getWinner = (players) => {
  if (players.length === 0) return null;

  return [...players].sort((a, b) => b.points - a.points)[0];
};

const Scoring = () => {
  const currentPlayerPersonalGoal = useSelector(
    (state) => state.player.personalGoal
  );
  const spacedСubes = useSelector((state) => state.player.spacedСubes);
  const stateCommonGoals = useSelector((state) => state.game.commonGoals);
  const user = useSelector((state) => state.user);
  const points = useSelector((state) => state.game.points);
  const players = useSelector((state) => state.game.players);
  const dispatch = useDispatch();

  const winner = getWinner(points);

  const [first, second, third] = CommonGoals.filter((goal) =>
    stateCommonGoals.includes(goal.id)
  );

  useEffect(() => {
    players.forEach((player) => {
      dispatch(
        addPlayerPoints({
          id: player.id,
          login: player.login,
          points: countPoints(player.personalGoal, player.pattern, {
            first,
            second,
            third,
          }),
        })
      );
    });

    dispatch(
      addPlayerPoints({
        id: user.id,
        login: user.login,
        points: countPoints(currentPlayerPersonalGoal, spacedСubes, {
          first,
          second,
          third,
        }),
      })
    );
  }, []);

  return (
    <div className="results">
      {winner ? (
        <div class="winner">
          Победитель {winner.login}. Он набрал {winner.points} очков!
        </div>
      ) : (
        ''
      )}

      {points.length
        ? points.map((score) => (
            <div class="result-player">{`${score.login}: ${score.points} очков`}</div>
          ))
        : ''}
    </div>
  );
};

export default Scoring;

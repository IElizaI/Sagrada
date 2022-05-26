import React from 'react';
import classes from './Counter.module.css';
import Dice from '../Dice/Dice';
import { useSelector } from 'react-redux';

const Counter = () => {
  // достаю раунд из состояния
  const rounds = useSelector((state) => state.game.rounds);

  const roundsTemplate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={classes.roundCubes}>
      {/* {counterCells} */}
      {roundsTemplate.map((round, index) => {
        const roundCube = rounds[index];
        return roundCube ? (
          <div className={classes.containerDice}>
            <Dice
              color={roundCube.color}
              number={roundCube.number}
              key={index}
            />
          </div>
        ) : (
          <div className={classes.dice}>
            <span className={classes.dot}>{round}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Counter;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dice from '../Dice/Dice';
import classes from './RollDiceBtn.module.css';
import { setRaisedCube } from '../../../store/actions/player';
import ActivePlayerCaption from '../Game/ActivePlayerCaption/ActivePlayerCaption';

export default function RollDiceBtn() {
  const raisedCube = useSelector((state) => state.player.raisedCube);
  let droppedСubes = useSelector((state) => state.game.droppedСubes);

  const dispatch = useDispatch();
  const handleTakeСube = (cube) => {
    dispatch(setRaisedCube(cube.id));
  };

  if (!droppedСubes) return null;
  // если сейчас очередь игрока, если кинулись кубики, если передан цвет кубика:
  return (
    <>
      <div className={classes.diceBtnDiv}>
        <div className={classes.droppedСubes}>
          <ActivePlayerCaption />
          {droppedСubes.map((cube, index) => (
            <div
              className={
                raisedCube >= 0 && raisedCube === index
                  ? classes.containerReserveActiveCube
                  : classes.containerReserveCube
              }
              key={index}
              onClick={() =>
                handleTakeСube({
                  id: index,
                })
              }
            >
              <Dice color={cube.color} number={cube.number} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

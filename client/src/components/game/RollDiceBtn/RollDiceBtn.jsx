import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dice from '../Dice/Dice';
import { setDroppedСubes, removeCubes } from '../../../store/actions/game';
import classes from './RollDiceBtn.module.css';
import uniqid from 'uniqid';
import { setRaisedCube } from '../../../store/actions/player';
import { removeDroppedСube, addDroppedCube } from '../../../store/actions/game';
import ActivePlayerCaption from '../Game/ActivePlayerCaption/ActivePlayerCaption';

export default function RollDiceBtn() {
  const raisedCube = useSelector((state) => state.player.raisedCube);
  let remainСubes = useSelector((state) => state.game.cubes);
  let droppedСubes = useSelector((state) => state.game.droppedСubes);

  const dispatch = useDispatch();

  // оставшиеся цвета (массив всех цветов)
  // let remainСolors = [];
  // for (let j = 0; j < remainСubes.length; j += 1) {
  //   for (let i = 1; i <= remainСubes[j].count; i += 1) {
  //     remainСolors.push(remainСubes[j].color);
  //   }
  // }
  // console.log('remainСolors', remainСolors);

  // вытаскиваем из оставшихся цветов рандомный (по одному)

  // кинутые кубики - из состояния
  // console.log('droppedСubes', droppedСubes);

  const handleTakeСube = (cube) => {
    dispatch(setRaisedCube(cube.id));
    // dispatch(removeDroppedСube(cube));
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

import axios from 'axios';
import { addCubeToStainedGlass, resetRaisedCube } from './player';
import { setActivePlayer } from './game';

export const putCube =
  (row, orderCell, raisedCube, activePlayer) => async (dispatch) => {
    console.log('put thunk ', row, orderCell, raisedCube, activePlayer);
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3001/game/cube/put',
      data: {
        row,
        orderCell,
        raisedCube,
        activePlayer,
      },
    });

    console.log(res.data);

    dispatch(addCubeToStainedGlass([row, orderCell, raisedCube, activePlayer]));
    dispatch(resetRaisedCube());
    dispatch(setActivePlayer(res.data));
  };

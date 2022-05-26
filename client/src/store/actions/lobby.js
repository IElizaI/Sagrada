import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const setLobby = createAction('lobby/set');
export const removeLobby = createAction('lobby/remove');

export const loadLobby = (id) => async (dispatch) => {
  const { data } = await axios.get('http://localhost:3001/game/lobby/' + id, {
    withCredentials: true,
  });

  if (data) {
    dispatch(setLobby(data));
  }
};

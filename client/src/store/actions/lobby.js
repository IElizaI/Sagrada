import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getApiUrl } from '../../constans/constans';

export const setLobby = createAction('lobby/set');
export const removeLobby = createAction('lobby/remove');

export const loadLobby = (id) => async (dispatch) => {
  const { data } = await axios.get(getApiUrl('/game/lobby/') + id, {
    withCredentials: true,
  });

  if (data) {
    dispatch(setLobby(data));
  }
};

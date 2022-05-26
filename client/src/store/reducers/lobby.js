import { createReducer } from '@reduxjs/toolkit';
import { setLobby, removeLobby } from '../actions/lobby';

const initialState = {};

export const lobbyReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLobby, (state, { payload }) => payload);
  builder.addCase(removeLobby, (state) => {
    state.players = null;
    state.creator = null;
    state.id = null;
  });
});

import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/player';

const initialState = {
  login: null,
  personalGoal: null,
  windowFrame: null,
  stainedGlass: null,
  numberPoints: null,
  privilegeСhips: null,
  stainedGlassChoice: null,
  spacedСubes: [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ],
  raisedCube: null,
};

const player = createReducer(initialState, (builder) => {
  builder.addCase(actions.setLogin, (state, action) => {
    state.login = action.payload;
  });
  builder.addCase(actions.setPersonalGoal, (state, action) => {
    state.personalGoal = action.payload;
  });
  builder.addCase(actions.setWindowFrame, (state, action) => {
    state.windowFrame = action.payload;
  });
  builder.addCase(actions.setStainedGlass, (state, action) => {
    state.stainedGlass = action.payload;
  });
  builder.addCase(actions.setNumberPoints, (state, action) => {
    state.numberPoints = action.payload;
  });
  builder.addCase(actions.setPrivilegeСhips, (state, action) => {
    state.privilegeСhips = action.payload;
  });
  builder.addCase(actions.usePrivilegeСhips, (state, action) => {
    state.privilegeСhips -= action.payload;
  });

  builder.addCase(actions.setCurrentPlayerPattern, (state, action) => {
    state.spacedСubes = action.payload;
  });
  builder.addCase(actions.setstainedGlassForChoice, (state, action) => {
    state.stainedGlassChoice = action.payload;
  });
  builder.addCase(actions.setRaisedCube, (state, action) => {
    state.raisedCube = action.payload;
  });
  builder.addCase(actions.resetRaisedCube, (state) => {
    state.raisedCube = null;
  });
  builder.addCase(actions.removePlayer, (state) => {
    state.login = null;
    state.personalGoal = null;
    state.windowFrame = null;
    state.stainedGlass = null;
    state.numberPoints = null;
    state.privilegeСhips = null;
    state.stainedGlassChoice = null;
    state.spacedСubes = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    state.raisedCube = null;
  });
});

export default player;

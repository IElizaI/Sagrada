import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/player';
// import { CubeColors, CubeNumbers } from '../../constans/constans';

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
  // action принимает payload с ником игрока
  builder.addCase(actions.setLogin, (state, action) => {
    state.login = action.payload;
  });
  builder.addCase(actions.setPersonalGoal, (state, action) => {
    state.personalGoal = action.payload;
  });
  // action принимает payload с объектом c ключами id, color и src
  builder.addCase(actions.setWindowFrame, (state, action) => {
    state.windowFrame = action.payload;
  });
  // action принимает payload с объектом витража c ключами:
  // id
  // title
  // complexity (номер сложности),
  // pattern в виде двумерного массива
  // src с переменной в которой картинка
  builder.addCase(actions.setStainedGlass, (state, action) => {
    state.stainedGlass = action.payload;
  });
  // action принимает payload с количеством заработанных очков
  builder.addCase(actions.setNumberPoints, (state, action) => {
    state.numberPoints = action.payload;
  });
  // action принимает payload с числом фишек привелегий
  builder.addCase(actions.setPrivilegeСhips, (state, action) => {
    state.privilegeСhips = action.payload;
  });
  // action принимает payload с числом фишек привелегий которые были использованы
  builder.addCase(actions.usePrivilegeСhips, (state, action) => {
    state.privilegeСhips -= action.payload;
  });

  builder.addCase(actions.setCurrentPlayerPattern, (state, action) => {
    state.spacedСubes = action.payload;
  });
  // action принимает payload с массивом двух витражей для выбора игрока
  builder.addCase(actions.setstainedGlassForChoice, (state, action) => {
    state.stainedGlassChoice = action.payload;
  });
  // action принимает payload с индексом куба в резерве
  builder.addCase(actions.setRaisedCube, (state, action) => {
    state.raisedCube = action.payload;
  });
  // устанавливает поднятому кубику значение null
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

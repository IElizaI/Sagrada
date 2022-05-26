import { createReducer } from '@reduxjs/toolkit';
import { CubeColors, CubeNumbers } from '../../constans/constans';
import * as actions from '../actions/game';

const initialState = {
  rounds: [],
  players: null,
  activePlayer: null,
  commonGoals: [],
  droppedСubes: null,
  instruments: [],
  stainedGlass: [],
};

const game = createReducer(initialState, (builder) => {
  builder.addCase(actions.setRounds, (state, action) => {
    state.rounds = action.payload;
  });
  // action принимает payload с массивом, элементы которого строка с названием цвета
  builder.addCase(actions.removeCubes, (state, action) => {
    action.payload.forEach((payloadCube) => {
      state.cubes.forEach((stateCube) => {
        // console.log('stateCube', stateCube);
        if (stateCube.color === payloadCube) {
          stateCube.count -= 1;
        }
      });
    });
  });
  // action принимает payload со id игрока
  builder.addCase(actions.setActivePlayer, (state, action) => {
    state.activePlayer = action.payload;
  });
  // action принимает payload с массивом объектов кубов с ключами color и строку с номером
  builder.addCase(actions.setDroppedСubes, (state, action) => {
    // action.payload.forEach((cube) => {
    //   state.droppedСubes.push(cube);
    // });
    console.log('--------------------------------------', action.payload);
    state.droppedСubes = action.payload;
  });
  builder.addCase(actions.setCommonGoals, (state, action) => {
    state.commonGoals = action.payload;
  });
  // меняет состояние выпавших кубов на пустой массив
  builder.addCase(actions.deleteRemainingCubes, (state) => {
    state.droppedСubes = [];
  });

  // action принимает payload с массивом инструментов с ключами id
  // amountPrivilegeСhips (количество фишек привелегий на инструменте, изначально null) text src
  builder.addCase(actions.setInstruments, (state, action) => {
    action.payload.forEach((instrument) => {
      state.instruments.push(instrument);
    });
  });
  // action принимает payload с объектом id (id инструмента) и amount ()
  builder.addCase(actions.addPrivilegeСhipsOnInstruments, (state, action) => {
    const { id, amount } = action.payload;
    state.instruments.forEach((instrument) => {
      if (instrument.id === id) {
        instrument.amountPrivilegeСhips += amount;
      }
    });
  });
  // action принимает payload с объектом витража
  builder.addCase(actions.addStainedGlass, (state, action) => {
    state.stainedGlass.push(action.payload);
  });
  // action принимает payload с объектом куба, который надо удалить из резерва
  builder.addCase(actions.removeDroppedСube, (state, action) => {
    // console.log('tyt', action.payload);
    const { color, number } = action.payload;

    const needIndex = state.droppedСubes.findIndex(
      (cube) => cube.color === color && cube.number === number
    );

    const restedCubes = state.droppedСubes.filter(
      (_, index) => index !== needIndex
    );
    state.droppedСubes = restedCubes;
  });
  builder.addCase(actions.setPlayers, (state, action) => {
    state.players = action.payload;
  });
  builder.addCase(actions.addPatternsToPlayers, (state, action) => {
    const patterns = action.payload;
    state.players = state.players.map((player) => {
      if (patterns[player.id]) {
        return {
          ...player,
          pattern: patterns[player.id],
        };
      }
      return player;
    });
  });
  builder.addCase(actions.setPlayerPattern, (state, action) => {
    const { player: playerId, pattern } = action.payload;
    state.players = state.players.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          pattern,
        };
      }
      return player;
    });
  });
  builder.addCase(actions.addDroppedCube, (state, action) => {
    state.droppedСubes.push(action.payload);
  });
  builder.addCase(actions.removeGame, (state) => {
    state.rounds = [];
    state.players = null;
    state.activePlayer = null;
    state.commonGoals = [];
    state.droppedСubes = null;
    state.instruments = [];
    state.stainedGlass = [];
  });
});

export default game;

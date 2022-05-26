import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/game';

const initialState = {
  rounds: [],
  players: null,
  activePlayer: null,
  commonGoals: [],
  droppedСubes: null,
  instruments: [],
  stainedGlass: [],
  points: [],
};

const game = createReducer(initialState, (builder) => {
  builder.addCase(actions.setRounds, (state, action) => {
    state.rounds = action.payload;
  });
  builder.addCase(actions.removeCubes, (state, action) => {
    action.payload.forEach((payloadCube) => {
      state.cubes.forEach((stateCube) => {
        if (stateCube.color === payloadCube) {
          stateCube.count -= 1;
        }
      });
    });
  });
  builder.addCase(actions.setActivePlayer, (state, action) => {
    state.activePlayer = action.payload;
  });
  builder.addCase(actions.setDroppedСubes, (state, action) => {
    state.droppedСubes = action.payload;
  });
  builder.addCase(actions.setCommonGoals, (state, action) => {
    state.commonGoals = action.payload;
  });
  builder.addCase(actions.deleteRemainingCubes, (state) => {
    state.droppedСubes = [];
  });
  builder.addCase(actions.setInstruments, (state, action) => {
    action.payload.forEach((instrument) => {
      state.instruments.push(instrument);
    });
  });
  builder.addCase(actions.addPrivilegeСhipsOnInstruments, (state, action) => {
    const { id, amount } = action.payload;
    state.instruments.forEach((instrument) => {
      if (instrument.id === id) {
        instrument.amountPrivilegeСhips += amount;
      }
    });
  });
  builder.addCase(actions.addStainedGlass, (state, action) => {
    state.stainedGlass.push(action.payload);
  });
  builder.addCase(actions.removeDroppedСube, (state, action) => {
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
    state.points = [];
  });
  builder.addCase(actions.addPlayerPoints, (state, action) => {
    state.points.push(action.payload);
  });
});

export default game;

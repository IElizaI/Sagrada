import { createAction } from '@reduxjs/toolkit';

export const setRounds = createAction('game/rounds/set');
export const removeCubes = createAction('game/cubes/remove');
export const setActivePlayer = createAction('game/active_player/set');
export const setDroppedСubes = createAction('game/dropped_cubes/set');
export const addDroppedCube = createAction('game/dropped_cube/add');
export const removeDroppedСube = createAction('game/dropped_cube/remove');
export const setCommonGoals = createAction('game/common_goals/set');
export const deleteRemainingCubes = createAction('game/remaining_cubes/delete');
export const setInstruments = createAction('game/instruments/set');
export const addPrivilegeСhipsOnInstruments = createAction(
  'game/privilege_chips/add'
);
export const addStainedGlass = createAction('game/stained_glass/add');
export const setPlayers = createAction('game/players/set');
export const addPatternsToPlayers = createAction(
  'game/patterns_to_players/add'
);
export const setPlayerPattern = createAction('game/players/pattern/set');
export const removeGame = createAction('game/remove');
export const addPlayerPoints = createAction('game/player_points/add');

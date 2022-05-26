import { createAction } from '@reduxjs/toolkit';

export const setRounds = createAction('game/rounds/set');
// Удалить из общего запаса кубов те кубики, которые выпали в раунд
export const removeCubes = createAction('game/cubes/remove');
// Установить активного игрока
export const setActivePlayer = createAction('game/active_player/set');
// Добавить кубы, которые выпали в игровую зону
export const setDroppedСubes = createAction('game/dropped_cubes/set');

export const addDroppedCube = createAction('game/dropped_cube/add');
// Удалить из резерва тот кубик, который взяли
export const removeDroppedСube = createAction('game/dropped_cube/remove');
// Заполнить игру общими целями
export const setCommonGoals = createAction('game/common_goals/set');
// Удалить оставшиеся выпавшие кубы из игры (после добавлления куба на счетчик раундов)
export const deleteRemainingCubes = createAction('game/remaining_cubes/delete');
// Заполнить игру инструментами
export const setInstruments = createAction('game/instruments/set');
// Положить нужное кол-во фишек привелегий на инструмент
export const addPrivilegeСhipsOnInstruments = createAction(
  'game/privilege_chips/add'
);

// Добавить витраж в массив витражей игроков
export const addStainedGlass = createAction('game/stained_glass/add');
// Добавить информацию о всех игроков
export const setPlayers = createAction('game/players/set');
export const addPatternsToPlayers = createAction(
  'game/patterns_to_players/add'
);

export const setPlayerPattern = createAction('game/players/pattern/set');
export const removeGame = createAction('game/remove');

import { createAction } from '@reduxjs/toolkit';

export const setLogin = createAction('user/login/set');
export const setPersonalGoal = createAction('user/personal_goal/set');
export const setWindowFrame = createAction('user/window_frame/set');
export const setStainedGlass = createAction('user/stained_glass/set');
export const setNumberPoints = createAction('user/number_points/set');
export const setPrivilegeСhips = createAction('user/privilege_chips/set');
export const usePrivilegeСhips = createAction('user/privilege_chips/use');
export const setstainedGlassForChoice = createAction(
  'user/stained_glass_for_choice/set'
);
export const setRaisedCube = createAction('user/raised_cube/set');
export const resetRaisedCube = createAction('user/raised_cube/reset');
export const setCurrentPlayerPattern = createAction('user/pattern/set');
export const removePlayer = createAction('user/remove');

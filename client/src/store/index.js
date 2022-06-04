import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import game from './reducers/game';
import player from './reducers/player';
import { registrationFormReducer } from './reducers/registrationReducer';
import { loginFormReducer } from './reducers/loginReducer';
import { userReducer } from './reducers/userReducer';
import { lobbyReducer } from './reducers/lobby';
import { lobbiesReducer } from './reducers/lobbies';

const store = configureStore({
  reducer: combineReducers({
    game,
    player,
    registrationInputs: registrationFormReducer,
    loginInputs: loginFormReducer,
    user: userReducer,
    lobby: lobbyReducer,
    lobbies: lobbiesReducer,
  }),
});

export default store;

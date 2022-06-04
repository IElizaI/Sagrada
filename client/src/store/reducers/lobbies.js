const { createReducer } = require('@reduxjs/toolkit');
const { setLobbies } = require('../actions/lobbies');

const initialState = [];

export const lobbiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLobbies, (state, { payload }) => payload);
});

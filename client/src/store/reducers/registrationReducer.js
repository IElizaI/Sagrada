import initState from './initState';

export const registrationFormReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'USER_TYPING':
      return { ...state, ...payload };
    default:
      return state;
  }
};

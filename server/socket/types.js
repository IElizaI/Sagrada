const UPDATE_LOBBY = 'UPDATE_LOBBY';
const GAME_STARTED = 'GAME_STARTED';
const PLAYERS_SELECTED_PATTERNS = 'PLAYERS_SELECTED_PATTERNS';
const PUT_CUBE_FOR_STAINED_GLASS = 'PUT_CUBE_FOR_STAINED_GLASS';
const GAME_OVER = 'GAME_OVER';

const getMessage = (type, initiator, data = null) => ({
  type,
  initiator,
  data,
});

module.exports = {
  getMessage,
  UPDATE_LOBBY,
  GAME_STARTED,
  PLAYERS_SELECTED_PATTERNS,
  PUT_CUBE_FOR_STAINED_GLASS,
  GAME_OVER,
};

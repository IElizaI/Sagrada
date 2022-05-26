const Lobby = require('../classes/gameLobby');
const Rounds = require('../classes/gameRound');
const GameRound = require('../classes/gameRound');
const PlayerPatterns = require('../classes/playerPatterns');
const {
  getMessage,
  UPDATE_LOBBY,
  GAME_STARTED,
  PLAYERS_SELECTED_PATTERNS,
  PUT_CUBE_FOR_STAINED_GLASS,
  GAME_OVER,
} = require('../socket/types');
const router = require('express').Router();

// const getRandomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const randomCards = () => {
//   const num = 4 * 2;
//   const arr = [1,2,3,4,5,6,7,8,9,10,11,12];

// const arrayRandomCommonGoals = [];
// if (num > array.length) {
//   return false;
// }

// const arrayNumbers = [];
// do {
//   const randomNum = getRandomInt(0, array.length - 1);

//   if (!arrayNumbers.includes(randomNum)) {
//     arrayNumbers.push(randomNum);
//   }
// } while (arrayNumbers.length !== num);

// arrayNumbers.forEach((elem) => {
//   arrayRandomCommonGoals.push(array[elem]);
// });

// return arrayRandomCommonGoals;
// };

// router.post('/stainedGlass', (req, res) => {
//   const { numberUsers, array } = req.body;
//   const count = numberUsers * 2;

//   const arrayStainedGlass = randomCards(count, array);
//   const firstPlayer = [arrayStainedGlass[0], arrayStainedGlass[1]];
//   res.json(firstPlayer);
// });

// router.post('/cube/put', (req, res) => {
//   const { row, orderCell, raisedCube, activePlayer } = req.body;

//   console.log(row, orderCell, raisedCube, activePlayer);
//   const player = activePlayer === 'liza' ? 'dima' : 'liza';

//   res.json(player);
// });

router.get('/lobby/:id', (req, res) => {
  const { id } = req.params;
  const user = {
    id: req.session.user.userId,
    login: req.session.user.userLogin,
  };

  const isPlayerAdded = Lobby.addPlayer(id, user);
  const lobby = Lobby.getLobby(id);
  console.log(lobby);
  res.send(lobby);
  if (isPlayerAdded) {
    req.io.emit(`lobby_${id}`, getMessage(UPDATE_LOBBY, user.id));
  }

  // const players = Lobby.getPlayers(id).filter((player) => player.id !== user.id);

  // if (players.length > 0) {
  //   players.forEach(() => {

  //   })
  // }
  // req.io.emit()
});

router.post('/lobby/create', (req, res) => {
  console.log(req.session);
  const user = {
    id: req.session.user.userId,
    login: req.session.user.userLogin,
  };
  const lobby = Lobby.addGame(user);

  res.send(lobby);

  req.io.emit('lobbies', {});
});

router.post('/lobby/exit', (req, res) => {
  const { id } = req.body;
  const user = {
    id: req.session.user.userId,
    login: req.session.user.userLogin,
  };

  const lobby = Lobby.getLobby(id);
  Lobby.exitUserFromLobby(id, user.id);
  if (lobby.creator.id === user.id) {
    Lobby.changeCreator(id);
  }

  req.io.emit(`lobby_${id}`, getMessage(UPDATE_LOBBY, user.id));
  req.io.emit('lobbies', {});
  res.end();
});

router.post('/pattern/select', (req, res) => {
  const { gameId, playerId, patternId } = req.body; // 2b или 3a ...

  Rounds.setPlayerSelectedPattern(gameId, playerId, patternId);
  PlayerPatterns.addPlayer(gameId, playerId);
  console.log('PlayerPatterns.patterns', PlayerPatterns.patterns);
  const isAllPatternsSelected = Rounds.isAllPatternsSelected(gameId);
  console.log(isAllPatternsSelected);
  res.send(isAllPatternsSelected);

  const rounds = GameRound.getRounds(gameId);
  GameRound.rollTheDice(gameId);
  const reserve = GameRound.getReserve(gameId);
  const activePlayer = Rounds.getActivePlayer(gameId);

  const patterns = PlayerPatterns.getPatterns(gameId);
  const commonGoals = GameRound.getCommonGoals(gameId);

  console.log('goals--------------', commonGoals, GameRound.getPlayers(gameId));

  if (isAllPatternsSelected) {
    req.io.emit(
      `game_${gameId}`,
      getMessage(PLAYERS_SELECTED_PATTERNS, null, {
        rounds,
        reserve,
        patterns,
        players: GameRound.getPlayers(gameId),
        activePlayer,
        commonGoals,
      })
    );
  }
});

router.post('/create', (req, res) => {
  const { gameId } = req.body;
  const players = Lobby.getPlayers(gameId);
  const game = GameRound.addGame(gameId, players);

  // socket message
  req.io.emit(
    `lobby_${gameId}`,
    getMessage(GAME_STARTED, null, {
      players: game.players,
      patternsForSelection: game.patternsForSelection,
    })
  );
  res.send({ success: true });
});

router.post('/cube/stained_glass', (req, res) => {
  const { gameId, cell, cube, pass } = req.body;
  const player = req.session.user.userId;
  // console.log(player, player, cell, cube);
  // console.log('+++++++++++++++++++++=', PlayerPatterns.patterns[0][0]);

  if (!pass) {
    PlayerPatterns.updatePatternCell(gameId, player, cell, cube);
    GameRound.removeFromReserve(gameId, cube);
  }

  const activePlayer = GameRound.nextActivePlayer(gameId);

  const rounds = GameRound.getRounds(gameId);
  console.log(rounds);
  const pattern = PlayerPatterns.getPattern(gameId, player);
  const reserve = GameRound.getReserve(gameId);

  if (rounds.length === 10) {
    req.io.emit(
      `game_${gameId}`,
      getMessage(GAME_OVER, player, {
        pattern,
        rounds,
        reserve,
      })
    );
    res.send(true);
    return;
  }

  req.io.emit(
    `game_${gameId}`,
    getMessage(PUT_CUBE_FOR_STAINED_GLASS, player, {
      pattern,
      activePlayer,
      reserve,
      rounds,
    })
  );

  res.send(true);
});

router.get('/lobbies', (req, res) => {
  res.send(Lobby.getLobbiesInfo());
});

module.exports = router;

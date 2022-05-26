class Lobby {
  lobby = {};

  addGame(creator, gameId) {
    const lobbyGameid =
      gameId || Math.max(0, ...Object.keys(this.lobby).map(Number)) + 1;
    this.lobby[lobbyGameid] = {
      players: [creator],
      creator,
      id: lobbyGameid,
    };
    return this.lobby[lobbyGameid];
  }

  getLobby(gameId) {
    return this.lobby[gameId];
  }

  getPlayers(gameId) {
    if (this.lobby[gameId]) {
      return this.lobby[gameId].players;
    }
    return null;
  }

  getCreator(gameId) {
    if (this.lobby[gameId]) {
      return this.lobby[gameId].creator;
    }
    return null;
  }

  addPlayer(gameId, player) {
    if (this.lobby[gameId]) {
      const isPlayerHave = this.lobby[gameId].players.find(
        ({ id }) => id === player.id
      );
      if (!isPlayerHave) {
        this.lobby[gameId].players.push(player);
        return true;
      }
      return false;
    }
    return false;
  }

  deletePlayer(gameId, id) {
    if (this.lobby[gameId]) {
      const player = this.lobby[gameId].players.find((elem) => elem.id === id);

      if (player) {
        this.lobby[gameId].players = this.lobby[gameId].players.filter(
          (elem) => elem.id !== player.id
        );
      }
    }
  }

  getLobbiesInfo() {
    return Object.keys(this.lobby).map((key) => {
      const lobby = this.lobby[key];

      return {
        id: Number(key),
        creator: lobby.creator,
      };
    });
  }

  exitUserFromLobby(lobbyId, id) {
    this.lobby[lobbyId].players = this.lobby[lobbyId].players.filter(
      (player) => player.id !== id
    );

    if (this.lobby[lobbyId].players.length === 0) {
      this.lobby = Object.keys(this.lobby).reduce((acc, curr) => {
        if (Number(curr) === lobbyId) {
          return acc;
        }

        return { ...acc, [curr]: this.lobby[curr] };
      }, {});
    }
  }

  changeCreator(lobbyId) {
    if (this.lobby[lobbyId]) {
      const { players } = this.lobby[lobbyId];
      if (players.length > 0) {
        this.lobby[lobbyId].creator = players[0];
      }
    }
  }
}

const lobby = new Lobby();

// console.log(lobby.addGame({ id: 1, login: 'Бог' }));
// console.log(lobby.getPlayers(1));
// console.log(lobby.getCreator(1));
// console.log(lobby.addPlayer(1, { id: 2, login: 'Вася' }));
// console.log(lobby.addPlayer(1, { id: 3, login: 'Гена' }));
// console.log(lobby.getPlayers(1));
// console.log(lobby.deletePlayer(1, 3));
// console.log(lobby.getPlayers(1));

module.exports = lobby;

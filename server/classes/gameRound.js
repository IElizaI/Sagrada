const PlayerPatterns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const CommonGoals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PersonalGoals = [1, 2, 3, 4, 5];

class Rounds {
  gameRounds = {};

  // setRounds(gameId) {
  //   this.gameRounds[gameId].rounds = [];
  // }

  getRounds(gameId) {
    if (this.gameRounds[gameId]) {
      return this.gameRounds[gameId].rounds;
    }
    return null;
  }

  addRound(gameId, cube) {
    this.gameRounds[gameId].rounds.push(cube);
  }

  changeDiceInRound(gameId, round, cube) {
    if (this.gameRounds[gameId].rounds[round - 1]) {
      this.gameRounds[gameId].rounds[round - 1] = cube;
    } else {
      return null;
    }
  }

  getPlayers(gameId) {
    return this.gameRounds[gameId].players;
  }

  removeFromReserve(gameId, cube) {
    if (this.gameRounds[gameId].reserve.length) {
      const needIndex = this.gameRounds[gameId].reserve.findIndex(
        (elem) => cube.color === elem.color && cube.number === elem.number
      );

      this.gameRounds[gameId].reserve = this.gameRounds[gameId].reserve.filter(
        (_, index) => index !== needIndex
      );
    } else {
      return null;
    }
  }

  addGame(gameId, players) {
    this.gameRounds[gameId] = {
      cubes: [
        { color: 'blue', count: 18 },
        { color: 'green', count: 18 },
        { color: 'purple', count: 18 },
        { color: 'red', count: 18 },
        { color: 'yellow', count: 18 },
      ],
      rounds: [],
      players,
      playersQueue: null,
      activePlayer: null,
      reserve: null,
      patternsForSelection: null,
      commonGoals: null,
      personalGoals: null,
    };
    this.setTurnOrder(gameId);
    this.nextActivePlayer(gameId);
    this.selectPatternsForPlayers(gameId);
    this.setCommonGoals(gameId);
    this.setPersonalGoals(gameId);
    return this.gameRounds[gameId];
  }

  getActivePlayer(gameId) {
    return this.gameRounds[gameId].activePlayer;
  }

  selectPatternsForPlayers(gameId) {
    const { players } = this.gameRounds[gameId];
    const patterns = Rounds.shuffleArray(PlayerPatterns);
    const selectedPatterns = players.reduce(
      (acc, curr, index) => ({
        ...acc,
        [curr.id]: [patterns[index * 2], patterns[index * 2 + 1]],
      }),
      {}
    );
    this.gameRounds[gameId].patternsForSelection = selectedPatterns;
  }

  setPlayerSelectedPattern(gameId, playerId, patternId) {
    console.log(gameId, playerId, patternId);
    console.log('this.gameRounds', this.gameRounds);
    if (this.gameRounds[gameId]) {
      console.log('kkjkjkjk');
      const player = this.gameRounds[gameId].players.find(
        (elem) => elem.id === playerId
      );
      console.log('player', player);
      if (player) {
        this.gameRounds[gameId].players = this.gameRounds[gameId].players.map(
          (elem) => {
            if (elem.id === player.id) {
              return {
                ...elem,
                selectedPattern: patternId,
              };
            }
            return elem;
          }
        );
      }
    }
  }

  isAllPatternsSelected(gameId) {
    const { players } = this.gameRounds[gameId];
    console.log('players', players);
    return players.every((player) => player.selectedPattern);
  }

  static randomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  static randomArrayElement(min, max, arrayAvailableCubes) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNum, max, min);
    return arrayAvailableCubes[randomNum];
  }

  static numberOfGivenCubes(numberPlayers) {
    switch (numberPlayers) {
      case 1:
        return 4;
      case 2:
        return 5;
      case 3:
        return 7;
      case 4:
        return 9;
      default:
        return false;
    }
  }

  giveArrayAvailableCubes(gameId) {
    return this.gameRounds[gameId].cubes
      .map((cubes) =>
        new Array(cubes.count).fill('elem').map(() => {
          const number = Rounds.randomDiceNumber();
          return { color: cubes.color, number };
        })
      )
      .flat();
  }

  removeRolledCubes(cubes, gameId) {
    cubes.forEach((cube) => {
      this.gameRounds[gameId].cubes = this.gameRounds[gameId].cubes.map(
        (elem) => {
          if (elem.color === cube.color) {
            return {
              ...elem,
              count: elem.count - 1,
            };
          }
          return elem;
        }
      );
    });
  }

  setReserve(gameId, array) {
    if (this.gameRounds[gameId]) {
      this.gameRounds[gameId].reserve = array;
    } else {
      return null;
    }
  }

  getReserve(gameId) {
    if (this.gameRounds[gameId]) {
      return this.gameRounds[gameId].reserve;
    }
    return null;
  }

  rollTheDice(gameId) {
    const playersCount = this.gameRounds[gameId].players.length;
    const numberOfCubesNeeded = Rounds.numberOfGivenCubes(playersCount);
    const arrayAvailableCubes = this.giveArrayAvailableCubes(gameId);
    const cubes = [];
    console.log(numberOfCubesNeeded);
    while (numberOfCubesNeeded > cubes.length) {
      console.log(numberOfCubesNeeded);
      const randomElement = Rounds.randomArrayElement(
        0,
        arrayAvailableCubes.length - 1,
        arrayAvailableCubes
      );
      console.log(randomElement);
      cubes.push(randomElement);
    }

    this.removeRolledCubes(cubes, gameId);
    this.setReserve(gameId, cubes);
    return cubes;
  }

  static shuffleArray(array) {
    return array
      .map((elem) => [Math.random(), elem])
      .sort()
      .map((elem) => elem[1]);
  }

  setTurnOrder(gameId) {
    const { players } = this.gameRounds[gameId];
    console.log(players);
    let mixedPlayers = Rounds.shuffleArray(players.map(({ id }) => id));
    console.log(mixedPlayers);
    let numberRounds = 10;

    const orderMoves = [];

    while (numberRounds > 0) {
      const arrayPerRound = [];

      mixedPlayers.forEach((player, index) => {
        if (index === mixedPlayers.length - 1) {
          arrayPerRound.push(player, player);
        } else {
          arrayPerRound.push(player);
        }
      });

      mixedPlayers.reverse();

      mixedPlayers.forEach((reversePlayer, index) => {
        if (index) {
          arrayPerRound.push(reversePlayer);
        }
      });

      mixedPlayers.reverse();
      mixedPlayers = mixedPlayers.splice(+1).concat(mixedPlayers);

      orderMoves.push(arrayPerRound);
      numberRounds -= 1;
    }
    this.gameRounds[gameId].playersQueue = orderMoves;
    console.log(orderMoves);
    return orderMoves;
  }

  nextActivePlayer(gameId) {
    if (this.gameRounds[gameId].playersQueue.length > 0) {
      const first = this.gameRounds[gameId].playersQueue[0][0];
      this.gameRounds[gameId].playersQueue[0] =
        this.gameRounds[gameId].playersQueue[0].slice(1);

      if (this.gameRounds[gameId].playersQueue[0].length === 0) {
        this.gameRounds[gameId].playersQueue =
          this.gameRounds[gameId].playersQueue.slice(1);
        if (this.gameRounds[gameId].playersQueue.length > 0) {
          this.nextRound(gameId);
        } else {
          this.gameEnd(gameId);
        }
      }
      this.gameRounds[gameId].activePlayer = first;
      return first;
    }
    return null;
  }

  gameEnd(gameId) {
    this.moveRestCubeToRound(gameId);
    this.gameRounds[gameId].reserve = null;
  }

  moveRestCubeToRound(gameId) {
    const reserve = this.getReserve(gameId);
    this.gameRounds[gameId].rounds = [
      ...this.gameRounds[gameId].rounds,
      reserve[0],
    ];
  }

  nextRound(gameId) {
    this.moveRestCubeToRound(gameId);
    this.rollTheDice(gameId);
  }

  static randomCards(num, array) {
    const arrayRandomElem = [];
    if (num > array.length) {
      return false;
    }

    const arrayNumbers = [];
    do {
      const randomNum = Rounds.getRandomInt(0, array.length - 1);

      if (!arrayNumbers.includes(randomNum)) {
        arrayNumbers.push(randomNum);
      }
    } while (arrayNumbers.length !== num);

    arrayNumbers.forEach((elem) => {
      arrayRandomElem.push(array[elem]);
    });

    console.log(arrayRandomElem);
    return arrayRandomElem;
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setCommonGoals(gameId) {
    const commonGoals = Rounds.randomCards(3, CommonGoals);
    console.log(commonGoals);
    this.gameRounds[gameId].commonGoals = commonGoals;
  }

  getCommonGoals(gameId) {
    console.log(this.gameRounds[gameId].commonGoals);
    return this.gameRounds[gameId].commonGoals;
  }

  setPersonalGoals(gameId) {
    const players = this.getPlayers(gameId);
    const personalGoals = Rounds.randomCards(players.length, PersonalGoals);
    console.log(personalGoals);
    this.gameRounds[gameId].players = this.gameRounds[gameId].players.map(
      (player, index) => {
        return {
          ...player,
          personalGoal: personalGoals[index],
        };
      }
    );
  }
}
const rounds = new Rounds();
// console.log(
//   rounds.addGame(45, [
//     { id: 1, login: 'Вика' },
//     { id: 2, login: 'Вася' },
//     { id: 3, login: 'Петя' },
//     { id: 4, login: 'Даша' },
//   ])
// );
// console.log(rounds.setCommonGoals(45));
// console.log(rounds.getCommonGoals(45));
// console.log(rounds.setPersonalGoals(45));
// console.log(rounds.getPlayers(45));

module.exports = rounds;

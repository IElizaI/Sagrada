class PlayerPatterns {
  // patterns[gameId][playerId] = массив с паттерном
  patterns = {};

  defaultPattern = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  addPlayer(gameId, playerId) {
    const pattern = JSON.parse(JSON.stringify(this.defaultPattern));
    if (this.patterns[gameId]) {
      this.patterns[gameId][playerId] = pattern;
    } else {
      this.patterns[gameId] = { [playerId]: pattern };
    }
  }

  getPattern(gameId, playerId) {
    console.log(gameId, playerId);
    return this.patterns[gameId][playerId];
  }

  getPatterns(gameId) {
    return this.patterns[gameId];
  }

  updatePatternCell(gameId, playerId, cell, value) {
    // cell - первый элемент массива индекс массива, второй - его значение
    // value - {color: 'blue', number: 'one'}
    console.log('-----------', gameId, playerId, cell, value);
    console.log(
      '============',
      this.patterns[gameId][playerId][cell[0]][cell[1]]
    );
    this.patterns[gameId][playerId][cell[0]][cell[1]] = value;
    console.log('these');
    console.log(this.patterns[gameId][playerId][cell[0]][cell[1]]);
  }
}

const patterns = new PlayerPatterns();

// console.log(patterns.addPlayer(3, 2));
// console.log(
//   patterns.updatePatternCell(3, 2, [0, 0], { color: 'blue', number: 'three' })
// );
// console.log(patterns.getPattern(3, 2));

module.exports = patterns;

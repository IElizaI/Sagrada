import { CubeColors } from '../constans/constans';
import { CubeNumbers } from '../constans/constans';

export const countPersonalGoalPoints = (id, pattern) => {
  let color;
  switch (id) {
    case 1:
      color = CubeColors.RED;
      break;
    case 2:
      color = CubeColors.BLUE;
      break;
    case 3:
      color = CubeColors.GREEN;
      break;
    case 4:
      color = CubeColors.PURPLE;
      break;
    case 5:
      color = CubeColors.YELLOW;
      break;
    default:
      break;
  }
  const score = pattern.flat().filter((cube) => cube && cube.color === color);
  return score.length;
};

export const countEmptySpaces = (pattern) => {
  const fine = pattern.flat().filter((cube) => cube === null);
  return fine.length;
};
export const countCommonGoals = (goal, pattern) => {
  switch (goal.id) {
    case 1:
      const scoreCells = [];
      const diagonalIndexses = [
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
      ];
      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
          const cell = pattern[i][j];

          if (!cell) continue;

          const diagonalsCells = diagonalIndexses
            .map(([x, y]) => {
              if (
                i + x > pattern.length - 1 ||
                i + x < 0 ||
                j + y > pattern[i].length - 1 ||
                j + y < 0
              ) {
                return null;
              }
              const diagonalCell = pattern[i + x][j + y];

              return diagonalCell && diagonalCell.color === cell.color
                ? {
                    i: i + x,
                    j: j + y,
                  }
                : null;
            })
            .filter((c) => c);

          const cellIndex = `${i}${j}`;

          if (diagonalsCells.length > 0 && !scoreCells.includes(cellIndex)) {
            scoreCells.push(cellIndex);
          }

          diagonalsCells.forEach((cell) => {
            const index = `${cell.i}${cell.j}`;
            if (!scoreCells.includes(index)) {
              scoreCells.push(index);
            }
          });
        }
      }
      return scoreCells.length;
    case 2:
      const score = [];
      score.push(
        pattern.flat().filter((cube) => {
          return cube && cube.color === CubeColors.RED;
        }).length
      );
      score.push(
        pattern
          .flat()
          .filter((cube) => cube && cube.color === CubeColors.YELLOW).length
      );
      score.push(
        pattern.flat().filter((cube) => cube && cube.color === CubeColors.GREEN)
          .length
      );
      score.push(
        pattern.flat().filter((cube) => cube && cube.color === CubeColors.BLUE)
          .length
      );
      score.push(
        pattern
          .flat()
          .filter((cube) => cube && cube.color === CubeColors.PURPLE).length
      );
      if (score.length === 5) {
        score.sort((a, b) => b - a);
        return score[score.length - 1] * goal.points;
      }
      return 0;
    case 3:
      const columns = pattern[0].length;

      return new Array(columns).fill('').reduce((acc, curr, index) => {
        const columnCells = pattern.map((row) => row[index]);

        const isRightColumns = columnCells.every((c) => c);

        if (!isRightColumns) return acc;

        const colors = [];

        const notRepited = columnCells.every((cell) => {
          if (colors.includes(cell.color)) {
            return false;
          }
          colors.push(cell.color);
          return true;
        });

        if (notRepited) return acc + goal.points;

        return acc;
      }, 0);
    case 4:
      const columnNumbers = pattern[0].length;

      return new Array(columnNumbers).fill('').reduce((acc, curr, index) => {
        const columnCells = pattern.map((row) => row[index]);

        const isRightColumns = columnCells.every((c) => c);

        if (!isRightColumns) return acc;

        const numbers = [];

        const notRepited = columnCells.every((cell) => {
          if (numbers.includes(cell.number)) {
            return false;
          }
          numbers.push(cell.number);
          return true;
        });

        if (notRepited) return acc + goal.points;

        return acc;
      }, 0);
    case 5:
      const five = pattern
        .flat()
        .filter((cube) => cube && cube.number === 5).length;
      const six = pattern
        .flat()
        .filter((cube) => cube && cube.number === 6).length;

      if (!five || !six) {
        return 0;
      }

      if (five > six) {
        const count = five - (five - six);
        return count * 2;
      } else {
        const count = six - (six - five);
        return count * 2;
      }
    case 6:
      const one = pattern
        .flat()
        .filter((cube) => cube && cube.number === 1).length;
      const two = pattern
        .flat()
        .filter((cube) => cube && cube.number === 2).length;

      if (!one || !two) {
        return 0;
      }

      if (one > two) {
        const count = one - (one - two);
        return count * 2;
      } else {
        const count = two - (two - one);
        return count * 2;
      }
    case 7:
      const three = pattern
        .flat()
        .filter((cube) => cube && cube.number === 3).length;
      const four = pattern
        .flat()
        .filter((cube) => cube && cube.number === 4).length;

      if (!three || !four) {
        return 0;
      }

      if (three > four) {
        const count = three - (three - four);
        return count * 2;
      } else {
        const count = four - (four - three);
        return count * 2;
      }
    case 8:
      return pattern.reduce((acc, curr) => {
        const isFullRow = curr.every((cell) => cell);

        if (!isFullRow) return acc;

        const colors = [];

        const notRepited = curr.every((cell) => {
          if (colors.includes(cell.color)) {
            return false;
          }
          colors.push(cell.color);
          return true;
        });

        if (notRepited) return acc + goal.points;

        return acc;
      }, 0);
    case 9:
      return pattern.reduce((acc, curr) => {
        const isFullRow = curr.every((cell) => cell);

        if (!isFullRow) return acc;

        const numbers = [];

        const notRepited = curr.every((cell) => {
          if (numbers.includes(cell.number)) {
            return false;
          }
          numbers.push(cell.number);
          return true;
        });

        if (notRepited) return acc + goal.points;

        return acc;
      }, 0);
    case 10:
      const variabilityArray = [];
      variabilityArray.push(
        pattern.flat().filter((cube) => {
          return cube && cube.number === CubeNumbers.ONE;
        }).length
      );
      variabilityArray.push(
        pattern.flat().filter((cube) => cube && cube.number === CubeNumbers.TWO)
          .length
      );
      variabilityArray.push(
        pattern
          .flat()
          .filter((cube) => cube && cube.number === CubeNumbers.THREE).length
      );
      variabilityArray.push(
        pattern
          .flat()
          .filter((cube) => cube && cube.number === CubeNumbers.FOUR).length
      );
      variabilityArray.push(
        pattern
          .flat()
          .filter((cube) => cube && cube.number === CubeNumbers.FIVE).length
      );
      variabilityArray.push(
        pattern.flat().filter((cube) => cube && cube.number === CubeNumbers.SIX)
          .length
      );
      if (variabilityArray.length === 6) {
        variabilityArray.sort((a, b) => b - a);
        return variabilityArray[variabilityArray.length - 1] * goal.points;
      }
      return 0;
    default:
      return 0;
  }
};

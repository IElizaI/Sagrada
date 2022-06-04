export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomCommonGoals = (num, array) => {
  const arrayRandomCommonGoals = [];
  if (num > array.length) {
    return false;
  }

  const arrayNumbers = [];
  do {
    const randomNum = getRandomInt(0, array.length - 1);

    if (!arrayNumbers.includes(randomNum)) {
      arrayNumbers.push(randomNum);
    }
  } while (arrayNumbers.length !== num);

  arrayNumbers.forEach((elem) => {
    arrayRandomCommonGoals.push(array[elem]);
  });

  return arrayRandomCommonGoals;
};

export const randomPersonalGoal = (array) => {
  const personalGoal = getRandomInt(0, array.length - 1);

  return array[personalGoal];
};

export const checkAvailableCells = () => {
};

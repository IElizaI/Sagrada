const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game_common_goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game }) {
      // define association here
      Game_common_goal.belongsTo(Game, {
        foreignKey: 'gameId',
      });
    }
  }
  Game_common_goal.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Games',
      },
    },
    commonGoalId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Game_common_goal',
    tableName: 'Game_common_goals',
  });
  return Game_common_goal;
};

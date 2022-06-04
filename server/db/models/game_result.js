const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game, Player }) {
      // define association here
      Game_result.belongsTo(Game, {
        foreignKey: 'gameId',
      });
      Game_result.belongsTo(Player, {
        foreignKey: 'playerId',
      });
    }
  }
  Game_result.init({
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
    playerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Players',
      },
    },
    score: {
      type: DataTypes.STRING,
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
    modelName: 'Game_result',
    tableName: 'Game_results',
  });
  return Game_result;
};

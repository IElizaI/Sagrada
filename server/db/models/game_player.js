const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game_player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game, Player }) {
      // define association here
      Game_player.belongsTo(Game, {
        foreignKey: 'gameId',
      });
      Game_player.belongsTo(Player, {
        foreignKey: 'playerId',
      });
    }
  }
  Game_player.init({
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
    modelName: 'Game_player',
    tableName: 'Game_players',
  });
  return Game_player;
};

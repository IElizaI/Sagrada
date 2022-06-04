const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game_players_stained_glass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game, Player }) {
      // define association here
      Game_players_stained_glass.belongsTo(Game, {
        foreignKey: 'gameId',
      });
      Game_players_stained_glass.belongsTo(Player, {
        foreignKey: 'playerId',
      });
    }
  }
  Game_players_stained_glass.init({
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
    stainedGlass: {
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
    modelName: 'Game_players_stained_glass',
    tableName: 'Game_players_stained_glasses',
  });
  return Game_players_stained_glass;
};

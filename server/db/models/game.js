const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Game_common_goal, Game_players_personal_goal, Game_players_stained_glass, Game_player, Game_result, Player,
    }) {
      // define association here
      Game.hasMany(Game_common_goal, {
        foreignKey: 'gameId',
      });
      Game.hasMany(Game_players_personal_goal, {
        foreignKey: 'gameId',
      });
      Game.hasMany(Game_players_stained_glass, {
        foreignKey: 'gameId',
      });
      Game.hasMany(Game_player, {
        foreignKey: 'gameId',
      });
      Game.hasMany(Game_result, {
        foreignKey: 'gameId',
      });
      Game.belongsTo(Player, {
        foreignKey: 'creatorId',
      });
    }
  }
  Game.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    creatorId: {
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
    modelName: 'Game',
    tableName: 'Games',
  });
  return Game;
};

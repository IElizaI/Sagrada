const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    static associate({
      Game, Game_players_personal_goal, Game_players_stained_glass, Game_player, Game_result,
    }) {
      Players.hasMany(Game, {
        foreignKey: 'creatorId',
      });
      Players.hasMany(Game_players_personal_goal, {
        foreignKey: 'playerId',
      });
      Players.hasMany(Game_players_stained_glass, {
        foreignKey: 'playerId',
      });
      Players.hasMany(Game_player, {
        foreignKey: 'playerId',
      });
      Players.hasMany(Game_result, {
        foreignKey: 'playerId',
      });
    }
  }
  Players.init(
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
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
    },
    {
      sequelize,
      modelName: 'Player',
      tableName: 'Players',
    },
  );
  return Players;
};

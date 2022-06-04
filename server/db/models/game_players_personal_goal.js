const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game_players_personal_goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game, Player }) {
      // define association here
      Game_players_personal_goal.belongsTo(Game, {
        foreignKey: 'gameId',
      });
      Game_players_personal_goal.belongsTo(Player, {
        foreignKey: 'playerId',
      });
    }
  }
  Game_players_personal_goal.init({
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
    personalGoalId: {
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
    modelName: 'Game_players_personal_goal',
    tableName: 'Game_players_personal_goals',
  });
  return Game_players_personal_goal;
};

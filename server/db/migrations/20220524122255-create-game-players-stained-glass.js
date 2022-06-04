module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Game_players_stained_glasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
        },
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
        },
      },
      stainedGlass: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Game_players_stained_glasses');
  },
};

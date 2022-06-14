"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("tasks", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			id_user: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			task: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("tasks");
	},
};

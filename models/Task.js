module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define(
		"Task",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			id_user: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			task: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: "tasks",
		}
	);
	return Task;
};

import { DataTypes } from 'sequelize'

export const UserModel = (sequelize: any) => {
	const attributes = {
		ID: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		firstName: { type: DataTypes.STRING, allowNull: true },
		lastName: { type: DataTypes.STRING, allowNull: true },
		email: { type: DataTypes.STRING, allowNull: true },
		password: { type: DataTypes.STRING, allowNull: true },
		role: { type: DataTypes.STRING, allowNull: true },
	}

	return sequelize.define('User', attributes, {
		timestamps: true,
		paranoid: true,
	})
}

export const RoleModel = (sequelize: any) => {
	const attributes = {
		ID: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Name: { type: DataTypes.STRING, allowNull: true },
		CreatedBy: { type: DataTypes.STRING, allowNull: true },
	}

	return sequelize.define('Role', attributes, {
		timestamps: true,
		paranoid: true,
	})
}



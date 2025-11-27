import { DataTypes } from "sequelize";
import { database } from "../config/database.js";



export const Category = database.define('category', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'categories',
    timestamps: true,
    underscored: true
})

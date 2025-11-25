import { DataTypes } from "sequelize";
import { database } from "../config/database.js"



export const Report = database.define('report', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    originLocation: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'origin_location'
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'created_by',
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'reports',
    timestamps: true,
    underscored: true
})
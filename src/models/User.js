import { DataTypes } from "sequelize";
import { database } from '../config/database.js';

export const User = database.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            msg: 'Email alderdy exists'
        },
        validate: {
            isEmail: {
                msg: 'Invalid email'
            }
        }
    },

    passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
});
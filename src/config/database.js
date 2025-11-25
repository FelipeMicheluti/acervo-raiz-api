import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: process.env.NODE_NEW === 'development' ? console.log : false,
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: false
    }
});


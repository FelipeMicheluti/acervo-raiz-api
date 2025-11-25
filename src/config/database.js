import { Sequelize } from 'sequelize';
import { env } from './env.js';


export const database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: env.nodeEnv === 'development' ? console.log : false,
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: false
    }
});


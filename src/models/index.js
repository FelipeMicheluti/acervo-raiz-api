import { database } from '../config/database.js';
import { env } from '../config/env.js';
import { Category } from './Category.js';
import { Report } from './Report.js';
import { User } from './User.js';

export const models = { User, Report, Category };

User.hasMany(Report, {
  foreignKey: 'createdBy',
  as: 'reports'
})

Report.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'user'
})

Category.hasMany(Report, {
  foreignKey: 'categoryId',
  as: 'reports'
})

Report.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
})


if (env.nodeEnv === 'development') {
    database.sync({ alter: true})
    .then(() => console.log('✅ Synchronized models'))
    .catch(error => console.error('❌ Error while synchronizing:', error));
}   

export { database, User, Report};
export default models;
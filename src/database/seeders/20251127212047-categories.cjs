'use strict';

const { v4: uuidv4 } = require('uuid');

const CATEGORY_NAMES = [
    'Lenda Urbana', 
    'Memória Pessoal', 
    'Conto Popular', 
    'História de Família', 
    'Mito Folclórico'
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const categoriesToInsert = CATEGORY_NAMES.map(name => ({
        id: uuidv4(),
        name: name, 
        created_at: new Date(), 
        updated_at: new Date()
    }));

    await queryInterface.bulkInsert('categories', categoriesToInsert);
  },

  async down (queryInterface, Sequelize) {
    // Deleta apenas as categorias criadas por este seeder
    await queryInterface.bulkDelete('categories', { name: CATEGORY_NAMES }, {});
  }
};
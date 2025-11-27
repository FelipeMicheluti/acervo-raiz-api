'use strict'

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      // --- 1. BUSCA DE USUÁRIOS ---
      const users = await queryInterface.sequelize.query(
        "SELECT id, email FROM users WHERE email IN ('admin@relatos.com', 'regular@relatos.com');",
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (users.length < 2) {
        throw new Error('Users not found. Run the users seeder first.');
      }

      // Mapeia IDs de usuário
      const adminUserId = users.find(u => u.email === 'admin@relatos.com').id;
      const regularUserId = users.find(u => u.email === 'regular@relatos.com').id;

      // --- 2. BUSCA DE CATEGORIAS ---
      const categoryNames = [
        'Lenda Urbana', 'Memória Pessoal', 'Conto Popular',
        'História de Família', 'Mito Folclórico'
      ];

      const categories = await queryInterface.sequelize.query(
        "SELECT id, name FROM categories WHERE name IN (:names);",
        {
          replacements: { names: categoryNames },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if (categories.length < categoryNames.length) {
        throw new Error('Categories not found. Run the categories seeder first.');
      }

      // Mapeia IDs de categoria
      const categoryIds = categories.reduce((acc, cat) => {
        // Normaliza o nome para ser usado como chave (Lenda Urbana -> LendaUrbana)
        const key = cat.name.replace(/\s+/g, '');
        acc[key] = cat.id;
        return acc;
      }, {});
      
      // Variáveis auxiliares
      const lendaUrbana = categoryIds["LendaUrbana"];
      const mitoFolclorico = categoryIds["MitoFolclórico"];
      const memoriaPessoal = categoryIds["MemóriaPessoal"];
      const contoPopular = categoryIds["ContoPopular"];
      const historiaFamilia = categoryIds["HistóriadeFamília"];

      // --- 3. INSERÇÃO DE RELATOS ---
      await queryInterface.bulkInsert('reports', [
        {
          id: uuidv4(),
          title: 'A Lenda da Loira do Banheiro',
          content: 'Conta-se que nos banheiros das escolas de São Paulo, uma mulher loira de vestido branco aparece quando alguém a chama três vezes em frente ao espelho.',
          origin_location: 'São Paulo - Capital',
          created_by: adminUserId,
          category_id: lendaUrbana,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'Lobisomem na Estrada Velha',
          content: 'Na década de 80, meu avô jurava ter visto uma criatura meio homem, meio lobo, uivando no pasto da fazenda vizinha. Ele nunca mais andou sozinho à noite.',
          origin_location: 'Araraquara',
          created_by: regularUserId,
          category_id: memoriaPessoal,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'A Mula Sem Cabeça de Ribeirão Preto',
          content: 'Dizem que uma mulher que teve um caso com um padre foi amaldiçoada e se transforma em uma mula que solta fogo pelas narinas todas as quintas-feiras à noite.',
          origin_location: 'Ribeirão Preto',
          created_by: adminUserId,
          category_id: mitoFolclorico,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'O Saci no Sitio do Meu Tio',
          content: 'Meu tio contava que quando era criança no interior de São Carlos, o Saci sempre escondia seu chapéu e deixava nós nos açúcares com um nó impossível.',
          origin_location: 'São Carlos',
          created_by: regularUserId,
          category_id: historiaFamilia,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'O Fantasma do Teatro Municipal',
          content: 'Um técnico de luzes do teatro de Campinas me contou que ouviu passos no palco e viu as luzes piscarem, mesmo com o prédio vazio após o show.',
          origin_location: 'Campinas',
          created_by: adminUserId,
          category_id: lendaUrbana,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'O Boitatá',
          content: 'Uma serpente de fogo que protege as matas e campos. É o espírito das matas que se manifesta para proteger a natureza e afastar quem tenta incendiá-la.',
          origin_location: 'São José dos Campos',
          created_by: regularUserId,
          category_id: mitoFolclorico,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'O Caipora e a Cachaça',
          content: 'Meu bisavô sempre deixava um pouco de fumo e cachaça na beira da mata para acalmar o Caipora antes de caçar. Ele dizia que o ser protegia a caça e espantava os maus espíritos.',
          origin_location: 'Sorocaba',
          created_by: adminUserId,
          category_id: contoPopular,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'O Curupira',
          content: 'Um protetor da floresta com pés virados para trás que confunde caçadores e madeireiros. Sua função é desorientar aqueles que tentam destruir a mata.',
          origin_location: 'Bauru',
          created_by: regularUserId,
          category_id: mitoFolclorico,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'O Caso da Luz Estranha',
          content: 'Eu estava voltando da praia em Santos e vi uma luz muito forte e silenciosa pairando sobre o mar. Não parecia avião nem drone, desapareceu em segundos.',
          origin_location: 'Santos',
          created_by: adminUserId,
          category_id: memoriaPessoal,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          title: 'O Negrinho do Pastoreio',
          content: 'A história de um menino escravo que foi castigado injustamente e depois de morto, aparece ajudando pessoas a encontrarem objetos perdidos, como forma de benevolência divina.',
          origin_location: 'Piracicaba',
          created_by: regularUserId,
          category_id: contoPopular,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    } catch (error) {
      console.error({ error })
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Para ser totalmente independente, deleta todos os relatos criados
    await queryInterface.bulkDelete('reports', null, {})
  }
}
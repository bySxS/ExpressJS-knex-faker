/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('table_name').insert([
    {module_name: 'news', name: 'politics', name_rus: 'Политика'},
    {module_name: 'movies', name: 'fantasy', name_rus: 'Фантастика'}
  ]);
};

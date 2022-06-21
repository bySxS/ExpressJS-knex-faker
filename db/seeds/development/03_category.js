/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //await knex('category_news').del()
  await knex('category_news').insert([
    {name: 'politics', name_rus: 'Политика', url: 'politics'},
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id: 1, name: 'admin', name_rus: 'Администратор'},
    {id: 2, name: 'moderator', name_rus: 'Модератор'},
    {id: 3, name: 'user', name_rus: 'Пользователь'}
  ]);
};

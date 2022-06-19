/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //await knex('users').del()
  await knex('users').insert([
    {nickname: 'Admin', full_name: 'administrator', roles_id: 1, password: '123456', email: 'sxs@gmail.com'}
  ]);
};

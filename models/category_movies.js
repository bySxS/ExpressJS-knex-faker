const { Model } = require('objection');
const {db: knex} = require('../db/db')

Model.knex(knex)

class Category_movies extends Model {
    static get tableName() {
        return 'category_movies';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'name_rus', 'url'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 40 },
                name_rus: { type: 'string', minLength: 1, maxLength: 40 },
                url: { type: 'string', minLength: 0, maxLength: 80 },
            }
        }
    }


    static get relationMappings() {
        const Movies = require('./movies')
        return {
            movies: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movies,
                join: {
                    from: 'category_movies.id',
                    to: 'movies.category_id'
                }
            }
        }
    }
}

module.exports = Category_movies;
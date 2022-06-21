const { Model } = require('objection');
const {db: knex} = require('../db/db')

Model.knex(knex)

class Category_news extends Model {
    static get tableName() {
        return 'category_news';
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
        const News = require('./news')
        return {
            news: {
                relation: Model.BelongsToOneRelation,
                modelClass: News,
                join: {
                    from: 'category_news.id',
                    to: 'news.category_id'
                }
            }
        }
    }
}

module.exports = Category_news;
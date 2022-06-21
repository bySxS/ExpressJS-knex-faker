const { Model } = require('objection');
const {db: knex} = require('../db/db')

Model.knex(knex)

class Roles extends Model {
    static get tableName() {
        return 'roles';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'name_rus'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 40 },
                name_rus: { type: 'string', minLength: 1, maxLength: 40 },
            }
        }
    }

    static get relationMappings() {
        const Users = require('./users')
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'roles.id',
                    to: 'users.roles_id'
                }
            }
        }
    }
}

module.exports = Roles;
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('prompts', (table) => {
        table.increments('id').primary().notNullable();
        table.integer("user_id").unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer("promptseq_id").unsigned().references('promptseqs.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.string("content", 1000).notNullable();
        table.string("label").notNullable();
        table.integer("order").unsigned().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('prompts');
};

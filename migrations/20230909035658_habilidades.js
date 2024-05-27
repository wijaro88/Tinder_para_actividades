/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('habilidades').then((exists) => {
        if (!exists) {
            return knex.schema.createTable("habilidades", function (table) {
                table.increments("id_habilidad").primary();
                table.string("descripción").notNullable();
            });
        }
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

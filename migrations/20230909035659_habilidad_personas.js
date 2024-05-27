/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('habilidad_persona').then((exists) => {
        if (!exists) {
            return knex.schema.createTable("habilidad_personas", function (table) {
              table.increments("id_persona_habilidad").primary();
              table.integer("fk_habilidad_id");
              table.integer("fk_persona_id");
              table.foreign("fk_habilidad_id").references("habilidades.id_habilidad");
              table.foreign("fk_persona_id").references("personas.id_persona");
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

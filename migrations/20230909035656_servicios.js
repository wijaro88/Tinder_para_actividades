/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('servicios').then((exists) => {
        if (!exists) {
            return knex.schema.createTable("servicios", function (table) {
              table.increments("id_servicio").primary();
              table.integer("fk_empresa_id");
              table.integer("fk_persona_id");
              table.string("nombre_servicio").notNullable();
              table.string("descripción").notNullable();
              table.foreign("fk_empresa_id").references("empresa.id");
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

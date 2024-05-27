/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('personas').then((exists) => {
        if (!exists) {
            return knex.schema.createTable("personas", function (table) {
                table.increments("id_persona").primary();
                table.string("nombre_persona").notNullable();
                table.string("apellido_persona").notNullable();
                table.string("email").notNullable();
                table.string("password").notNullable();
                table.string("locacion").notNullable();
                table.decimal("precio_servicio",10,2).notNullable();
                table.string("perfil").notNullable();
                table.integer("calificacion").notNullable();
                table.enum("status",['activo','inactivo']).notNullable();
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

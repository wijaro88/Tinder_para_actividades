/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('empresa').then((exists) => {
        if (!exists) {
            return knex.schema.createTable("empresa", function (table) {
                table.increments("id").primary();
                table.string("nit").notNullable();
                table.string("nombre_empresa").notNullable();
                table.string("direccion").notNullable();
                table.string("email").notNullable();
                table.string("telefono_empresa").notNullable();
                table.enum('estatus', ['activo', 'inactivo']);

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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("servicios", function (table){
        table.integer("horas_contratadas").notNullable().defaultTo(0);
        table.enum("status_persona",['creado','solicitado','asignado','proceso','finalizado']).notNullable().defaultTo('creado');
        table.enum("status_empresa",['creado','solicitado','asignado','proceso','finalizado']).notNullable().defaultTo('creado');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

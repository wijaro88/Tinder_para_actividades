/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("servicios", function (table){
        table.enum("status",['creado','solicitado','asignado','proceso','finalizado']).notNullable().defaultTo('creado');
        table.decimal("anticipo_pagado",10,2);
        table.decimal("por_cobrar",10,2);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

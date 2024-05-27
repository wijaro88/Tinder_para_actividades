// inicando coneccion con bd knex
const connection = require("../knexfile")["development"];

const database = require("knex")(connection);

const createHabilidadPersona = (habil) => {
  return database("habilidad_personas")
    .insert(habil)
    .returning("id_persona_habilidad");
};

const getHabilidadPersonas = (id_persona) => {
  let idPersona = atob(id_persona);
  return database
    .select(
      "personas.id_persona",
      "personas.nombre_persona",
      "habilidades.id_habilidad",
      "habilidades.descripción"
    )
    .from("habilidad_personas")
    .innerJoin(
      "personas",
      "habilidad_personas.fk_persona_id",
      "=",
      "personas.id_persona"
    )
    .innerJoin(
      "habilidades",
      "habilidad_personas.fk_habilidad_id",
      "=",
      "habilidades.id_habilidad"
    )
    .where("personas.id_persona", idPersona);
};

const getHabilidadPersonasPorIdHabilidad = (id_habilidad) => {
  let idHabilidad = atob(id_habilidad);
  return database
    .select(
      "personas.id_persona",
      "personas.nombre_persona",
      "habilidades.id_habilidad",
      "habilidades.descripción"
    )
    .from("habilidad_personas")
    .innerJoin(
      "personas",
      "habilidad_personas.fk_persona_id",
      "=",
      "personas.id_persona"
    )
    .innerJoin(
      "habilidades",
      "habilidad_personas.fk_habilidad_id",
      "=",
      "habilidades.id_habilidad"
    )
    .where("habilidades.id_habilidad", idHabilidad);
};

const getAllHabilidadesPersonas = () => {
  return database.select("*").from("habilidad_personas");
};

const deleteHabilidadPersona = async (idPersona, idHabilidad) => {
  try {
    const habilidad = idHabilidad;
    const persona = idPersona;
    console.log(parseInt(persona));
    console.log(persona);
    const validarHabilidad = await database("habilidad_personas")
      .where({ fk_persona_id: parseInt(persona), fk_habilidad_id: parseInt(habilidad.fk_habilidad_id) })
      .select('fk_habilidad_id')

    if (validarHabilidad.length != 0) {
      await database("habilidad_personas")
        .where({ fk_habilidad_id: parseInt(habilidad.fk_habilidad_id), fk_persona_id: parseInt(persona) })
        .del();
      return `Habilidad ${habilidad.fk_habilidad_id} eliminada correctamente para la persona ${persona}.`;
    }
    else {
      return `No se encontró una habilidad asociada a la persona ${persona}.`;
    }
  } catch (error) {
    throw new Error(`Error al eliminar la habilidad: ${error.message}`);
  }
};


module.exports = {
  createHabilidadPersona,
  getHabilidadPersonas,
  getAllHabilidadesPersonas,
  deleteHabilidadPersona,
  getHabilidadPersonasPorIdHabilidad
};

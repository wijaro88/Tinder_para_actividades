const connection = require("../knexfile")["development"];

const database = require("knex")(connection);

const createHabilidad = (habil) => {
  return database("habilidades").insert(habil).returning("id_habilidad");
};

const getHabilidad = (habil) => {
  let habilidadid = atob(habil);
  console.log("habilidades", habilidadid);
  return database("habilidades").where({ id_habilidad: habilidadid });
};

const getAllHabilidades = () => {
  return database.select("*").from("habilidades");
};
module.exports = {
  createHabilidad,
  getHabilidad,
  getAllHabilidades,
};

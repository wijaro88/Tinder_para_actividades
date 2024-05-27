const connection = require("../knexfile")["development"];

const database = require("knex")(connection);

const validarUser = (persona) => {
  let personaEmail = persona;
  return database("personas").where({ email: personaEmail });
};

const validarEmpresa = (empresa, nit) => {
  let empresaEmail = empresa;
  return database("empresa")
    .where({ email: empresaEmail })
    .orWhere({ nit: nit });
};
const getAllPersonas = () => {
  return database.select("*").from("personas");
};

module.exports = {
  validarUser,
  validarEmpresa,
  getAllPersonas,
};

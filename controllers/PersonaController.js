const PersonaModel = require("../models/Persona.js");


const createPersona = (req, res) => {
  PersonaModel.createPersona(req.body)
    .then((respuesta) => {
      return res.status(201).send({ message: respuesta });
    })
    .catch((error) => {
      return res
        .status(500)
        .send({
          message: "Hubo un error en la creación de la persona, " + error,
        });
    });
};
const updatePersonaInfo = async (req, res) => {
  
  const dataPersona = req.body;
  const idPersona = req.params.id
  
  try {
    const UpdatePersona = await PersonaModel.updatePersonaInfo(idPersona, dataPersona);
    let message = UpdatePersona == 1 ? "Usuario Actualizado Correctamente" : UpdatePersona
    return res.status(200).send({
      ok: true,
      UpPersona: UpdatePersona,
      message: message,
    });
  } catch (error) {
    return res.status(500).send({ message: "Ocurrio un error, " + error });
  }
};
const updatePassword = (req, res) => {
  const idPersona = req.params.id
  const password = req.body
  PersonaModel.updatePassword(idPersona, password)
    .then((respuesta) => {
      if (respuesta == 'la clave actual no coincide') {
        return res.status(401).send({ message: respuesta });
      }else{
        return res.status(201).send({ message: respuesta });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send({
          message: "Hubo un error en el cambio de contraseña, " + error,
        });
    });
};
const getPersona = (req, res) => {
  let persona = btoa(req.params.id);
  PersonaModel.getPersona(persona)
    .then((respuesta) => {
      return res.status(200).send({ message: respuesta });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Ocurrio un error, " + error });
    });
};
const getAllPersonas = (req, res) => {
  PersonaModel.getAllPersonas()
    .then((respuesta) => {
      return res.status(200).send({ message: respuesta });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Ocurrio un error, " + error });
    });
};
module.exports = {
  createPersona,
  getPersona,
  getAllPersonas,
  updatePersonaInfo,
  updatePassword,
};

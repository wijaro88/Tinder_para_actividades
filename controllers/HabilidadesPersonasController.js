const HabilidadPersonaModel = require("../models/HabilidadesPersonas");

const createHabilidadPersona = (req, res) => {
  HabilidadPersonaModel.createHabilidadPersona(req.body)
    .then((respuesta) => {
      return res.status(201).send({ message: respuesta });
    })
    .catch((error) => {
      return res
        .status(500)
        .send({
          message: "Algún error en la creación de la habilidad, " + error,
        });
    });
};
const getHabilidadPersonas = (req, res) => {
  let habilidad = btoa(req.params.id);
  HabilidadPersonaModel.getHabilidadPersonas(habilidad)
    .then((respuesta) => {
      return res.status(201).send({ message: respuesta });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Ocurrio un error,  " + error });
    });
};
const getHabilidadPersonasPorIdHabilidad = (req, res) => {
  let habilidadId = btoa(req.params.id);
  HabilidadPersonaModel.getHabilidadPersonasPorIdHabilidad(habilidadId)
    .then((respuesta) => {
      return res.status(201).send({ message: respuesta });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Ocurrio un error, ayudaaa  " + error });
    });
};
const getAllHabilidadesPersonas = (req, res) => {
  HabilidadPersonaModel.getAllHabilidadesPersonas()
    .then((respuesta) => {
      return res.status(201).send({ message: respuesta });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Ocurrio un error , " + error });
    });
};

const deleteHabilidadPersona = (req, res) => {
  const idPersona = req.params.id;
  const idHabilidadPersona = req.body
  
  HabilidadPersonaModel.deleteHabilidadPersona(idPersona, idHabilidadPersona)
    .then((respuesta) => {
      return res.status(201).send({ message: respuesta })
    })
    .catch((error) => {
      return res.status(500).send({ message: 'no se pueden eliminar habilidades ' + error })
    });
};

module.exports = {
  createHabilidadPersona,
  getHabilidadPersonas,
  getAllHabilidadesPersonas,
  deleteHabilidadPersona,
  getHabilidadPersonasPorIdHabilidad
};

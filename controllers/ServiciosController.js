const ServiciosModel = require("../models/Servicios.js");

const createServicios = (req, res) => {
  ServiciosModel.createServicios(req.body)
    .then((respuesta) => {
      return res.status(201).send({ message: respuesta });
    })
    .catch((error) => {
      return res
        .status(500)
        .send({
          message: "Algún error en la creación de la Servicios, " + error,
        });
    });
};
const getServicios = (req, res) => {
  ServiciosModel.getServicios(req.params.id)
    .then((respuesta) => {
      return res.status(200).send({ message: respuesta });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Ocurrio un error,  " + error });
    });
};
const getAllServicios = (req, res) => {
  ServiciosModel.getAllServicios()
    .then((respuesta) => {
      return res.status(200).send({ message: respuesta });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Ocurrio un error , " + error });
    });
};
const actualizarEstadoServicioEmpresa = async (req, res) => {
  try {
    const respuesta = await ServiciosModel.ActualizarEstatusEmpresa(req.body);
    return res.status(200).json({ message: respuesta });
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return res
      .status(500)
      .json({ message: "Ocurrió un error , " + error.message });
  }
};

const actualizarEstadoServicioPersona = async (req, res) => {
  try {
    const respuesta = await ServiciosModel.ActualizarEstatusPersona(req.body);
    return res.status(200).json({ message: respuesta });
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return res
      .status(500)
      .json({ message: "Ocurrió un error , " + error.message });
  }
};

module.exports = {
  createServicios,
  getServicios,
  getAllServicios,
  actualizarEstadoServicioEmpresa,
  actualizarEstadoServicioPersona,
};

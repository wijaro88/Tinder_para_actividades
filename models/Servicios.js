const connection = require("../knexfile")["development"];

const database = require("knex")(connection);

const createServicios = (Servicios) => {
  return database("servicios").insert(Servicios);
};
const getServicios = (Servicios) => {
  // let Serviciosid = Servicios;
  // console.log('Servicios',Servicios)

  return database
    .select(
      "servicios.id_servicio",
      "personas.id_persona",
      "personas.nombre_persona",
      "personas.precio_servicio",
      "servicios.descripción",
      "empresa.nombre_empresa",
      "servicios.status"
    )
    .from("personas")
    .join("servicios", function () {
      this.on("servicios.fk_persona_id", "=", "personas.id_persona");
    })
    .join("empresa", function () {
      this.on("empresa.id", "=", "servicios.fk_empresa_id");
    })
    .where({ id_servicio: Servicios });
  // .then((respuesta) => {
  //    return respuesta.message[Servicios];,
  // });
};
/*Or const getOneClient = (id) => {
   return database.select('*').from('cliente').where('dni',id);
} */
const getAllServicios = () => {
  return database
    .select(
      "servicios.id_servicio",
      "personas.id_persona",
      "empresa.id",
      "personas.nombre_persona",
      "personas.precio_servicio",
      "servicios.descripción",
      "empresa.nombre_empresa",
      "servicios.status"
    )
    .from("personas")
    .join("servicios", function () {
      this.on("servicios.fk_persona_id", "=", "personas.id_persona");
    })
    .join("empresa", function () {
      this.on("empresa.id", "=", "servicios.fk_empresa_id");
    });
};

const ActualizarEstatusEmpresa = async (data) => {
  try {
    const { id_servicio, status_empresa } = data;
    let estadoServicioEmpresa;
    let estadoServicioPersona;

    console.log(data);
    const resultUpdate = await database("servicios")
      .where({ id_servicio: id_servicio })
      .update({ status_empresa: status_empresa });

    if (resultUpdate.length != 0) {
      estadoServicioEmpresa = await validateStausEmpresa(id_servicio);
      estadoServicioPersona = await validateStausPersona(id_servicio);

      if (
        estadoServicioEmpresa[0].status ==
          estadoServicioEmpresa[0].status_empresa ||
        estadoServicioPersona[0].status ==
          estadoServicioPersona[0].status_persona
      ) {
        console.log("el estado del servicio ya fue actualizado anteriormente");
        return "el estado del servicio ya fue actualizado anteriormente";
      } else if (
        (estadoServicioEmpresa == estadoServicioPersona &&
          estadoServicioEmpresa.status != estadoServicioEmpresa) ||
        estadoServicioPersona.status != estadoServicioPersona
      ) {
        await database("servicios")
          .where({ id_servicio: data.id_servicio })
          .update({ status: status_empresa });
        return "El estado de confirmacion del servicio por la empresa se actualizó correctamente";
      } else {
        console.log("error en validacion multiple");
        throw new Error("error en validacion multiple");
      }
    } else {
      console.log("No se realizó ninguna actualización");
      return "No se realizó ninguna actualización";
    }
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    throw error;
  }
};

const ActualizarEstatusPersona = async (data) => {
  try {
    const { id_servicio, status_persona } = data;
    let estadoServicioEmpresa;
    let estadoServicioPersona;

    console.log(data);
    const resultUpdate = await database("servicios")
      .where({ id_servicio: id_servicio })
      .update({ status_persona: status_persona });

    if (resultUpdate.length != 0) {
      estadoServicioEmpresa = await validateStausEmpresa(id_servicio);
      estadoServicioPersona = await validateStausPersona(id_servicio);

      if (
        estadoServicioEmpresa[0].status ==
          estadoServicioEmpresa[0].status_empresa ||
        estadoServicioPersona[0].status ==
          estadoServicioPersona[0].status_persona
      ) {
        console.log("el estado del servicio ya fue actualizado anteriormente");
        return "el estado del servicio ya fue actualizado anteriormente";
      } else if (
        (estadoServicioEmpresa == estadoServicioPersona &&
          estadoServicioEmpresa.status != estadoServicioEmpresa) ||
        estadoServicioPersona.status != estadoServicioPersona
      ) {
        await database("servicios")
          .where({ id_servicio: data.id_servicio })
          .update({ status: status_persona });
        return "El estado de confirmacion del servicio por la persona se actualizó correctamente";
      } else {
        console.log("error en validacion multiple");
        throw new Error("error en validacion multiple");
      }
    } else {
      console.log("No se realizó ninguna actualización");
      return "No se realizó ninguna actualización";
    }
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    throw error;
  }
};

const validateStausEmpresa = async (idServicio) => {
  return await database("servicios")
    .select("status_empresa", "status")
    .where({ id_servicio: idServicio });
};

const validateStausPersona = async (idServicio) => {
  return await database("servicios")
    .select("status_persona", "status")
    .where({ id_servicio: idServicio });
};

module.exports = {
  createServicios,
  getServicios,
  getAllServicios,
  ActualizarEstatusEmpresa,
  ActualizarEstatusPersona,
};

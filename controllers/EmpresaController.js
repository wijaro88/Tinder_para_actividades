const EmpresaModel = require('../models/Empresa.js');

/**Se crean los controladores getEntidad y createEntidad,
 * donde se leen valores unicos o todos los valores de cada base de datos.
 */
const createEmpresa = (req, res) => {
    EmpresaModel.createEmpresa(req.body)
    .then((respuesta) => {
        return res.status(201).send({ message: respuesta });
    })
    .catch((error) => {
        return res.status(500).send({ message:"Algún error en la creación de la empresa, "+error });
    });
};
const updateEmpresaInfo = async (req,res) => {
    const dataEmpresa = req.body
    const idEmpresa = req.params.id

    try {
        const UpdateEmpresa = await EmpresaModel.updateEmpresaInfo(idEmpresa, dataEmpresa);
        let message = UpdateEmpresa == 1 ? "Empresa Actualizada correctamente" : UpdateEmpresa

        return res.status(200).send({
            ok: true,
            UpEmpresa: UpdateEmpresa,
            message: message,
        });
    } catch (error) {
        return res.status(500).send({ message: "Ocurrio un error, " + error });
    }
};
const updateEmpresaPassword = (req,res) => {
    const idEmpresa = req.params.id;
    const password = req.body;
    EmpresaModel.updateEmpresaPassword(idEmpresa,password)
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
                message:"Hubo un error en el cambio de contraseña, "+error 
            });
    });
};
const getEmpresa = (req, res) => {
    EmpresaModel.getEmpresa(req.params.id)
    .then((respuesta) => {
        return res.status(200).send({ message: respuesta })
    })
    .catch((error) => {
        return res.status(500).send({ message:"Ocurrio un error,  "+error })
    });
};
const getAllEmpresas = (req, res) => {
    EmpresaModel.getAllEmpresas()
    .then((respuesta) => {
        return res.status(200).send({ message: respuesta })
    })
    .catch((error) => {
        return res.status(500).send({ message:"Ocurrio un error , "+error })
    });
};
module.exports = {
    createEmpresa,
    updateEmpresaInfo,
    updateEmpresaPassword,
    getEmpresa,
    getAllEmpresas
}
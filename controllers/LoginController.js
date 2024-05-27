const LoginModel = require("../models/Login");
const PersonaModel = require("../models/Persona");
const EmpresaModel = require("../models/Empresa");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const validarUserCreate = async (req, res) => {
  const { email, password, ...rest } = req.body;
  const dataPersona = req.body;

  try {
    const User = await LoginModel.validarUser(email);
    //console.log(User);
    if (User.length != 0) {
      return res.status(302).send({ message: "El usuario ya Existe" });
    }

    const newUser = await PersonaModel.createPersona(dataPersona);
    return res.status(201).send({
      ok: true,
      User: newUser,
      message: "El usuario fue creado correctamente",
    });
  } catch (error) {
    return res.status(500).send({ message: "Ocurrio un error, " + error });
  }
};

const validarEmpresaCreate = async (req, res) => {
  const { email, nit } = req.body;
  const dataEmpresa = req.body;

  try {
    const Empresa = await LoginModel.validarEmpresa(email, nit);
    //console.log(Empresa);
    if (Empresa.length != 0) {
      return res.status(302).send({ message: "La empresa ya Existe" });
    }

    const newEmpresa = await EmpresaModel.createEmpresa(dataEmpresa);
    return res.status(201).send({
      ok: true,
      Empresa: newEmpresa,
      message: "La empresa fue creada correctamente",
    });
  } catch (error) {
    return res.status(500).send({ message: "Ocurrio un error, " + error });
  }
};




const login = async (req, res) => {
  const { email, type } = req.body;
  const hash = req.body.password;
  let modelo;
  let dbPassword;
  type === "user" ? (modelo = PersonaModel) : (modelo = EmpresaModel);

  try {
    const respuesta = await modelo.BuscarUsuario(email);

    if (!respuesta || respuesta.length == 0) {
      return res.status(404).send({ message: "Credenciales no válidas" });
    }

    dbPassword = respuesta[0].password;

    const passwordMatch = await modelo.validarPassword(hash, dbPassword);

    if (passwordMatch) {
      //console.log("Acceso correcto");
      const tokenKey = process.env.TOKEN_KEY || ''
      
      const token = jwt.sign({email: email, type: type},tokenKey,{expiresIn: "2h"})

      const ndatos = {...respuesta, token}
      //return res.status(200).send({ message: "Acceso Correcto" });
      return res.status(200).json({ ndatos });
    } else {
      return res.status(404).send({ message: "Credenciales no válidas" });
    }
  } catch (error) {
    ///console.error("Ocurrió un error:", error);
    return res.status(500).send({ message: "Ocurrio un error, " + error });
  }
};

module.exports = {
  login,
  validarUserCreate,
  validarEmpresaCreate,
};

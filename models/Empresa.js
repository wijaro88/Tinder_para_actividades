const connection = require("../knexfile")['development'];
const bcrypt = require("bcrypt");

const database = require("knex")(connection);

const createEmpresa = async (empresa) => {
  try {
    let hashPw = empresa.password;

    empresa.password = await encryptPassword(hashPw);
    //console.log(empresa);

    return database("empresa").insert(empresa);
  } catch (error) {}
};
const getEmpresa = (empresa) => {
  let empresaid = empresa;
  // console.log('empresa',empresa)
  return database("empresa").where({ id: empresaid });
  // .then((respuesta) => {
  //    return respuesta.message[empresa];
  // });
};
/*Or const getOneClient = (id) => {
   return database.select('*').from('cliente').where('dni',id);
} */
const getAllEmpresas = (empresa) => {
  return database.select("*").from("empresa");
};

async function encryptPassword(pw) {
  const rounds = 10;
  try {
    const hashPassword = await bcrypt.hash(pw, rounds);
    //console.log(hashPassword)
    return hashPassword;
  } catch (error) {
    console.log(`parece que hay un error: ${error}`);
  }
}

const BuscarUsuario = (usuario) => {
  try {
    let user = usuario;
    return database("empresa").where({ email: user, estatus: "activo" });
  } catch (error) {
    console.log(`parece que hay un error: ${error}`);
  }
};

const validarPassword = async (queryUser, QueryDB) => {
  try {
    const match = await bcrypt.compare(queryUser, QueryDB);
    return match;
  } catch (error) {
    console.error("Error al verificar la contraseña:", error);
    return false;
  }
};
/**La función updateEmpresaInfo permite actualizar la información visible de la persona */
const updateEmpresaInfo = async (id, data) => {
  try {
    const { nit, email, campo, value } = data;
    const id_empresa = id;
    const empresaUpdate = await database("empresa")
      .where({ id: id_empresa, nit: nit , email: email})
      .update({[campo]:value});

      if(empresaUpdate == 0){
        return `res:${empresaUpdate} | ms: no se actualizaron los datos efectivamente`
      }else{
        return empresaUpdate;
      }
  } catch (error){
    console.error("No se actualizaron los datos efectivamente" + error);
    return "No se actualizaron los datos efectivamente"+error;
  }
};
/**La función updateEmpresaPassword se encarga de actualizar la contraseña de la empresa usando su id y la contraseña antigua.
 * Si la contraseña vieja es igual a la contraseña almacenada entonces se actualiza a una nueva contraseña
 */
const updateEmpresaPassword = async (id, data) => {
  try {
    const { password,new_pwd } = data;
    const id_empresa = id;
    const mensaje = "";
      
    const dataEmpresa = await getEmpresa(id_empresa);

    const passwordMatch = await validarPassword(password,dataEmpresa[0].password);
    const newPassword = await encryptPassword(new_pwd);

    if (passwordMatch) {
      const sql = await database("empresa")
        .where({id:id_empresa, password:dataEmpresa[0].password })
        .update({
          password: newPassword,
        });
        console.log(sql);
      return "Contraseña actualizada correctamente"
    } else {
      return "la clave actual no coincide"
    }
  } catch (error){
    console.error("No se realizo la actualización de la contraseña " + error);
    return "No se realizo la actualización de la contraseña";
  }
};

module.exports = {
  createEmpresa,
  getEmpresa,
  getAllEmpresas,
  BuscarUsuario,
  validarPassword,
  updateEmpresaInfo,
  updateEmpresaPassword,
};

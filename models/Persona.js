const connection = require("../knexfile")["development"];
const bcrypt = require("bcrypt");

const database = require("knex")(connection);

const createPersona = async (persona) => {
  try {
    let hashPw = persona.password;

    persona.password = await encryptPassword(hashPw);
    //console.log(persona);

    return database("personas").insert(persona);
  } catch (error) {
    console.log(`parece que hay un error: ${error}`);
  }
};

const getPersona = (persona) => {
  let personaid = atob(persona);
  //console.log('persona',personaid)
  return database("personas").where({ id_persona: personaid }).orderBy('id_persona', 'asc');
};
const getAllPersonas = () => {
  return database.select("*").from("personas");
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
    return database("personas").where({ email: user, status: "activo" });
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
const updatePersonaInfo = async (id, data) => {
  try {
    const {email,campo,value} = data;
    //console.log(campo + ':' +value);
    
    const personatUpdate = await database("personas")
      .where({ id_persona: id, email:email })
      .update({[campo]:value});

      if (personatUpdate == 0) {
        return `res:${personatUpdate} | ms: no se actualizaron los datos efectivamente`
      }else{
        return personatUpdate;
      }
  } catch(error){
    console.error(" no se actualizaron los datos efectivamente "+ error);
    return "no se actualizaron los datos efectivamente" + error;
  }
};
/**La función updatePassword se encarga de actualizar la contraseña del usuario usando su id y la contraseña antigua.
 * Si la contraseña vieja es igual a la contraseña almacenada entonces se actualiza a una nueva contraseña
 */
const updatePassword = async (id, data) => {
  try {
    const { password,new_pwd } = data;
    const id_persona = id;
    const mensaje = "";

    const dataPersona = await getPersona(btoa(id_persona));

    const passwordMatch = await validarPassword(password, dataPersona[0].password);
    const newPassword = await encryptPassword(new_pwd);


    if (passwordMatch) {
      const sql =await database("personas")
        .where({ id_persona: id_persona, password: dataPersona[0].password })
        .update({
        password: newPassword,
      });
      console.log(sql);
    return 'Contraseña actualizada correctamente';
    }else{
      return "la clave actual no coincide";
    }
  } catch (error) {
    console.error("No se realizo la actualización de la contraseña " + error );
    return "No se realizo la actualización de la contraseña";
  }
};

module.exports = {
  createPersona,
  getPersona,
  getAllPersonas,
  BuscarUsuario,
  validarPassword,
  updatePersonaInfo,
  updatePassword,
};

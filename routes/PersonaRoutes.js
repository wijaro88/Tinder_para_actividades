const express = require('express');

const router = express.Router();//yo le digo a donde va a ir, redireccionar el contenido
const {PersonaController} = require('../controllers');
const {validateToken} = require("../services/ValidateTokenService");

//crear
router.post('/', PersonaController.createPersona);

//leer
router.get('/', validateToken, PersonaController.getAllPersonas);
router.get('/:id',validateToken,PersonaController.getPersona);
//actualizar
router.put('/:id', PersonaController.updatePersonaInfo);
router.put('/passwordUpdate/:id', PersonaController.updatePassword);
router.patch('/:id', (req,res) => res.send({message: " Se modificó"}));

//delete
router.delete('/', (req,res) => res.send({message: " Se borró"}));


module.exports = router;
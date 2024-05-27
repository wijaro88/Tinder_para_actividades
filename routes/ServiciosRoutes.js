const express = require('express');

const router = express.Router();//yo le digo a donde va a ir, redireccionar el contenido
const {ServiciosController} = require('../controllers');

//crear
router.post('/', ServiciosController.createServicios);
//leer
router.get('/', ServiciosController.getAllServicios);
router.get('/:id', ServiciosController.getServicios);

//actualizar
router.patch('/empresa', ServiciosController.actualizarEstadoServicioEmpresa);
router.patch('/persona', ServiciosController.actualizarEstadoServicioPersona);
//router.patch('/:id', (req,res) => res.send({message: " Se modificó"}));

//delete
// router.delete('/:id', ServiciosController.deleteServicios); 

module.exports = router;

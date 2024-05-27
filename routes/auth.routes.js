const express = require('express');
const {LoginController} = require('../controllers')

const router = express.Router();


//validar login
router.post('/',LoginController.login);
router.post('/createUser',LoginController.validarUserCreate);
router.post('/createEmpresa',LoginController.validarEmpresaCreate);


module.exports = router;
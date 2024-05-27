const express = require('express');
const router = express.Router();

const EmpresaRoutes = require('./EmpresaRoutes');
const PersonaRoutes = require('./PersonaRoutes');
const HabilidadesRoutes = require('./HabilidadesRoutes');
const ServiciosRoutes = require('./ServiciosRoutes');
const HabilidadesPersonas = require('./HabilidadPersonasRoutes');
const authUsers = require('./auth.routes.js');

router.use('/Empresas', EmpresaRoutes);
router.use('/Personas', PersonaRoutes);
router.use('/Habilidades',HabilidadesRoutes);
router.use('/Servicios', ServiciosRoutes);
router.use('/HabilidadesPersonas',HabilidadesPersonas);
router.use('/Login',authUsers);

module.exports = router;
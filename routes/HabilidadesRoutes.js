const express = require('express');
const { HabilidadesController } = require('../controllers');

const router = express.Router();
//crear
router.post('/', HabilidadesController.createHabilidad);
//leer
router.get('/', HabilidadesController.getAllHabilidades);
router.get('/:id', HabilidadesController.getHabilidad);
//actualizar
router.put('/:id', (req,res) => res.send({message: " Se sustituyó"}));

router.patch('/:id', (req,res) => res.send({message: " Se modificó"}));

//delete
router.delete('/', (req,res) => res.send({message: " Se borró"}));
module.exports = router;
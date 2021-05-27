const express = require('express');
const router = express.Router();

const personaController = require('../controllers/persona.controller');

// get all personas
router.get('/', personaController.getPersonaList);

// post persona nueva
router.post('/', personaController.crearPersona);


// delete persona
router.delete('/:id',personaController.borrarPersona);

// exporto la constante router para que pueda ser usada en los otros archivos
module.exports = router;
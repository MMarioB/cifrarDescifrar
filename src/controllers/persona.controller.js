const PersonaModel = require('../models/persona.model');

// Obtenemos la lista de todos las personas
exports.getPersonaList = (req, res) => {
    PersonaModel.getAllPersonas((err, persona) =>{
        console.log('Aqui estamos!');
        if(err)
        res.send(err);
        console.log('Persona', persona);
        res.send(persona);
    })
}

// Crear una nueva persona
exports.crearPersona = (req,res) =>{
    const personaReqData = new PersonaModel(req.body);
    console.log('PersonaReqData', personaReqData);
    
    // Compruebo si introducen una persona null
    if(req.body.contructor === Object && Object.keys(req.body).length ===0){
        res.send(400).send({success: false, message: 'Por favor rellena todos los campos'});
    } else {
        console.log('Datos correctos');
        PersonaModel.crearPersona(personaReqData, (err, persona)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Persona agregada', data: persona});
        })
    }
}


// Borrar persona
exports.borrarPersona = (req, res)=>{
    PersonaModel.borrarPersona(req.params.id, (err, participante)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Persona deleted successully!'});
    })
}
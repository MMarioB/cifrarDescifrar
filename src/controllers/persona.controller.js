const PersonaModel = require('../models/persona.model');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = "YJAG4xYTTQ0Ke3FBIDgmobERgbi/Tl/LYt9cNmt5w0g=";
//const iv = crypto.randomBytes(16);

// Desencriptar
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
   }

// Obtenemos la lista de todos las personas
exports.getPersonaList = (req, res) => {
    PersonaModel.getAllPersonas((err, persona) =>{
        console.log('Aqui estamos!');
        if(err)
        res.send(err);
        console.log('Persona', persona);
        var cifradoTest = {
            iv: persona[0].iv_test,
            encryptedData: persona[0].test
        }
        console.log(decrypt(cifradoTest));
        var cifradoResultado = {
            iv: persona[0].iv_resultado,
            encryptedData: persona[0].resultado
        }
        console.log(decrypt(cifradoResultado));
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
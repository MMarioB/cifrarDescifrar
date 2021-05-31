var conexion = require('../../config/db.config');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encriptar
function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Desencriptar
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
   }

var Persona = function(persona){
    this.nombre = persona.nombre;
    this.email = persona.email;
    this.iv_test = persona.iv_test;
    this.test = persona.test;
    this.iv_resultado = persona.iv_resultado;
    this.resultado = persona.resultado;
    this.nprueba = persona.nprueba;
}

//get all personas
Persona.getAllPersonas = (result) =>{
    conexion.query('SELECT * FROM personas', (err, res)=>{
        if(err){
            console.log('Error personas', err);
            result(null,err);
        } else {
            console.log('Lista personas');
            result(null,res);
        }
    })
}

//post persona nueva
Persona.crearPersona = (personaReqData, result) =>{
    personaReqData.test = encrypt(personaReqData.test);
    console.log(personaReqData.test.encryptedData);
    personaReqData.iv_test = personaReqData.test.iv;
    personaReqData.test = personaReqData.test.encryptedData;

    personaReqData.resultado = encrypt(personaReqData.resultado);
    console.log(personaReqData.resultado.encryptedData);
    personaReqData.iv_resultado = personaReqData.resultado.iv;
    personaReqData.resultado = personaReqData.resultado.encryptedData;
    conexion.query('INSERT INTO personas SET ? ', personaReqData, (err, res) => {
    
        if(err){
            console.log('Error al añadir persona', err);
            result(null,{status: false, message: err});
        } else {
            console.log('Persona añadido');
            result(null, res);
        }
    })
}

//delete participante
Persona.borrarPersona = (id, result)=>{
    conexion.query('DELETE FROM personas WHERE id_persona=?', [id], (err, res)=>{
        if(err){
            console.log('Error al borrar');
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

module.exports = Persona;
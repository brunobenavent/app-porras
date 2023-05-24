const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRolValido = async(rol ='') =>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error (`El rol ${rol} no está registrado en la base de datos`)
    }
}
//verificar si el correo existe
const emailExiste = async (correo = '')=>{
    const existeEmail =  await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error (`El email ${correo} ya existe en la base de datos`)
    }
} 
//verificar si el usuario existe
const existeUsuarioPorId = async (id)=>{
    const existeUsuario =  await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error (`El usuario ${id} no existe en la base de datos`)
    }
} 


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}
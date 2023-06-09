const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {

    const {limite, desde} = req.query;
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(limite)
        .skip(desde)
        
     ])

    res.json ({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res) => {

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})
    
    // hasear la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)


    // Guardar en DB
    await usuario.save()
    res.json ({
        usuario
    })

}
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body

    //TODO validar conta db
    if(password){
        // hasear la password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto)




    res.json(
        usuario,
    );
}
const usuariosPatch = (req, res = response) => {
    res.json ({
        msg: "patch API - controlador"
    })
}
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id ); 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})


    res.json ({
        usuario
    })
}






module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
const {Router} =require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');




const router = Router();

router.get('/', usuariosGet )
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y contener almenos 6 carácteres').isLength({min:6}),
    check('correo', 'el correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //heck('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROLE']),
    check("rol").custom(rol => esRolValido(rol)),
    validarCampos
], usuariosPost )
router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check("rol").custom(rol => esRolValido(rol)),
    validarCampos
], usuariosPut )
router.patch('/', usuariosPatch)
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete )



module.exports = router;
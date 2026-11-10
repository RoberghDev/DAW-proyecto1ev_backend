const logger = require("../config/logger");

// FUNCIÓN PARA VERIFICAR LOS ROLES DEL USUARIO
// TODO: ponerse de acuerdo entre los roles del usuario
const verificarRol = (...rolesPermitidos) => (req, res, next) => {
    if(!req.usuario){
        logger.error("verificación negativa: no hay usuario autenticado")
        return res.status(401).send("se debe iniciar sesión")
    }

    if(!rolesPermitidos.includes(req.usuario.rol)){
        logger.info("El usuario no tiene permiso para esta acción")
        return res.status(403).send("usuarios sin suficientes permisos")
    }

    logger.info("Usuario verificado correctamente")
    return next()
}

module.exports = { verificarRol }

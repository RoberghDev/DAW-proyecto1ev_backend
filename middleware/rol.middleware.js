const logger = require("../config/logger");

// FUNCIÓN PARA VERIFICAR LOS ROLES DEL USUARIO
// TODO: ponerse de acuerdo entre los roles del usuario
const verificarRol = (...rolesPermitidos) => (req, res, next) => {
    if (!req.usuario) {
        logger.error("Verificación de rol -> verificación negativa: no hay usuario autenticado")
        return res.status(401).send("se debe iniciar sesión")
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
        logger.info("Verificación de rol -> El usuario no tiene permiso para esta acción")
        return res.status(403).send("usuarios sin suficientes permisos")
    }

    logger.info("Verificación de rol -> Usuario verificado correctamente")
    return next()
}

module.exports = { verificarRol }
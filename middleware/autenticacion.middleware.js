const jwt = require("jsonwebtoken")
const logger = require("../config/logger")

const verificarToken = (req, res, next) => {
    const authHeader = req.get("authorization")
    const [esquema, token] = authHeader ? authHeader.split(" ") : []

    if (esquema !== "Bearer" || !token) {
        return res.status(401).send("se requiere un token Bearer válido")
    }

    if (!process.env.JWT_SECRET) {
        logger.error("Falta configurar JWT_SECRET")
        return res.status(500).send("Error de configuración del servidor")
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET)

        if (typeof usuario === "string" || !usuario.rol) {
            return res.status(401).send("token inválido")
        }

        req.usuario = usuario
        return next()
    } catch (error) {
        logger.info(`Token de autenticación inválido: ${error.message}`)
        return res.status(401).send("token inválido o expirado")
    }
}

module.exports = { verificarToken }

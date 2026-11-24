const Usuario = require("../model/usuarios.model");
const logger = require("../config/logger");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// CREAR UN NUEVO USUARIO
const nuevoUsuario = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)

        const nuevoUsuario = new Usuario(
            {
                nombreUsuario   : req.body.nombreUsuario,
                password        : password,
                email           : req.body.email,
                numTlf          : req.body.numTlf,
                rol             : req.body.rol
            }
        )

        await nuevoUsuario.save()
        logger.info("Usuarios Controller -> usuario creado con éxito")
        return res.status(201).send("usuario creado con éxito")

    } catch (error) {
        logger.error(`Usuarios Controller -> Error al crear el usuario: ERROR -> ${error}`);
        return res.status(500).send(`error interno: ERROR -> ${error}`)
    }

}

// LOGIN DEL USUARIO
const login = async (req, res) => {
    try {
        // preparación y comprobación de errores.
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            logger.error("Usuarios Controller -> no se han introducido nombre de usuario y/o contraseña")
            return res.status(400).send("nombre de usuario y contraseña son obligatorios")
        }

        // accicón de login.
        const usuario = await Usuario.findOne({ email }).select("+password")
        const esContrasenaCorrecta = usuario ? await bcrypt.compare(password, usuario.password) : false;

        if (!usuario || !esContrasenaCorrecta) {
            logger.error("Usuarios Controller -> Intento de inicio de sesión con credenciales incorrectas");
            return res.status(401).send("usuario o contraseña incorrectos")
        }

        if (!process.env.JWT_SECRET) {
            logger.error("Usuarios Controller -> Falta configurar JWT_SECRET")
            return res.status(500).send("Error de configuración del servidor")
        }

        // generación de token de firma para el usuario.
        const token = jwt.sign({
            id: usuario._id,
            email: usuario.email,
            rol: usuario.rol
        },
            process.env.JWT_SECRET
            )

        logger.info("Usuarios Controller -> Inicio de sesión correcto");
        return res.status(200).json({
            mensaje: "login correcto",
            token: token,
            username: usuario.nombreUsuario
        })

    } catch (error) {
        logger.error(`Usuarios Controller -> Error al iniciar sesión: ${error}`);
        res.status(500).send("internal server error")
    }
}

module.exports = { nuevoUsuario, login }
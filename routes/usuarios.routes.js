const express = require("express")
const { nuevoUsuario, login } = require("../controller/usuarios.controller")

const router = express.Router()

/**
 * @openapi
 * /api/usuarios/registro:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Registra un usuario
 *     description: La contraseña se cifra antes de guardarse. Si no se indica rol, se asigna USER.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreUsuario
 *               - password
 *               - email
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *                 example: maria.lopez
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Reloj123!
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria.lopez@example.com
 *               numTlf:
 *                 type: string
 *                 example: "600123456"
 *               rol:
 *                 type: string
 *                 enum: [USER, MOD, ADMIN]
 *                 default: USER
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: usuario creado con éxito
 *       500:
 *         description: No se pudo crear el usuario
 */
router.post("/registro", nuevoUsuario)
    
/**
 * @openapi
 * /api/usuarios/login:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Inicia sesión y devuelve un JWT
 *     description: El campo username es obligatorio; nombreUsuario no se utiliza en el login. El JWT no tiene una expiración configurada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             conUsername:
 *               summary: Login con username
 *               value:
 *                 username: maria.lopez
 *                 password: Reloj123!
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: maria.lopez
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Reloj123!
 *     responses:
 *       200:
 *         description: Inicio de sesión correcto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [mensaje, token]
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: login correcto
 *                 token:
 *                   type: string
 *                   description: JWT firmado sin expiración configurada.
 *       400:
 *         description: Faltan el nombre de usuario o la contraseña
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: nombre de usuario y contraseña son obligatorios
 *       401:
 *         description: Nombre de usuario o contraseña incorrectos
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: usuario o contraseña incorrectos
 *       500:
 *         description: Error interno al iniciar sesión
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             examples:
 *               errorInterno:
 *                 value: internal server error
 *               configuracion:
 *                 value: Error de configuración del servidor
 */
router.post("/login", login)

module.exports = router
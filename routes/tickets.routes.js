const express = require("express")
const {
    verTodos,
    verMisTickets,
    crearNuevoTicket,
    eliminarTikets,
    editarTicket
} = require("../controller/tickets.controller")
const {
    verificarUsuarioPorId,
    verificarProductosPorId,
    verificarTicketsPorId
} = require("../middleware/verificaciones.middleware")
const { verificarToken } = require("../middleware/autenticacion.middleware")
const { verificarRol } = require("../middleware/rol.middleware")

const router = express.Router()

/**
 * @openapi
 * /api/tickets/verTodos:
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Lista todos los tickets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 665f1a2b3c4d5e6f7890abcd
 *                   idUsuario:
 *                     type: string
 *                     description: ID de MongoDB del usuario
 *                   idProducto:
 *                     type: string
 *                     description: ID de MongoDB del producto
 *                   incidencia:
 *                     type: string
 *                     example: El reloj se retrasa varios minutos al día
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: No se pudieron obtener los tickets
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: El usuario no tiene permisos para consultar todos los tickets
 */
router.get("/verTodos",
    verificarToken,
    verificarRol("MOD", "ADMIN"),
    verTodos)

/**
 * @openapi
 * /api/tickets/misTickets:
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Lista los tickets del usuario que ha iniciado sesión
 *     description: El usuario se obtiene del token, no de la petición.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets del usuario (vacía si no tiene ninguno)
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: Solo los usuarios con rol USER tienen tickets propios
 *       500:
 *         description: No se pudieron obtener los tickets
 */
router.get("/misTickets",
    verificarToken,
    verificarRol("USER"),
    verMisTickets)

/**
 * @openapi
 * /api/tickets/crearTicket:
 *   post:
 *     tags:
 *       - Tickets
 *     summary: Crea un ticket de incidencia
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - idProducto
 *               - incidencia
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 description: ID de MongoDB del usuario
 *                 example: 665f1a2b3c4d5e6f7890abcd
 *               idProducto:
 *                 type: string
 *                 description: ID de MongoDB del producto
 *                 example: 665f1a2b3c4d5e6f7890abce
 *               incidencia:
 *                 type: string
 *                 example: El reloj se retrasa varios minutos al día
 *     responses:
 *       201:
 *         description: Ticket creado correctamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: nuevo ticket creado
 *       500:
 *         description: No se pudo crear el ticket
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: Solo los usuarios con rol USER pueden crear tickets
 */
router.post("/crearTicket",
    verificarToken,
    verificarRol("USER"),
    verificarUsuarioPorId,
    verificarProductosPorId,
    crearNuevoTicket)

/**
 * @openapi
 * /api/tickets/eliminaUno/{idTicket}:
 *   delete:
 *     tags:
 *       - Tickets
 *     summary: Elimina un ticket por su ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTicket
 *         required: true
 *         description: ID de MongoDB del ticket
 *         schema:
 *           type: string
 *         example: 665f1a2b3c4d5e6f7890abcd
 *     responses:
 *       200:
 *         description: Ticket eliminado correctamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: ticket eliminado con éxito
 *       404:
 *         description: No se encontró el ticket
 *       400:
 *         description: El ID del ticket no es válido
 *       500:
 *         description: No se pudo eliminar el ticket
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: El usuario no tiene permisos para eliminar tickets
 */
router.delete("/eliminaUno/:idTicket",
    verificarToken,
    verificarRol("MOD", "ADMIN"),
    verificarTicketsPorId,
    eliminarTikets)

/**
 * @openapi
 * /api/tickets/editarUno/{idTicket}:
 *   patch:
 *     tags:
 *       - Tickets
 *     summary: Edita el estado de un ticket y/o se lo asigna a quien hace la petición
 *     description: Se puede enviar estado, asignarme o ambos. Con asignarme a true se guarda en idModAsignado el id del token (nunca uno enviado en el body). Cualquier otro campo se ignora.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTicket
 *         required: true
 *         description: ID de MongoDB del ticket
 *         schema:
 *           type: string
 *         example: 665f1a2b3c4d5e6f7890abcd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [abierto, en curso, resuelto, cerrado]
 *                 example: en curso
 *               asignarme:
 *                 type: boolean
 *                 description: true para asignarse el ticket a uno mismo
 *                 example: true
 *     responses:
 *       200:
 *         description: Estado del ticket actualizado. Devuelve el ticket actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 665f1a2b3c4d5e6f7890abcd
 *                 idUsuario:
 *                   type: string
 *                   description: ID de MongoDB del usuario
 *                 idProducto:
 *                   type: string
 *                   description: ID de MongoDB del producto
 *                 idModAsignado:
 *                   type: string
 *                   description: ID de MongoDB del moderador asignado
 *                 incidencia:
 *                   type: string
 *                   example: El reloj se retrasa varios minutos al día
 *                 estado:
 *                   type: string
 *                   enum: [abierto, en curso, resuelto, cerrado]
 *                   example: en curso
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: No se ha indicado ningún cambio, el estado no es válido o el ID del ticket no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El estado indicado no es válido
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: El usuario no tiene permisos para editar tickets
 *       404:
 *         description: No se encontró el ticket
 *       500:
 *         description: No se pudo editar el ticket
 */
router.patch("/editarUno/:idTicket",
    verificarToken,
    verificarRol("MOD", "ADMIN"),
    verificarTicketsPorId,
    editarTicket
)

module.exports = router
const express = require("express")
const {
    verTodos,
    crearNuevoTicket,
    eliminarTikets
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
 */
router.get("/verTodos",
    verificarToken,
    verificarRol("ADMON"),
    verTodos)

/**
 * @openapi
 * /api/tickets/crearTicket:
 *   post:
 *     tags:
 *       - Tickets
 *     summary: Crea un ticket de incidencia
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
 */
router.post("/crearTicket",
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
 *       500:
 *         description: No se pudo eliminar el ticket
 */
router.delete("/eliminaUno/:idTicket",
    verificarToken,
    verificarRol("MOD", "ADMON"),
    verificarTicketsPorId,
    eliminarTikets)

module.exports = router
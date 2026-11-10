const express = require("express")
const {
    listaProductos,
    nuevoProducto,
    eliminarProducto
} = require("../controller/productos.controller")
const {
    verificarUsuarioPorId
} = require("../middleware/verificaciones.middleware")
const { verificarRol } = require("../middleware/rol.middleware")
const { verificarToken } = require("../middleware/autenticacion.middleware")

const router = express.Router()

/**
 * @openapi
 * /api/productos/verTodos:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Lista todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *                   nombreProducto:
 *                     type: string
 *                     example: Reloj automático de acero
 *                   precio:
 *                     type: number
 *                     example: 249.99
 *                   cantidad:
 *                     type: integer
 *                     example: 12
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No se pudieron obtener los productos
 */
router.get("/verTodos",
    listaProductos)

/**
 * @openapi
 * /api/productos/crearProducto:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crea un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - precio
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 default: desconocido
 *                 example: Reloj automático de acero
 *               precio:
 *                 type: number
 *                 minimum: 0
 *                 example: 249.99
 *               cantidad:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 example: 12
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: producto creado correctamente
 *       500:
 *         description: No se pudo crear el producto
 */
router.post("/crearProducto",
    verificarToken,
    verificarRol("MOD", "ADMON"),
    nuevoProducto)

/**
 * @openapi
 * /api/productos/eliminaUno/{idProducto}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Elimina un producto por su ID
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         description: ID de MongoDB del producto
 *         schema:
 *           type: string
 *         example: 665f1a2b3c4d5e6f7890abcd
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: producto eliminado con éxito
 *       404:
 *         description: No se encontró el producto
 *       500:
 *         description: No se pudo borrar el producto
 */
router.delete("/eliminaUno/:idProducto", 
    eliminarProducto)

module.exports = router

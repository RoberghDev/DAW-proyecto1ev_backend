const express = require("express")
const {
    listaProductos,
    nuevoProducto,
    eliminarProducto,
    buscarPorId
} = require("../controller/productos.controller")
const { verificarProductosPorId, verificarUsuarioPorId } = require("../middleware/verificaciones.middleware")
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
 *                   descripcion:
 *                     type: string
 *                     example: Reloj automático de acero
 *                   tipoMovimiento:
 *                     type: string
 *                     example: Automático
 *                   materiales:
 *                     type: string
 *                     example: Acero inoxidable
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
 * /api/productos/{idProducto}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtiene un producto por su ID
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
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 665f1a2b3c4d5e6f7890abcd
 *                 nombreProducto:
 *                   type: string
 *                   example: Reloj automático de acero
 *                 precio:
 *                   type: number
 *                   example: 249.99
 *                 cantidad:
 *                   type: integer
 *                   example: 12
 *                 descripcion:
 *                   type: string
 *                   example: Reloj automático de acero
 *                 tipoMovimiento:
 *                   type: string
 *                   example: Automático
 *                 materiales:
 *                   type: string
 *                   example: Acero inoxidable
 *                 coleccion:
 *                   type: string
 *                   enum: [Esqueleto, Heritage, Marine, Noir, Luna, Origine]
 *                   example: Heritage
 *                 tamañoEsfera:
 *                   type: string
 *                   example: 40mm
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: El ID del producto no es válido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: No se pudo buscar el producto
 */
router.get("/:idProducto",
    verificarProductosPorId,
    buscarPorId
)

/**
 * @openapi
 * /api/productos/crearProducto:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crea un producto
 *     security:
 *       - bearerAuth: []
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
 *               descripcion:
 *                 type: string
 *                 default: sin descripción
 *                 example: Reloj automático de acero
 *               tipoMovimiento:
 *                 type: string
 *                 default: sin información del movimiento
 *                 example: Automático
 *               materiales:
 *                 type: string
 *                 default: sin información del tipo de material
 *                 example: Acero inoxidable
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
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: El usuario no tiene permisos para crear productos
 */
router.post("/crearProducto",
    verificarToken,
    verificarRol("MOD", "ADMIN"),
    nuevoProducto)

/**
 * @openapi
 * /api/productos/eliminarProducto/{idProducto}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Elimina un producto por su ID
 *     security:
 *       - bearerAuth: []
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
 *       400:
 *         description: El ID del producto no es válido
 *       500:
 *         description: No se pudo borrar el producto
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: El usuario no tiene permisos para eliminar productos
 */
router.delete("/eliminarProducto/:idProducto",
    verificarProductosPorId,
    verificarToken,
    verificarRol("MOD", "ADMIN"),
    eliminarProducto)

module.exports = router

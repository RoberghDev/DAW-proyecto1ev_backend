const Usuario = require("../model/usuarios.model")
const Producto = require("../model/productos.model")
const Tiket = require("../model/tickets.model")
const mongoose = require("mongoose");
const logger = require("../config/logger");

// VERIFICA QUE EL USUARIO ES UN USUARIO REAL.
const verificarUsuarioPorId = async (req, res, next) => {
    const idUsuario = req.body?.idUsuario

    if (!mongoose.isValidObjectId(idUsuario)) {
        logger.error("Verificar ID Usuario -> verificación engativa del usuario: ID inválido")
        return res.status(400).send("verificación negativa del usuario: ID inválido")
    }

    try {
        const usuario = await Usuario.findById(idUsuario)

        if (!usuario) {
            logger.error("Verificar ID Usuario -> verificación engativa del usuario: usuario no encontrado")
            return res.status(404).send("verificación engativa del usuario: usuario no encontrado")
        }
        logger.info("usuario verificado")
        return next()

    } catch (error) {
        logger.error(`Verificar ID Usuario -> Error al verificar el usuario: ${error}`)
        return res.status(500).send(`Error al verificar el usuario: ${error}`)
    }
}

// VERIFICA QUE LOS PRODUCTOS SON PRODUCTOS REALES.
const verificarProductosPorId = async (req, res, next) => {
    const productoId = req.params.idProducto || req.body.idProducto

    if (!mongoose.isValidObjectId(productoId)) {
        logger.error("Verificar ID Producto -> verificación negativa del producto: ID inválido")
        return res.status(400).send("verificación negativa del producto: ID inválido")
    }

    try {
        const producto = await Producto.findById(productoId)

        if (!producto) {
            logger.error("Verificar ID Producto -> verificación negativa del producto: Producto no encontrado")
            return res.status(404).send("verificación negativa del producto: Producto no encontrado")
        }

        logger.info("Verificar ID Producto -> Verificación positiva del producto")
        return next()
    } catch (error) {
        logger.error(`Verificar ID Producto -> Error al verificar el producto: ${error}`)
        return res.status(500).send(`Error al verificar el producto: ${error}`)
    }
}

// VERIFICAR QUE LOS TIKETS SON REALES.
const verificarTicketsPorId = async (req, res, next) => {
    const idTicket = req.params.idTicket || req.body?.idTicket

    if(!mongoose.isValidObjectId(idTicket)){
        logger.error("Verificar ID Ticket -> verificación negativa del ticket: ID inválido")
        return res.status(400).send("verificación negativa del ticket: ID inválido")
    }
    try {
        const ticket = await Tiket.findById(idTicket)

        if(!ticket){
            logger.error("Verificar ID Ticket -> verificación negativa del ticket: ID no encontrado")
            return res.status(404).send("verificación negativa del ticket: ID no encontrado")
        }

        logger.info("Verificar ID Ticket -> verificación positiva del ticket")
        return next()

    } catch (error) {
        logger.error(`Verificar ID Ticket -> Error al verificar el ticket: ${error}`)
        return res.status(500).send(`Error al verificar el ticket: ${error}`)
    }
}

module.exports = {
    verificarUsuarioPorId,
    verificarProductosPorId,
    verificarTicketsPorId
}
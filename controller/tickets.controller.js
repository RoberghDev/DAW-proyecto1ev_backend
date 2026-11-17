const Tickets = require("../model/tickets.model");
const logger = require("../config/logger");

// LISTA TODOS LOS TICKETS
const verTodos = async (req, res) => {
    try {
        const resultado = await Tickets.find()
        logger.info(`Ticket Controller -> se han listado ${resultado.length} tickets`)

        return res.status(200).send(resultado)
    } catch (error) {
        logger.error("Ticket Controller -> Error al listar los tickets:", error)
        return res.status(500).json({ error: "No se pudieron obtener los tickets" })
    }
}

// CREAR UN NUEVO TICKET
const crearNuevoTicket = async (req, res) => {
    try {
        const nuevoTicket = new Tickets(
            {
                idUsuario   : req.body.idUsuario,
                idProducto  : req.body.idProducto,
                incidencia  : req.body.incidencia
            }
        )

        await nuevoTicket.save()
        logger.info("Ticket Controller -> nuevo ticket creado")
        return res.status(201).send("nuevo ticket creado")
    } catch (error) {
        logger.error("Ticket Controller -> Error al crear el ticket:", error)
        return res.status(500).json({ error: "No se crear el ticket" })
    }
}

const eliminarTikets = async (req, res) => {
    try {
        const resultado = await Tickets.findByIdAndDelete(req.params.idTicket)

        if(!resultado){
            logger.error("Ticket Controller -> no se ha encontrado el ticket")
            return res.status(404).send("no se ha encontrado el ticket")
        } else {
            logger.info("Ticket Controller -> ticket eliminado con éxito")
            return res.status(200).send("ticket eliminado con éxito")
        }

    } catch (error) {
        logger.error("Ticket Controller -> Error al eliminar el ticket", error)
        return res.status(500).json({ error: "No se eliminar el ticket" })
    }
}

module.exports = { verTodos, crearNuevoTicket, eliminarTikets }
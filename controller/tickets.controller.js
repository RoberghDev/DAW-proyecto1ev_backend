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

// LISTA LOS TICKETS DEL USUARIO QUE HA INICIADO SESIÓN.
// El id sale del token (req.usuario, lo rellena verificarToken), no de la petición:
// así nadie puede pedir los tickets de otro usuario.
const verMisTickets = async (req, res) => {
    try {
        const resultado = await Tickets.find({ idUsuario: req.usuario.id })
        logger.info(`Ticket Controller -> se han listado ${resultado.length} tickets del usuario`)

        return res.status(200).send(resultado)
    } catch (error) {
        logger.error("Ticket Controller -> Error al listar los tickets del usuario:", error)
        return res.status(500).json({ error: "No se pudieron obtener tus tickets" })
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

// EDITAR UN TICKET
// Se pueden cambiar dos cosas, juntas o por separado:
// - estado: el nuevo estado del ticket.
// - asignarme: true → el ticket se asigna a quien hace la petición. El id sale del
//   token (req.usuario.id), nunca del body: así nadie puede asignárselo a otra persona.
const editarTicket = async (req, res) => {
    try {
        const { estado, asignarme } = req.body
        const cambios = {}

        if (estado !== undefined) cambios.estado = estado
        if (asignarme === true) cambios.idModAsignado = req.usuario.id

        if (Object.keys(cambios).length === 0) {
            logger.error("Ticket Controller -> no se ha indicado ningún cambio")
            return res.status(400).json({ error: "Indica el nuevo estado o asignarme: true" })
        }

        const resultado = await Tickets.findByIdAndUpdate(
            req.params.idTicket,
            cambios,
            { new: true, runValidators: true }
        )

        if (!resultado) {
            logger.error("Ticket Controller -> no se ha encontrado el ticket")
            return res.status(404).send("no se ha encontrado el ticket")
        }

        if (cambios.estado) logger.info(`Ticket Controller -> estado del ticket actualizado a "${resultado.estado}"`)
        if (cambios.idModAsignado) logger.info(`Ticket Controller -> ticket asignado al usuario ${req.usuario.id}`)
        return res.status(200).send(resultado)
    } catch (error) {
        if (error.name === "ValidationError") {
            logger.error("Ticket Controller -> estado no válido:", error)
            return res.status(400).json({ error: "El estado indicado no es válido" })
        }
        logger.error("Ticket Controller -> Error al editar el ticket:", error)
        return res.status(500).json({ error: "No se pudo editar el ticket" })
    }
}

module.exports = { verTodos, verMisTickets, crearNuevoTicket, eliminarTikets, editarTicket }
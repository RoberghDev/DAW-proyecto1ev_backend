const { model, Schema } = require("mongoose");

const ticketSchema = new Schema(
    {
        idUsuario: {
            type: Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },
        idProducto: {
            type: Schema.Types.ObjectId,
            ref: "Producto",
            required: true
        },
        incidencia: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)

module.exports = model("Ticket", ticketSchema);
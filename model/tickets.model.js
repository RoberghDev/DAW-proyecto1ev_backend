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
        idModAsignado:{
            type: Schema.Types.ObjectId,
            ref: "Usuario",
            default: null
        },
        incidencia: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "abierto", 
                "en curso", 
                "resuelto",
                "cerrado"
            ],
            default: "abierto"
        },
        // TODO: determinar la última actualización. 
    }, { timestamps: true }
)

module.exports = model("Ticket", ticketSchema);
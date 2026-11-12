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
        // TODO: cambiar cuando determinemos los roles
        // idAgenteAsignado:{
        //     type: Schema.Types.ObjectId,
        //     ref: "Usuario",
        //     required: true
        // },
        incidencia: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true,
            trim: true,
            enum: [ // TODO: determinar si puede ser visto por el usuario
                "abierto", 
                "en curso", 
                "pendiente del cliente",
                "resuelto",
                "cerrado"
            ],
            default: "abierto"
        },
        // TODO: determinar la última actualización. 
    }, { timestamps: true }
)

module.exports = model("Ticket", ticketSchema);
const { model, Schema } = require("mongoose");

const productoSchema = new Schema(
    {
        nombreProducto: {
            type: String,
            required: true,
            default: "desconocido"
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        cantidad: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        descripcion: {
            type: String,
            required: true,
            default: "sin descripción"
        }, 
        tipoMovimiento: {
            type: String,
            required: true,
            default: "sin información del movimiento"
        }, 
        materiales: {
            type: String,
            required: true,
            default: "sin información del tipo de material"
        },
        coleccion: {
            type: String,
            required: true,
            enum: ["Esqueleto", "Heritage", "Marine", "Noir", "Luna", "Origine"]
        },
        tamañoEsfera: {
            type: String,
            required: true
        },
        imagenUrl: { // URL pública de descarga de la foto en Firebase Storage
            type: String,
            trim: true,
            default: ""
        }

    }, { timestamps: true }
)

module.exports = model("Producto", productoSchema);
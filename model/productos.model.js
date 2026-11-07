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
        }
    }, { timestamps: true }
)

module.exports = model("Producto", productoSchema);
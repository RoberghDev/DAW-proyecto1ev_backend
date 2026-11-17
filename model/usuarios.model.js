const { model, Schema } = require("mongoose");

const usuarioSchema = new Schema(
    {
        nombreUsuario: {
            type: String,
            required: true,
            trim: true
        },
        rol: {
            type: String,
            required: true,
            trim: true,
            enum: ["USER", "MOD", "ADMIN"], // TODO: definir los tipos de roles
            default: "USER"
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "el mail no es válido"]
        },
        numTlf: {
            type: String
        }
    }, { timestamps: true }
)

module.exports = model("Usuario", usuarioSchema);
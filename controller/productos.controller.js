const Productos = require("../model/productos.model");
const logger = require("../config/logger");

// LISTA TODOS LOS PRODUCTOS
const listaProductos = async (req, res) => {
    try {
        const resultado = await Productos.find()
        logger.info(`Se han encontrado ${resultado.length} productos`)
        
        return res.status(200).send(resultado)

    } catch (error) {
        logger.error(`Error al mostrar los productos: ${error}`);
		res.status(404).json({ error: "No se pudieron obtener los productos" });
    }
}

// CREAR UN NUEVO PRODUCTO
const nuevoProducto = async (req, res) => {
    try {
        const nuevoProducto = new Productos(
            {
                nombreProducto  : req.body.nombreProducto,
                precio          : req.body.precio,
                cantidad        : req.body.cantidad
            }
        )

        await nuevoProducto.save()
        
        logger.info("producto creado correctamente")
        return res.status(201).send("producto creado correctamente")

    } catch (error) {
        logger.error(`Error al crear el producto: ${error}`);
		res.status(500).json({ error: "No se pudo crear el producto" });
    }
}

// ELIMINAR UN PRODUCTO
const eliminarProducto = async (req, res) => {
    try {
        const resultado = await Productos.findByIdAndDelete(req.params.idProducto)

        if(!resultado){
            logger.error("no se ha encontrado la película")
            return res.status(404).send("no se ha encontrado el producto")
        } else {
            logger.info("producto eliminado con éxito")
            return res.status(200).send("producto eliminado con éxito")
        }

    } catch (error) {
        logger.error(`Error al borrar el producto: ${error}`);
		res.status(500).json({ error: "No se pudo borrar el producto." });
    }
}

module.exports = { listaProductos, nuevoProducto, eliminarProducto }
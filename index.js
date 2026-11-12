const express = require("express");
const mongoose = require("mongoose");
const productosRouter = require("./routes/productos.routes");
const ticketsRouter = require("./routes/tickets.routes")
const usuariosRouter = require("./routes/usuarios.routes")
require('dotenv').config()

// configuración inicial.
const app = express();
const mongoUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/productos", productosRouter);
app.use("/api/tickets", ticketsRouter)
app.use("/api/usuarios", usuariosRouter)

//swagger & logger.
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const logger = require("./config/logger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// verificaciones preconexión.
if (!mongoUrl) {
    logger.error("Falta la variable MONGODB_URL en el archivo .env");
    process.exit(1);
}

// conexión a la BBDD.
mongoose
    .connect(mongoUrl).then(() => {
        logger.info("Conexión con MongoDB establecida")

        app.listen(port, () => {
            logger.info(`App escuchando en puerto => ${port}`)
        })
    })
    .catch((error) => {
        logger.error(`Error al conectar con la base de datos: ${error}`);
    })
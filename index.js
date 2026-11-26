const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const productosRouter = require("./routes/productos.routes");
const ticketsRouter = require("./routes/tickets.routes")
const usuariosRouter = require("./routes/usuarios.routes")
require('dotenv').config()

// configuración inicial.
const app = express();
const mongoUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:4173',
        'https://robergh-dev-daw-proyecto1ev.vercel.app',
    ]
}));

app.use(express.json());
app.use("/api/productos", productosRouter);
app.use("/api/tickets", ticketsRouter)
app.use("/api/usuarios", usuariosRouter)

//swagger & logger.
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const logger = require("./config/logger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// TODO: preguntar que es y si es buena idea tenerlo
// app.get("/api/health", (_req, res) => {
//     res.status(200).json({ status: "ok" });
// });

// verificaciones preconexión.
if (!mongoUrl) {
    logger.error("Falta la variable MONGODB_URL en el archivo .env");
    process.exit(1);
}

// conexión a la BBDD.
mongoose
    .connect(mongoUrl).then(() => {
        logger.info("ADVERTENCIA: este es un proyecto en desarrollo y susceptible de errores.")
        logger.info("-------------------------------------")
        logger.info("Conexión con MongoDB establecida")

        app.listen(port, () => {
            logger.info(`App escuchando en puerto => ${port}`)
            logger.info(`URL -> http://localhost:${port}/api`)
        })
    })
    .catch((error) => {
        logger.error(`Error al conectar con la base de datos: ${error}`);
    })

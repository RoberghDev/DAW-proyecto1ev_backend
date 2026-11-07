const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const logger = require("./config/logger");
const productosRouter = require("./routes/productos.routes");
const usuariosRouter = require("./routes/usuarios.routes");
const ticketsRouter = require("./routes/tickets.routes");

const app = express();

app.use(express.json());

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Comprueba el estado de la API
 *     responses:
 *       200:
 *         description: La API está disponible
 */
app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/usuarios", usuariosRouter);
app.use("/api/productos", productosRouter);
app.use("/api/tickets", ticketsRouter);

app.use((_req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((error, _req, res, next) => {
    logger.error("Error en la solicitud:", error);

    if (res.headersSent) {
        return next(error);
    }

    const status = Number.isInteger(error.status) ? error.status : 500;
    res.status(status).json({
        error: status >= 500 ? "Error interno del servidor" : error.message
    });
});

module.exports = app;

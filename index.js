const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const logger = require("./config/logger");

async function startServer() {
    const mongoUrl = process.env.MONGODB_URL_LOCAL;
    const port = Number(process.env.PORT || 3000);

    if (!mongoUrl) {
        throw new Error("Falta configurar MONGODB_URL_LOCAL en el archivo .env");
    }

    if (!Number.isInteger(port) || port < 0 || port > 65535) {
        throw new Error("PORT debe ser un número entero entre 0 y 65535");
    }

    await mongoose.connect(mongoUrl);
    logger.info("Conexión a MongoDB establecida");

    await new Promise((resolve, reject) => {
        const server = app.listen(port, () => resolve(server));
        server.once("error", reject);
    });

    logger.info(`Servidor escuchando en el puerto ${port}`);
}

if (require.main === module) {
    startServer().catch((error) => {
        logger.error("No se pudo iniciar la aplicación:", error);
        process.exitCode = 1;
    });
}

module.exports = { startServer };
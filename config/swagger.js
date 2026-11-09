const swaggerJsdoc = require("swagger-jsdoc");
const path = require("node:path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de gestión de usuarios, productos y tickets",
            version: "1.0.0",
            description: "Esqueleto de API REST construido con Express y MongoDB."
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
        path.join(__dirname, "../app.js"),
        path.join(__dirname, "../routes/*.routes.js")
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
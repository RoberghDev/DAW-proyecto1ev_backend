# API de gestión de usuarios, productos y tickets

Esqueleto de una API REST con Node.js, Express y MongoDB/Mongoose. Las rutas de usuarios, productos y tickets están preparadas para desarrollar; sus operaciones CRUD todavía no están implementadas.

## Requisitos

- Node.js 20.19 o posterior (requisito de Mongoose 9)
- npm
- MongoDB local o una URI de MongoDB accesible

## Instalación y configuración

```bash
npm install
cp .env.example .env
```

Edita `.env` y configura `MONGODB_URL_LOCAL` y/o `MONGODB_URL`con la URL de tu instancia de MongoDB y `JWT_SECRET` con una clave aleatoria larga para firmar los tokens. No uses el valor de ejemplo en producción ni subas ese archivo al repositorio.

## Ejecución

Modo desarrollo con reinicio automático:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Modo de refresco automático ante cambios

```bash
npx nodemon
```

La aplicación espera a que MongoDB conecte antes de abrir el puerto. El puerto predeterminado es `3000`; se puede cambiar mediante `PORT`.

## Estructura del árbol de directorios

```text
DAW-proyecto1ev_backend/
├── README.md
├── app.js
├── index.js
├── package.json
├── .env.example
├── .env
├── config/
│   ├── logger.js            # configuración del logger
│   └── swagger.js           # configuración de Swagger/OpenAPI
├── controller/
│   ├── productos.controller.js
│   ├── tickets.controller.js
│   └── usuarios.controller.js
├── middleware/
│   ├── autenticacion.middleware.js
│   ├── rol.middleware.js
│   └── verificaciones.middleware.js
├── model/
│   ├── productos.model.js
│   ├── tickets.model.js
│   └── usuarios.model.js
├── resources/
│   └── (carpeta reservada para recursos estáticos o utilidades)
├── routes/
│   ├── productos.routes.js
│   ├── tickets.routes.js
│   └── usuarios.routes.js
└── .git/                    # metadatos git (no forma parte de la lógica de la app)
```

### Descripción de las carpetas

- `config/`: centraliza la configuración de la aplicación, como logging y documentación OpenAPI.
- `controller/`: contiene la lógica de controladores que gestionan las peticiones HTTP.
- `middleware/`: incluye middlewares para autenticación, permisos y validaciones.
- `model/`: define los modelos de datos para usuarios, productos y tickets.
- `routes/`: define las rutas y endpoints de la API.
- `resources/`: espacio preparado para recursos auxiliares o archivos estáticos.
- `app.js` y `index.js`: puntos de entrada de la aplicación.

Este árbol ayuda a mantener una estructura modular y ordenada para el backend.

## Endpoints disponibles

- `GET /api/health`: comprueba que el servidor responde.
- `/api-docs`: documentación OpenAPI.
- `/api/usuarios`, `/api/productos`, `/api/tickets`: prefijos reservados para las rutas que se implementarán.

### Roles y permisos

# ROLES Y PERMISOS

A continuación se detalla la matriz de permisos según el controlador, la acción a realizar y el rol del usuario:

| Controladores | Acciones | USER | MOD | ADMIN |
| :--- | :--- | :---: | :---: | :---: |
| **PRODUCTOS** | Listar productos | SI | SI | SI |
| | Crear productos | NO | SI | SI |
| | Eliminar productos | NO | SI | SI |
| **TICKETS** | Ver todos los tickets | NO | NO | SI |
| | Crear ticket | SI | SI | SI |
| | Eliminar un ticket | NO | SI | SI |
| **USUARIOS** | Registrar nuevo usuario | SI | SI | SI |
| | Login | SI | SI | SI |
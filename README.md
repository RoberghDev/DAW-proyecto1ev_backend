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

Edita `.env` y configura `MONGODB_URL_LOCAL` con la URI de tu instancia de MongoDB y `JWT_SECRET` con una clave aleatoria larga para firmar los tokens. No uses el valor de ejemplo en producción ni subas ese archivo al repositorio.

## Ejecución

Modo desarrollo con reinicio automático:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

La aplicación espera a que MongoDB conecte antes de abrir el puerto. El puerto predeterminado es `3000`; se puede cambiar mediante `PORT`.

## Endpoints disponibles

- `GET /api/health`: comprueba que el servidor responde.
- `/api-docs`: documentación OpenAPI.
- `/api/usuarios`, `/api/productos`, `/api/tickets`: prefijos reservados para las rutas que se implementarán.

## Pruebas

```bash
npm test
```
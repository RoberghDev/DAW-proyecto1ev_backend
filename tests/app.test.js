const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const app = require("../app");

let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test("GET /api/health devuelve el estado correcto", async () => {
    const response = await fetch(`${baseUrl}/api/health`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
});

test("las rutas inexistentes devuelven 404 en JSON", async () => {
    const response = await fetch(`${baseUrl}/no-existe`);

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Ruta no encontrada" });
});

test("Swagger UI está disponible", async () => {
    const response = await fetch(`${baseUrl}/api-docs/`);

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
});

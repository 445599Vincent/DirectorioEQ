import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const enlaces = readFileSync(new URL("../enlaces.js", import.meta.url), "utf8");
const pagina = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const scriptsInternos = [...pagina.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
const aplicacion = scriptsInternos.at(-1)[1];

function cargarDatos() {
  const contexto = vm.createContext({});
  vm.runInContext(`${enlaces}\nthis.__datos = { PROCESOS, AREAS, CLIENTES, GENERALES };`, contexto, {
    filename: "enlaces.js",
  });
  return JSON.parse(JSON.stringify(contexto.__datos));
}

function clonar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

function codigoDeDatos({ PROCESOS, AREAS, CLIENTES, GENERALES }) {
  return `
    const PROCESOS = ${JSON.stringify(PROCESOS)};
    const AREAS = ${JSON.stringify(AREAS)};
    const CLIENTES = ${JSON.stringify(CLIENTES)};
    const GENERALES = ${JSON.stringify(GENERALES)};
  `;
}

function validarIdsUnicos({ AREAS, CLIENTES }) {
  const vistos = new Set();

  for (const entidad of [...AREAS, ...CLIENTES]) {
    assert.ok(!vistos.has(entidad.id), `Identificador repetido: ${entidad.id}`);
    vistos.add(entidad.id);
  }
}

function listarAccesos({ AREAS, CLIENTES, GENERALES }) {
  const listado = GENERALES.map((acceso) => ({ acceso, ubicacion: "Herramientas generales" }));

  for (const entidad of [...AREAS, ...CLIENTES]) {
    for (const grupo of entidad.grupos) {
      for (const acceso of grupo.enlaces) {
        listado.push({ acceso, ubicacion: `${entidad.nombre} / ${grupo.titulo}` });
      }
    }
  }

  return listado;
}

function validarCamposDeEntidades({ AREAS, CLIENTES }) {
  for (const entidad of [...AREAS, ...CLIENTES]) {
    for (const campo of ["id", "nombre", "descripcion", "grupos"]) {
      assert.ok(
        Object.prototype.hasOwnProperty.call(entidad, campo),
        `Campo obligatorio ausente: ${campo}`,
      );
    }

    assert.equal(typeof entidad.id, "string", `El id de ${entidad.nombre} debe ser texto`);
    assert.ok(entidad.id.trim(), `El id de ${entidad.nombre} no puede estar vacío`);
    assert.equal(typeof entidad.nombre, "string", "El nombre debe ser texto");
    assert.ok(entidad.nombre.trim(), "El nombre no puede estar vacío");
    assert.equal(typeof entidad.descripcion, "string", `La descripción de ${entidad.nombre} debe ser texto`);
    assert.ok(entidad.descripcion.trim(), `La descripción de ${entidad.nombre} no puede estar vacía`);
    assert.ok(Array.isArray(entidad.grupos), `Los grupos de ${entidad.nombre} deben ser una lista`);
  }
}

function validarCamposDeAccesos(datos) {
  for (const { acceso, ubicacion } of listarAccesos(datos)) {
    for (const campo of ["nombre", "descripcion", "url", "icono"]) {
      assert.ok(
        Object.prototype.hasOwnProperty.call(acceso, campo),
        `Campo obligatorio ausente en acceso: ${campo}`,
      );
      assert.equal(typeof acceso[campo], "string", `${campo} debe ser texto en ${ubicacion}`);
      if (campo !== "url") assert.ok(acceso[campo].trim(), `${campo} no puede estar vacío en ${ubicacion}`);
    }
  }
}

function validarUrlsUnicas(datos) {
  const vistas = new Map();

  for (const { acceso, ubicacion } of listarAccesos(datos)) {
    if (!acceso.url) continue;
    assert.ok(!vistas.has(acceso.url), `URL repetida en ${vistas.get(acceso.url)} y ${ubicacion}: ${acceso.url}`);
    vistas.set(acceso.url, ubicacion);
  }
}

function validarProcesos({ PROCESOS, AREAS }) {
  const procesosExistentes = new Set(PROCESOS.map(({ id }) => id));
  for (const area of AREAS) {
    assert.ok(procesosExistentes.has(area.proceso), `Proceso inexistente en ${area.nombre}: ${area.proceso}`);
  }
}

function validarEstadosDeClientes({ CLIENTES }) {
  const estadosPermitidos = new Set(["activo", "cerrado"]);
  for (const cliente of CLIENTES) {
    assert.ok(estadosPermitidos.has(cliente.estado), `Estado inválido en ${cliente.nombre}: ${cliente.estado}`);
  }
}

function validarCerradosFueraDelPmo(contenido, clientes) {
  for (const cliente of clientes.filter(({ estado }) => estado === "cerrado")) {
    assert.ok(
      !contenido.includes(cliente.nombre),
      `Cliente cerrado visible en Proyectos Activos: ${cliente.nombre}`,
    );
  }
}

function validarLogos({ CLIENTES }) {
  for (const cliente of CLIENTES.filter(({ logo }) => logo)) {
    const archivo = new URL(`../${cliente.logo}`, import.meta.url);
    assert.ok(existsSync(archivo), `Logo inexistente para ${cliente.nombre}: ${cliente.logo}`);
  }
}

function validarRutasInternas(datos) {
  const rutasExistentes = new Set([
    "",
    "proyectos-cerrados",
    ...datos.AREAS.map(({ id }) => id),
    ...datos.CLIENTES.map(({ id }) => id),
  ]);

  for (const { acceso, ubicacion } of listarAccesos(datos)) {
    if (!acceso.url.startsWith("#/")) continue;
    const ruta = acceso.url.slice(2).split(/[?#]/)[0];
    assert.ok(rutasExistentes.has(ruta), `Ruta interna inexistente en ${ubicacion}: ${acceso.url}`);
  }
}

function validarUrlsSeguras(datos) {
  for (const { acceso, ubicacion } of listarAccesos(datos)) {
    if (!acceso.url || acceso.url.startsWith("#/")) continue;
    assert.ok(acceso.url.startsWith("https://"), `URL externa sin HTTPS en ${ubicacion}: ${acceso.url}`);
  }
}

test("los identificadores de áreas y clientes son únicos", () => {
  const datos = cargarDatos();
  validarIdsUnicos(datos);

  const alterados = clonar(datos);
  alterados.CLIENTES[0].id = alterados.AREAS[0].id;
  assert.throws(() => validarIdsUnicos(alterados), /Identificador repetido/);
});

test("las áreas y los clientes tienen todos sus campos obligatorios", () => {
  const datos = cargarDatos();
  validarCamposDeEntidades(datos);

  for (const campo of ["id", "nombre", "descripcion", "grupos"]) {
    const alterados = clonar(datos);
    delete alterados.AREAS[0][campo];
    assert.throws(() => validarCamposDeEntidades(alterados), new RegExp(`Campo obligatorio ausente: ${campo}`));
  }
});

test("cada acceso tiene nombre, descripción, URL e icono", () => {
  const datos = cargarDatos();
  validarCamposDeAccesos(datos);

  for (const campo of ["nombre", "descripcion", "url", "icono"]) {
    const alterados = clonar(datos);
    delete alterados.AREAS[1].grupos[0].enlaces[0][campo];
    assert.throws(() => validarCamposDeAccesos(alterados), new RegExp(`Campo obligatorio ausente en acceso: ${campo}`));
  }
});

test("las URLs no se repiten", () => {
  const datos = cargarDatos();
  validarUrlsUnicas(datos);

  const alterados = clonar(datos);
  const accesos = listarAccesos(alterados).filter(({ acceso }) => acceso.url);
  accesos[1].acceso.url = accesos[0].acceso.url;
  assert.throws(() => validarUrlsUnicas(alterados), /URL repetida/);
});

test("cada área pertenece a un proceso existente", () => {
  const datos = cargarDatos();
  validarProcesos(datos);

  const alterados = clonar(datos);
  alterados.AREAS[0].proceso = "proceso-inexistente";
  assert.throws(() => validarProcesos(alterados), /Proceso inexistente/);
});

test("cada cliente tiene estado activo o cerrado", () => {
  const datos = cargarDatos();
  validarEstadosDeClientes(datos);

  const alterados = clonar(datos);
  alterados.CLIENTES[0].estado = "pausado";
  assert.throws(() => validarEstadosDeClientes(alterados), /Estado inválido/);
});

test("ningún cliente cerrado aparece en Proyectos Activos del PMO", () => {
  const datos = cargarDatos();
  const vista = abrirRuta("#/pmo");
  validarCerradosFueraDelPmo(vista.contenido, datos.CLIENTES);

  const contenidoAlterado = `${vista.contenido}${datos.CLIENTES.find(({ estado }) => estado === "cerrado").nombre}`;
  assert.throws(
    () => validarCerradosFueraDelPmo(contenidoAlterado, datos.CLIENTES),
    /Cliente cerrado visible en Proyectos Activos/,
  );
});

test("cada logo de cliente existe en la carpeta logos", () => {
  const datos = cargarDatos();
  validarLogos(datos);

  const alterados = clonar(datos);
  alterados.CLIENTES[0].logo = "logos/no-existe.png";
  assert.throws(() => validarLogos(alterados), /Logo inexistente/);
});

test("cada ruta interna lleva a una página existente", () => {
  const datos = cargarDatos();
  validarRutasInternas(datos);

  const alterados = clonar(datos);
  const enlaceInterno = listarAccesos(alterados).find(({ acceso }) => acceso.url.startsWith("#/"));
  enlaceInterno.acceso.url = "#/pagina-inexistente";
  assert.throws(() => validarRutasInternas(alterados), /Ruta interna inexistente/);
});

test("cada URL externa usa HTTPS", () => {
  const datos = cargarDatos();
  validarUrlsSeguras(datos);

  const alterados = clonar(datos);
  const enlaceExterno = listarAccesos(alterados).find(({ acceso }) => acceso.url.startsWith("https://"));
  enlaceExterno.acceso.url = enlaceExterno.acceso.url.replace("https://", "http://");
  assert.throws(() => validarUrlsSeguras(alterados), /URL externa sin HTTPS/);
});

function abrirRuta(hash, busqueda = "", codigoEnlaces = enlaces) {
  const elementos = new Map();
  const volver = { href: "", textContent: "" };

  function elemento(id) {
    if (!elementos.has(id)) {
      elementos.set(id, {
        value: id === "buscar" ? busqueda : "",
        textContent: "",
        innerHTML: "",
        style: {},
        classList: { toggle() {} },
        addEventListener() {},
        querySelectorAll() { return []; },
      });
    }
    return elementos.get(id);
  }

  const contexto = vm.createContext({
    console,
    Date,
    location: { hash },
    window: {
      addEventListener() {},
      scrollTo() {},
    },
    document: {
      getElementById: elemento,
      querySelector(selector) {
        if (selector === ".volver") return volver;
        throw new Error(`Selector no contemplado en la prueba: ${selector}`);
      },
    },
  });

  vm.runInContext(codigoEnlaces, contexto, { filename: "enlaces.js" });
  vm.runInContext(aplicacion, contexto, { filename: "index.html" });

  return {
    contenido: elemento("secciones").innerHTML,
    etiqueta: elemento("portada-etiqueta").textContent,
    portada: elemento("portada-titulo").textContent,
    volver,
  };
}

function tarjetaDe(contenido, id) {
  const coincidencia = contenido.match(new RegExp(`<a class="tarjeta" href="#/${id}">([\\s\\S]*?)</a>`));
  assert.ok(coincidencia, `No se encontró la tarjeta #/${id}`);
  return coincidencia[1];
}

function fijarUrls(espacio, urls) {
  const accesos = espacio.grupos.flatMap(({ enlaces }) => enlaces);
  assert.equal(accesos.length, urls.length, `Cantidad de URLs de prueba incorrecta para ${espacio.id}`);
  accesos.forEach((acceso, indice) => { acceso.url = urls[indice]; });
}

function resumenEsperado(espacio) {
  const accesos = espacio.grupos.flatMap(({ enlaces }) => enlaces);
  if (!accesos.length) return "Sin accesos todavía →";

  const disponibles = accesos.filter(({ url }) => url !== "").length;
  const pendientes = accesos.length - disponibles;
  const partes = [];
  if (disponibles) partes.push(`${disponibles} ${disponibles === 1 ? "disponible" : "disponibles"}`);
  if (pendientes) partes.push(`${pendientes} ${pendientes === 1 ? "pendiente" : "pendientes"}`);
  return `${partes.join(" · ")} →`;
}

test("el contador cubre combinaciones fijas de accesos disponibles y pendientes", () => {
  const datos = cargarDatos();
  fijarUrls(datos.AREAS.find(({ id }) => id === "calidad"), ["https://uno.example", "https://dos.example", ""]);
  fijarUrls(datos.AREAS.find(({ id }) => id === "administrativa-financiera"), ["https://uno.example"]);
  fijarUrls(datos.CLIENTES.find(({ id }) => id === "agroplast"), ["", "", "", "", "", ""]);
  fijarUrls(datos.CLIENTES.find(({ id }) => id === "soluciones-globales"), ["https://uno.example", ""]);

  const codigo = codigoDeDatos(datos);
  const inicio = abrirRuta("#/", "", codigo);
  const pmo = abrirRuta("#/pmo", "", codigo);

  assert.match(tarjetaDe(inicio.contenido, "calidad"), /2 disponibles · 1 pendiente →/);
  assert.match(tarjetaDe(inicio.contenido, "administrativa-financiera"), /1 disponible →/);
  assert.match(tarjetaDe(pmo.contenido, "agroplast"), /6 pendientes →/);
  assert.match(tarjetaDe(pmo.contenido, "soluciones-globales"), /1 disponible · 1 pendiente →/);
  assert.match(tarjetaDe(inicio.contenido, "planificacion"), /Sin accesos todavía →/);
});

test("cada tarjeta muestra el conteo que corresponde a los datos actuales", () => {
  const datos = cargarDatos();
  const inicio = abrirRuta("#/");
  const pmo = abrirRuta("#/pmo");
  const cerrados = abrirRuta("#/proyectos-cerrados");

  for (const area of datos.AREAS) {
    assert.ok(tarjetaDe(inicio.contenido, area.id).includes(resumenEsperado(area)), area.nombre);
  }

  for (const cliente of datos.CLIENTES) {
    const contenido = cliente.estado === "cerrado" ? cerrados.contenido : pmo.contenido;
    assert.ok(tarjetaDe(contenido, cliente.id).includes(resumenEsperado(cliente)), cliente.nombre);
  }
});

test("las tarjetas de clientes muestran su estado y las áreas no", () => {
  const inicio = abrirRuta("#/");
  const pmo = abrirRuta("#/pmo");
  const cerrados = abrirRuta("#/proyectos-cerrados");

  assert.match(
    tarjetaDe(pmo.contenido, "soluciones-globales"),
    /<span class="estado estado-activo">Activo<\/span>/,
  );
  assert.match(
    tarjetaDe(cerrados.contenido, "banco-central"),
    /<span class="estado estado-cerrado">Cerrado<\/span>/,
  );
  assert.doesNotMatch(tarjetaDe(inicio.contenido, "planificacion"), /class="estado/);
});

test("los resultados del buscador conservan la etiqueta del cliente", () => {
  const activo = abrirRuta("#/", "Soluciones Globales");
  const cerrado = abrirRuta("#/", "Banco Central");

  assert.match(tarjetaDe(activo.contenido, "soluciones-globales"), />Activo<\/span>/);
  assert.match(tarjetaDe(cerrado.contenido, "banco-central"), />Cerrado<\/span>/);
});

test("la portada indica si el cliente está activo o cerrado", () => {
  assert.equal(abrirRuta("#/soluciones-globales").etiqueta, "Cliente activo");
  assert.equal(abrirRuta("#/banco-central").etiqueta, "Cliente cerrado");
});

test("el PMO separa los proyectos activos de la página de proyectos cerrados", () => {
  const vista = abrirRuta("#/pmo");

  assert.match(vista.contenido, /Soluciones Globales/);
  assert.doesNotMatch(vista.contenido, /Banco Central|OMP/);
  assert.match(vista.contenido, /href="#\/proyectos-cerrados"/);
});

test("la página Proyectos Cerrados muestra solamente clientes finalizados", () => {
  const vista = abrirRuta("#/proyectos-cerrados");

  assert.equal(vista.portada, "Proyectos Cerrados");
  assert.match(vista.contenido, /Banco Central/);
  assert.match(vista.contenido, /OMP/);
  assert.doesNotMatch(vista.contenido, /Soluciones Globales/);
  assert.equal(vista.volver.href, "#/pmo");
});

test("Banco Central muestra su SharePoint y vuelve a Proyectos Cerrados", () => {
  const vista = abrirRuta("#/banco-central");

  assert.match(vista.contenido, /SharePoint del proyecto/);
  assert.match(vista.contenido, /sites\/BancoCentral\/SitePages\/ProjectHome\.aspx/);
  assert.equal(vista.volver.href, "#/proyectos-cerrados");
});

test("el buscador encuentra Banco Central", () => {
  const vista = abrirRuta("#/", "Banco Central");

  assert.match(vista.contenido, /href="#\/banco-central"/);
});

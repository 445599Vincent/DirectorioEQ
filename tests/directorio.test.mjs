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

function abrirRuta(hash, busqueda = "") {
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

  vm.runInContext(enlaces, contexto, { filename: "enlaces.js" });
  vm.runInContext(aplicacion, contexto, { filename: "index.html" });

  return {
    contenido: elemento("secciones").innerHTML,
    portada: elemento("portada-titulo").textContent,
    volver,
  };
}

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

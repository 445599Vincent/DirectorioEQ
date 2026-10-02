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

// Reemplaza los accesos del espacio por accesos de prueba con esas URLs, para que los
// casos fijos no dependan de cuántos accesos tenga hoy cada área o cliente en enlaces.js.
function fijarUrls(espacio, urls) {
  espacio.grupos = [{
    titulo: "Accesos de prueba",
    enlaces: urls.map((url, indice) => ({
      nombre: `Acceso de prueba ${indice + 1}`,
      descripcion: "Acceso de prueba.",
      url,
      icono: "enlace",
    })),
  }];
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

// --- Inicio de sesión con Supabase (T-008) --------------------------------------
// Estas pruebas no usan la red ni contraseñas reales: la página se ejecuta con un
// cliente de Supabase simulado. La prueba de punta a punta la hace Vincent (T-011).

const SITIO = "https://directorio.eccoqualita.com/";

test("el interruptor de Supabase está apagado y solo lleva datos públicos", () => {
  assert.match(aplicacion, /const SUPABASE = \{\s*activo: false,/);
  assert.match(aplicacion, /url: "https:\/\/yvhractjxuvfjaldhgdo\.supabase\.co"/);
  assert.match(aplicacion, /clavePublica: "sb_publishable_[^"]+"/);
  assert.doesNotMatch(pagina, /sb_secret_|service_role/);
});

test("ya no queda código del inicio de sesión de Microsoft", () => {
  assert.doesNotMatch(pagina, /msal|login\.microsoftonline/i);
  assert.doesNotMatch(pagina, /\bAUTH\b|puedeVer|MIS_ROLES/);
});

// Filas como las que guarda la carga de la T-010 (mismas reglas que supabase/esquema.sql).
function filasDesde({ AREAS, CLIENTES }) {
  const espacios = [];
  const accesos = [];
  const todos = [
    ...AREAS.map((area) => ({ ...area, tipo: "area" })),
    ...CLIENTES.map((cliente) => ({ icono: "cliente", ...cliente, tipo: "cliente" })),
  ];
  todos.forEach((espacio, orden) => {
    const esArea = espacio.tipo === "area";
    espacios.push({
      id: espacio.id,
      tipo: espacio.tipo,
      nombre: espacio.nombre,
      descripcion: espacio.descripcion,
      icono: espacio.icono,
      proceso: esArea ? espacio.proceso : null,
      estado: esArea ? null : espacio.estado,
      logo: espacio.logo || null,
      proyectos_de_clientes: Boolean(espacio.proyectosDeClientes),
      orden,
      rol: esArea ? espacio.id : "pmo",
    });
    espacio.grupos.forEach((grupo, ordenGrupo) => grupo.enlaces.forEach((acceso, ordenAcceso) => {
      accesos.push({
        espacio_id: espacio.id,
        grupo: grupo.titulo,
        orden_grupo: ordenGrupo,
        nombre: acceso.nombre,
        descripcion: acceso.descripcion,
        url: acceso.url,
        icono: acceso.icono,
        orden: ordenAcceso,
      });
    }));
  });
  return { espacios, accesos };
}

function contextoDeAplicacion() {
  const contexto = vm.createContext({
    console,
    location: { hash: "#/" },
    window: { addEventListener() {}, scrollTo() {} },
    document: {
      getElementById: () => ({ value: "", style: {}, classList: { toggle() {} }, addEventListener() {}, querySelectorAll: () => [] }),
      querySelector: () => ({ href: "", textContent: "" }),
    },
  });
  vm.runInContext(enlaces, contexto, { filename: "enlaces.js" });
  vm.runInContext(aplicacion, contexto, { filename: "index.html" });
  return contexto;
}

test("las filas de Supabase se convierten en las mismas AREAS y CLIENTES de enlaces.js", () => {
  const datos = cargarDatos();
  const { espacios, accesos } = filasDesde(datos);
  const contexto = contextoDeAplicacion();

  // Desordenadas a propósito: la conversión debe respetar "orden" y "orden_grupo".
  const convertidos = clonar(contexto.convertirFilas([...espacios].reverse(), [...accesos].reverse()));

  assert.deepEqual(convertidos.AREAS, datos.AREAS);
  assert.deepEqual(convertidos.CLIENTES, datos.CLIENTES.map((cliente) => ({ icono: "cliente", ...cliente })));
});

test("la conversión agrupa los accesos por grupo y marca solo el área del PMO", () => {
  const contexto = contextoDeAplicacion();
  const convertidos = clonar(contexto.convertirFilas(
    [
      { id: "cliente-x", tipo: "cliente", nombre: "Cliente X", descripcion: "", icono: "cliente", proceso: null, estado: "cerrado", logo: "logos/x.png", proyectos_de_clientes: false, orden: 2 },
      { id: "pmo", tipo: "area", nombre: "PMO", descripcion: "Proyectos.", icono: "proyectos", proceso: "operativo", estado: null, logo: null, proyectos_de_clientes: true, orden: 1 },
      { id: "calidad", tipo: "area", nombre: "Calidad", descripcion: "SGC.", icono: "calidad", proceso: "estrategico", estado: null, logo: null, proyectos_de_clientes: false, orden: 0 },
    ],
    [
      { espacio_id: "pmo", grupo: "Segundo", orden_grupo: 1, nombre: "C", descripcion: "", url: "", icono: "enlace", orden: 0 },
      { espacio_id: "pmo", grupo: "Primero", orden_grupo: 0, nombre: "B", descripcion: "", url: "https://b.example", icono: "enlace", orden: 1 },
      { espacio_id: "pmo", grupo: "Primero", orden_grupo: 0, nombre: "A", descripcion: "", url: "https://a.example", icono: "enlace", orden: 0 },
    ],
  ));

  assert.deepEqual(convertidos.AREAS.map(({ id }) => id), ["calidad", "pmo"]);
  assert.equal(convertidos.AREAS[0].proyectosDeClientes, undefined);
  assert.equal(convertidos.AREAS[1].proyectosDeClientes, true);
  assert.deepEqual(convertidos.AREAS[0].grupos, []);
  assert.deepEqual(
    convertidos.AREAS[1].grupos.map(({ titulo, enlaces }) => [titulo, enlaces.map(({ nombre }) => nombre)]),
    [["Primero", ["A", "B"]], ["Segundo", ["C"]]],
  );
  assert.deepEqual(convertidos.CLIENTES, [{
    id: "cliente-x", nombre: "Cliente X", descripcion: "", icono: "cliente", grupos: [],
    logo: "logos/x.png", estado: "cerrado",
  }]);
});

// Datos de ejemplo que entregaría la base a una persona con el área del PMO.
const FILAS_DE_EJEMPLO = {
  espacios: [
    { id: "pmo", tipo: "area", nombre: "Área de prueba PMO", descripcion: "Proyectos.", icono: "proyectos", proceso: "operativo", estado: null, logo: null, proyectos_de_clientes: true, orden: 0 },
    { id: "cliente-prueba", tipo: "cliente", nombre: "Cliente de Prueba", descripcion: "Proyecto en curso.", icono: "cliente", proceso: null, estado: "activo", logo: null, proyectos_de_clientes: false, orden: 1 },
  ],
  accesos: [
    { espacio_id: "pmo", grupo: "Accesos principales", orden_grupo: 0, nombre: "SharePoint de prueba", descripcion: "Sitio.", url: "https://prueba.example", icono: "sharepoint", orden: 0 },
  ],
};

function clienteSupabaseFalso({ sesion = null, filas = FILAS_DE_EJEMPLO, errorDatos = null, errorEntrar = null } = {}) {
  const llamadas = [];
  const sesionDe = (correo) => ({ access_token: "token-de-prueba", user: { email: correo } });
  let sesionActual = sesion;
  const responder = (valor) => Promise.resolve(valor);

  return {
    llamadas,
    auth: {
      getSession() {
        llamadas.push(["getSession"]);
        return responder({ data: { session: sesionActual }, error: null });
      },
      onAuthStateChange() {
        llamadas.push(["onAuthStateChange"]);
        return { data: { subscription: { unsubscribe() {} } } };
      },
      signInWithPassword(credenciales) {
        llamadas.push(["signInWithPassword", credenciales.email]);
        if (errorEntrar) return responder({ data: { session: null, user: null }, error: errorEntrar });
        sesionActual = sesionDe(credenciales.email);
        return responder({ data: { session: sesionActual, user: sesionActual.user }, error: null });
      },
      resetPasswordForEmail(correo, opciones) {
        llamadas.push(["resetPasswordForEmail", correo, opciones]);
        return responder({ data: {}, error: null });
      },
      updateUser(cambios) {
        llamadas.push(["updateUser", Object.keys(cambios)]);
        return responder({ data: { user: sesionActual?.user }, error: null });
      },
      signOut() {
        llamadas.push(["signOut"]);
        sesionActual = null;
        return responder({ error: null });
      },
    },
    from(tabla) {
      llamadas.push(["from", tabla]);
      const resultado = errorDatos
        ? { data: null, error: errorDatos }
        : { data: tabla === "espacios" ? filas.espacios : filas.accesos, error: null };
      const consulta = {
        select: () => consulta,
        order: () => consulta,
        then: (cumplir, fallar) => Promise.resolve(resultado).then(cumplir, fallar),
      };
      return consulta;
    },
  };
}

// Ejecuta la página con el interruptor encendido y el cliente simulado, sin red.
// encender: false deja el interruptor como está en el sitio (apagado), para el modo de prueba.
// almacen: lo que la pestaña ya tiene guardado en sessionStorage.
async function abrirConSupabase({ hash = "#/", search = "", encender = true, almacen = {}, cliente = clienteSupabaseFalso() } = {}) {
  const elementos = new Map();
  const volver = { href: "", textContent: "" };
  const historial = [];

  function elemento(id) {
    if (!elementos.has(id)) {
      const oyentes = {};
      elementos.set(id, {
        id,
        value: "",
        textContent: "",
        innerHTML: "",
        className: "",
        disabled: false,
        style: {},
        classList: { toggle() {} },
        querySelectorAll() { return []; },
        addEventListener(tipo, oyente) { (oyentes[tipo] ||= []).push(oyente); },
        async disparar(tipo) {
          for (const oyente of oyentes[tipo] || []) await oyente({ preventDefault() {} });
          await esperar();
        },
      });
    }
    return elementos.get(id);
  }

  const location = { hash, origin: "https://directorio.eccoqualita.com", pathname: "/", search };
  const sessionStorage = {
    getItem: (clave) => (Object.hasOwn(almacen, clave) ? almacen[clave] : null),
    setItem: (clave, valor) => { almacen[clave] = String(valor); },
    removeItem: (clave) => { delete almacen[clave]; },
  };
  const contexto = vm.createContext({
    console,
    Date,
    setTimeout,
    clearTimeout,
    URLSearchParams,
    location,
    sessionStorage,
    history: { replaceState: (estado, titulo, url) => historial.push(url) },
    window: {
      supabase: { createClient: (url, clave) => { cliente.llamadas.push(["createClient", url, clave]); return cliente; } },
      addEventListener() {},
      scrollTo() {},
    },
    document: {
      getElementById: elemento,
      querySelector(selector) {
        if (selector === ".volver") return volver;
        throw new Error(`Selector no contemplado en la prueba: ${selector}`);
      },
      createElement() { throw new Error("No se debe descargar nada en la prueba"); },
    },
  });

  vm.runInContext(enlaces, contexto, { filename: "enlaces.js" });
  const codigo = encender ? aplicacion.replace(/activo: false,/, "activo: true,") : aplicacion;
  vm.runInContext(codigo, contexto, { filename: "index.html" });
  await esperar();

  return {
    cliente,
    almacen,
    elemento,
    historial,
    contenido: () => elemento("secciones").innerHTML,
    pantalla: () => ({
      directorio: elemento("app").style.display !== "none",
      entrar: elemento("login").style.display === "flex" && elemento("panel-entrar").style.display !== "none",
      nueva: elemento("login").style.display === "flex" && elemento("panel-nueva").style.display !== "none",
    }),
    mensaje: () => elemento("login-mensaje").textContent,
  };
}

// Deja terminar todas las promesas del cliente simulado (responde al instante).
const esperar = () => new Promise((resolver) => setImmediate(resolver));

test("con Supabase encendido y sesión iniciada se dibujan solo las áreas que entrega la base", async () => {
  const vista = await abrirConSupabase({ cliente: clienteSupabaseFalso({ sesion: { user: { email: "persona@ejemplo.com" } } }) });

  assert.deepEqual(vista.pantalla(), { directorio: true, entrar: false, nueva: false });
  assert.match(tarjetaDe(vista.contenido(), "pmo"), /Área de prueba PMO/);
  assert.doesNotMatch(vista.contenido(), /href="#\/calidad"/, "no debe usar las áreas de enlaces.js");
  assert.match(vista.contenido(), /Herramientas generales/);
  assert.match(vista.elemento("sesion").innerHTML, /persona@ejemplo\.com[\s\S]*Cerrar sesión/);
  assert.ok(vista.cliente.llamadas.some(([accion, tabla]) => accion === "from" && tabla === "espacios"));
  assert.ok(vista.cliente.llamadas.some(([accion, tabla]) => accion === "from" && tabla === "accesos"));
});

test("una persona sin áreas asignadas ve un aviso y las herramientas generales", async () => {
  const vista = await abrirConSupabase({
    cliente: clienteSupabaseFalso({ sesion: { user: { email: "sin.areas@ejemplo.com" } }, filas: { espacios: [], accesos: [] } }),
  });

  assert.match(vista.contenido(), /todavía no tiene áreas asignadas/);
  assert.match(vista.contenido(), /Herramientas generales/);
});

test("si Supabase no responde se avisa en vez de mostrar una página vacía", async () => {
  const vista = await abrirConSupabase({
    cliente: clienteSupabaseFalso({ sesion: { user: { email: "persona@ejemplo.com" } }, errorDatos: { message: "Failed to fetch", status: 0 } }),
  });

  assert.match(vista.contenido(), /No pudimos conectar con el directorio/);
  assert.match(vista.contenido(), /Herramientas generales/);
});

test("sin sesión se pide iniciar sesión y se explica un correo o contraseña incorrectos", async () => {
  const vista = await abrirConSupabase({
    cliente: clienteSupabaseFalso({ errorEntrar: { status: 400, code: "invalid_credentials", message: "Invalid login credentials" } }),
  });

  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: true, nueva: false });
  assert.equal(vista.contenido(), "", "no se dibuja nada antes de iniciar sesión");

  vista.elemento("correo").value = "persona@ejemplo.com";
  vista.elemento("contrasena").value = "contraseña-de-prueba";
  await vista.elemento("panel-entrar").disparar("submit");

  assert.equal(vista.mensaje(), "Correo o contraseña incorrectos.");
  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: true, nueva: false });
});

test("al iniciar sesión se carga el directorio desde la base", async () => {
  const vista = await abrirConSupabase();

  vista.elemento("correo").value = "persona@ejemplo.com";
  vista.elemento("contrasena").value = "contraseña-de-prueba";
  await vista.elemento("panel-entrar").disparar("submit");

  assert.deepEqual(vista.pantalla(), { directorio: true, entrar: false, nueva: false });
  assert.match(tarjetaDe(vista.contenido(), "pmo"), /Área de prueba PMO/);
  assert.equal(vista.elemento("contrasena").value, "", "la contraseña no queda escrita en el formulario");
});

test("¿Olvidaste tu contraseña? envía el correo de recuperación hacia el sitio", async () => {
  const vista = await abrirConSupabase();

  vista.elemento("correo").value = "persona@ejemplo.com";
  await vista.elemento("enlace-olvido").disparar("click");

  const llamada = vista.cliente.llamadas.find(([accion]) => accion === "resetPasswordForEmail");
  assert.ok(llamada, "debe pedir el correo de recuperación");
  assert.equal(llamada[1], "persona@ejemplo.com");
  assert.equal(llamada[2].redirectTo, SITIO);
  assert.match(vista.mensaje(), /te llegará un enlace/);
});

test("quien llega desde una invitación crea su contraseña antes de ver el directorio", async () => {
  const vista = await abrirConSupabase({
    hash: "#access_token=token-de-prueba&type=invite",
    cliente: clienteSupabaseFalso({ sesion: { user: { email: "nueva@ejemplo.com" } } }),
  });

  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: false, nueva: true });
  assert.equal(vista.contenido(), "");

  vista.elemento("nueva-1").value = "ClaveDePrueba123";
  vista.elemento("nueva-2").value = "OtraClaveDePrueba";
  await vista.elemento("panel-nueva").disparar("submit");
  assert.equal(vista.mensaje(), "Las dos contraseñas no coinciden.");
  assert.ok(!vista.cliente.llamadas.some(([accion]) => accion === "updateUser"));

  vista.elemento("nueva-2").value = "ClaveDePrueba123";
  await vista.elemento("panel-nueva").disparar("submit");

  assert.ok(vista.cliente.llamadas.some(([accion, campos]) => accion === "updateUser" && campos.includes("password")));
  assert.deepEqual(vista.pantalla(), { directorio: true, entrar: false, nueva: false });
  assert.deepEqual(vista.historial, ["/#/"], "se quitan de la dirección los datos del correo");
});

test("un enlace de correo vencido muestra un aviso claro", async () => {
  const vista = await abrirConSupabase({
    hash: "#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired",
  });

  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: true, nueva: false });
  assert.match(vista.mensaje(), /ya no es válido/);
});

test("cerrar sesión vuelve a la pantalla de inicio y borra lo que se veía", async () => {
  const vista = await abrirConSupabase({ cliente: clienteSupabaseFalso({ sesion: { user: { email: "persona@ejemplo.com" } } }) });

  await vista.elemento("cerrar-sesion").disparar("click");

  assert.ok(vista.cliente.llamadas.some(([accion]) => accion === "signOut"));
  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: true, nueva: false });
  assert.equal(vista.contenido(), "");
});

test("los textos que vienen de la base se escapan antes de mostrarse", async () => {
  const filas = clonar(FILAS_DE_EJEMPLO);
  filas.espacios[0].nombre = '<img src=x onerror="alert(1)">';
  filas.accesos[0].url = "javascript:alert(1)";
  const vista = await abrirConSupabase({
    hash: "#/pmo",
    cliente: clienteSupabaseFalso({ sesion: { user: { email: "persona@ejemplo.com" } }, filas }),
  });

  assert.doesNotMatch(vista.contenido(), /<img src=x/);
  assert.match(vista.contenido(), /&lt;img src=x/);
  assert.doesNotMatch(vista.contenido(), /javascript:/, "una dirección peligrosa no se convierte en enlace");
  assert.match(vista.contenido(), /Enlace pendiente/);

  const inicio = await abrirConSupabase({
    cliente: clienteSupabaseFalso({ sesion: { user: { email: "persona@ejemplo.com" } }, filas }),
  });
  assert.doesNotMatch(inicio.contenido(), /<img src=x/);
  assert.match(tarjetaDe(inicio.contenido(), "pmo"), /&lt;img src=x/);
});

// --- Modo de prueba (T-012): ?prueba=supabase con el interruptor apagado ----------

const usoSupabase = (vista) => vista.cliente.llamadas.some(([accion]) => accion === "createClient");
const avisoDePrueba = (vista) => vista.elemento("modo-prueba").style.display === "";

test("sin el parámetro de prueba el sitio sigue igual que siempre", async () => {
  const vista = await abrirConSupabase({ encender: false });

  assert.ok(!usoSupabase(vista), "no debe conectarse a Supabase");
  assert.deepEqual(vista.pantalla(), { directorio: true, entrar: false, nueva: false });
  assert.equal(vista.contenido(), abrirRuta("#/").contenido, "mismo inicio que con enlaces.js");
  assert.ok(!avisoDePrueba(vista), "no se muestra el aviso de modo de prueba");
  assert.deepEqual(vista.almacen, {}, "no se guarda nada en la pestaña");
});

test("otro valor del parámetro no enciende el modo de prueba", async () => {
  const vista = await abrirConSupabase({ encender: false, search: "?prueba=otra" });

  assert.ok(!usoSupabase(vista));
  assert.deepEqual(vista.pantalla(), { directorio: true, entrar: false, nueva: false });
});

test("con ?prueba=supabase se pide iniciar sesión aunque el interruptor esté apagado", async () => {
  const vista = await abrirConSupabase({ encender: false, search: "?prueba=supabase" });

  assert.match(aplicacion, /const SUPABASE = \{\s*activo: false,/, "el interruptor sigue apagado");
  assert.ok(usoSupabase(vista));
  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: true, nueva: false });
  assert.equal(vista.contenido(), "", "no se dibuja nada antes de iniciar sesión");
  assert.ok(avisoDePrueba(vista), "se muestra el aviso «Modo de prueba»");
  assert.equal(vista.almacen["directorio-modo-prueba"], "1", "la pestaña recuerda el modo");
});

test("la pestaña recuerda el modo de prueba aunque la dirección ya no tenga el parámetro", async () => {
  const vista = await abrirConSupabase({ encender: false, almacen: { "directorio-modo-prueba": "1" } });

  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: true, nueva: false });
  assert.ok(avisoDePrueba(vista));
});

test("en modo de prueba el correo de recuperación regresa con el parámetro", async () => {
  const vista = await abrirConSupabase({ encender: false, search: "?prueba=supabase" });

  vista.elemento("correo").value = "persona@ejemplo.com";
  await vista.elemento("enlace-olvido").disparar("click");

  const llamada = vista.cliente.llamadas.find(([accion]) => accion === "resetPasswordForEmail");
  assert.equal(llamada[2].redirectTo, `${SITIO}?prueba=supabase`);
});

test("al volver de un correo de invitación sin el parámetro se sigue en modo de prueba", async () => {
  const vista = await abrirConSupabase({
    encender: false,
    hash: "#access_token=token-de-prueba&type=invite",
    cliente: clienteSupabaseFalso({ sesion: { user: { email: "nueva@ejemplo.com" } } }),
  });

  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: false, nueva: true });
  assert.ok(avisoDePrueba(vista));
  assert.equal(vista.almacen["directorio-modo-prueba"], "1");
});

test("un enlace de correo vencido sin el parámetro también abre el modo de prueba", async () => {
  const vista = await abrirConSupabase({
    encender: false,
    hash: "#error=access_denied&error_code=otp_expired",
  });

  assert.deepEqual(vista.pantalla(), { directorio: false, entrar: true, nueva: false });
  assert.match(vista.mensaje(), /ya no es válido/);
});

test("con el interruptor encendido no aparece el aviso de prueba y el correo regresa al sitio", async () => {
  const vista = await abrirConSupabase({ search: "?prueba=supabase" });

  assert.ok(!avisoDePrueba(vista));
  vista.elemento("correo").value = "persona@ejemplo.com";
  await vista.elemento("enlace-olvido").disparar("click");
  const llamada = vista.cliente.llamadas.find(([accion]) => accion === "resetPasswordForEmail");
  assert.equal(llamada[2].redirectTo, SITIO);
});

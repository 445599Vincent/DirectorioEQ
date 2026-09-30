import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const enlaces = readFileSync(new URL("../enlaces.js", import.meta.url), "utf8");
const pagina = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const scriptsInternos = [...pagina.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
const aplicacion = scriptsInternos.at(-1)[1];

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
  assert.match(vista.contenido, /OMP/);
  assert.doesNotMatch(vista.contenido, /Banco Central/);
  assert.match(vista.contenido, /href="#\/proyectos-cerrados"/);
});

test("la página Proyectos Cerrados muestra solamente clientes finalizados", () => {
  const vista = abrirRuta("#/proyectos-cerrados");

  assert.equal(vista.portada, "Proyectos Cerrados");
  assert.match(vista.contenido, /Banco Central/);
  assert.doesNotMatch(vista.contenido, /Soluciones Globales|OMP/);
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

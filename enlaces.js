/*
  ENLACES DEL HUB — Ecco Qualitá
  ------------------------------------------------------------------
  Este es el único archivo que hay que editar para agregar, quitar o
  cambiar accesos. El hub tiene tres bloques:

    AREAS      Áreas internas de Ecco Qualitá (según el mapa de procesos).
               Cada área tiene su propia página con grupos de accesos.
    CLIENTES   Proyectos de clientes. Cada cliente tiene su propia página,
               a la que se entra desde el área marcada con
               "proyectosDeClientes: true" (el PMO), no desde el inicio.
    GENERALES  Herramientas que usa todo el equipo (aparecen en el inicio).

  Cada acceso tiene:

    nombre:       lo que ve el colaborador
    descripcion:  una línea corta explicando para qué sirve
    url:          el enlace. Si se deja vacío (""), la tarjeta aparece
                  como "Enlace pendiente" y no se puede abrir.
    icono:        "erp" | "sharepoint" | "proyectos" | "comercial"
                  | "personas" | "calidad" | "planner" | "correo"
                  | "teams" | "nube" | "web" | "enlace" | "gobierno"
                  | "libro" | "portafolio" | "archivo" | "idea"
                  | "engranaje" | "cliente"

  Cada área o cliente tiene además un "id" (sin espacios ni acentos),
  que es lo que aparece en la dirección de su página.
*/

const AREAS = [
  {
    id: "pmo",
    nombre: "Proyectos (PMO)",
    descripcion: "Gobernanza, metodología, portafolio y seguimiento de proyectos.",
    icono: "proyectos",
    proyectosDeClientes: true, // los CLIENTES se muestran dentro de esta área
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint PMO", descripcion: "Sitio completo del Project Management Office.", url: "https://eccoqualita2102.sharepoint.com/sites/PROJECTMANAGEMENTOFFICE", icono: "sharepoint" },
          { nombre: "Planner PMO", descripcion: "Tareas y seguimiento interno del PMO.", url: "https://planner.cloud.microsoft/webui/v1/plan/wXAzHopLUEm4OYE4agY5aWUAC5cU?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
        ],
      },
      {
        titulo: "Contenido del PMO",
        enlaces: [
          { nombre: "Gobernanza PMO", descripcion: "Políticas, roles y lineamientos del PMO.", url: "", icono: "gobierno" },
          { nombre: "Metodología MEQ", descripcion: "Metodología, plantillas y guías de trabajo.", url: "", icono: "libro" },
          { nombre: "Portafolio", descripcion: "Vista general de todos los proyectos.", url: "", icono: "portafolio" },
          { nombre: "Proyectos Activos", descripcion: "Proyectos en ejecución.", url: "", icono: "proyectos" },
          { nombre: "Proyectos Cerrados", descripcion: "Archivo de proyectos finalizados.", url: "", icono: "archivo" },
          { nombre: "Lecciones Aprendidas", descripcion: "Aprendizajes documentados de cada proyecto.", url: "", icono: "idea" },
          { nombre: "Gestión Interna PMO", descripcion: "Organización y documentos internos del PMO.", url: "", icono: "engranaje" },
        ],
      },
    ],
  },
  {
    id: "comercial",
    nombre: "Comercial",
    descripcion: "Ventas, propuestas y seguimiento de oportunidades.",
    icono: "comercial",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint Comercial", descripcion: "Documentos del área comercial.", url: "https://eccoqualita2102.sharepoint.com/sites/ECCOCOMERCIAL", icono: "sharepoint" },
          { nombre: "Planner Comercial", descripcion: "Tareas y seguimiento del área comercial.", url: "https://planner.cloud.microsoft/webui/v1/plan/jynw7IFF90WClrnHUHpE-2UAHols?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "recursos-humanos",
    nombre: "Recursos Humanos",
    descripcion: "Gestión humana: documentos y recursos del equipo.",
    icono: "personas",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint Recursos Humanos", descripcion: "Documentos y recursos de gestión humana.", url: "https://eccoqualita2102.sharepoint.com/sites/RecursosHumanos", icono: "sharepoint" },
          { nombre: "Planner Recursos Humanos", descripcion: "Tareas internas del área.", url: "", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "calidad",
    nombre: "Gestión de Calidad",
    descripcion: "Sistema de Gestión de Calidad: procesos y documentación.",
    icono: "calidad",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint SGC", descripcion: "Gerencia de Calidad: procesos y documentación del SGC.", url: "https://eccoqualita2102.sharepoint.com/sites/GerenciadeCalidadEQ", icono: "sharepoint" },
          { nombre: "Planner Calidad", descripcion: "Tareas internas del área.", url: "", icono: "planner" },
        ],
      },
    ],
  },
];

const CLIENTES = [
  {
    id: "soluciones-globales",
    nombre: "Soluciones Globales",
    descripcion: "Proyecto con el cliente Soluciones Globales.",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del cliente.", url: "", icono: "sharepoint" },
          { nombre: "Planner del proyecto", descripcion: "Tareas y seguimiento del proyecto.", url: "https://planner.cloud.microsoft/webui/v1/plan/IXemCIoX50WH7WRXfwVKnGUADegf?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "omp",
    nombre: "OMP",
    descripcion: "Proyecto con el cliente OMP.",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del cliente.", url: "", icono: "sharepoint" },
          { nombre: "Planner del proyecto", descripcion: "Tareas y seguimiento del proyecto.", url: "https://planner.cloud.microsoft/webui/v1/plan/3GEYzyVz5kGqxsml4hLbRmUAGg0p?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
        ],
      },
    ],
  },
];

const GENERALES = [
  { nombre: "AdmCloud", descripcion: "ERP: facturación, contabilidad e inventario.", url: "https://system.admcloud.net/Login?RedirectUrl=%2F", icono: "erp" },
  { nombre: "Mis planes", descripcion: "Todos los planes y tareas asignadas a ti en Planner.", url: "https://planner.cloud.microsoft/", icono: "planner" },
  { nombre: "Outlook", descripcion: "Correo y calendario.", url: "https://outlook.office.com/", icono: "correo" },
  { nombre: "Teams", descripcion: "Chat, reuniones y llamadas.", url: "https://teams.microsoft.com/", icono: "teams" },
  { nombre: "OneDrive", descripcion: "Tus archivos personales de trabajo.", url: "https://www.microsoft365.com/onedrive", icono: "nube" },
  { nombre: "Sitio web", descripcion: "eccoqualita.com", url: "https://eccoqualita.com/", icono: "web" },
];

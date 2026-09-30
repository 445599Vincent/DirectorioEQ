/*
  ENLACES DEL HUB — Ecco Qualitá
  ------------------------------------------------------------------
  Este es el único archivo que hay que editar para agregar, quitar o
  cambiar accesos. Cada acceso tiene:

    nombre:       lo que ve el colaborador
    descripcion:  una línea corta explicando para qué sirve
    url:          el enlace. Si se deja vacío (""), la tarjeta aparece
                  como "Enlace pendiente" y no se puede abrir.
    icono:        "erp" | "sharepoint" | "proyectos" | "comercial"
                  | "personas" | "calidad" | "planner" | "correo"
                  | "teams" | "nube" | "web" | "enlace"

  Para agregar un acceso, copia una línea { ... }, y pégala dentro de
  la sección que corresponda.
*/

const SECCIONES = [
  {
    titulo: "Sistemas",
    subtitulo: "Gestión y administración",
    enlaces: [
      { nombre: "AdmCloud", descripcion: "ERP: facturación, contabilidad e inventario.", url: "https://system.admcloud.net/Login?RedirectUrl=%2F", icono: "erp" },
    ],
  },
  {
    titulo: "SharePoint",
    subtitulo: "Documentos y sitios de equipo",
    enlaces: [
      { nombre: "PMO", descripcion: "Project Management Office: proyectos y seguimiento.", url: "https://eccoqualita2102.sharepoint.com/sites/PROJECTMANAGEMENTOFFICE", icono: "proyectos" },
      { nombre: "Comercial", descripcion: "Documentos del área comercial.", url: "https://eccoqualita2102.sharepoint.com/sites/ECCOCOMERCIAL", icono: "comercial" },
      { nombre: "Recursos Humanos", descripcion: "Documentos y recursos de gestión humana.", url: "https://eccoqualita2102.sharepoint.com/sites/RecursosHumanos", icono: "personas" },
      { nombre: "Sistema de Gestión de Calidad", descripcion: "Gerencia de Calidad: procesos y documentación del SGC.", url: "https://eccoqualita2102.sharepoint.com/sites/GerenciadeCalidadEQ", icono: "calidad" },
    ],
  },
  {
    titulo: "Planner",
    subtitulo: "Tareas y seguimiento",
    enlaces: [
      { nombre: "Mis planes", descripcion: "Todos los planes y tareas asignadas a ti.", url: "https://planner.cloud.microsoft/", icono: "planner" },
      { nombre: "Plan Comercial", descripcion: "Tareas y seguimiento del área comercial.", url: "https://planner.cloud.microsoft/webui/v1/plan/jynw7IFF90WClrnHUHpE-2UAHols?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "comercial" },
      { nombre: "Plan PMO", descripcion: "Tareas y seguimiento de proyectos.", url: "https://planner.cloud.microsoft/webui/v1/plan/wXAzHopLUEm4OYE4agY5aWUAC5cU?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "proyectos" },
    ],
  },
  {
    titulo: "Clientes",
    subtitulo: "Planes de proyectos por cliente",
    enlaces: [
      { nombre: "Soluciones Globales", descripcion: "Plan del proyecto con el cliente Soluciones Globales.", url: "https://planner.cloud.microsoft/webui/v1/plan/IXemCIoX50WH7WRXfwVKnGUADegf?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
      { nombre: "OMP", descripcion: "Plan del proyecto con el cliente OMP.", url: "https://planner.cloud.microsoft/webui/v1/plan/3GEYzyVz5kGqxsml4hLbRmUAGg0p?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
    ],
  },
  {
    titulo: "Microsoft 365",
    subtitulo: "Comunicación del día a día",
    enlaces: [
      { nombre: "Outlook", descripcion: "Correo y calendario.", url: "https://outlook.office.com/", icono: "correo" },
      { nombre: "Teams", descripcion: "Chat, reuniones y llamadas.", url: "https://teams.microsoft.com/", icono: "teams" },
      { nombre: "OneDrive", descripcion: "Tus archivos personales de trabajo.", url: "https://www.microsoft365.com/onedrive", icono: "nube" },
      { nombre: "Sitio web", descripcion: "eccoqualita.com", url: "https://eccoqualita.com/", icono: "web" },
    ],
  },
];

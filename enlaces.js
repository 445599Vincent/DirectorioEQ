/*
  ENLACES DEL HUB — Ecco Qualitá
  ------------------------------------------------------------------
  Este es el único archivo que hay que editar para agregar, quitar o
  cambiar accesos. El hub tiene tres bloques:

    AREAS      Áreas internas de Ecco Qualitá (según el mapa de procesos).
               Cada área tiene su propia página con grupos de accesos.
    CLIENTES   Proyectos de clientes. Cada cliente tiene su propia página y
               un estado ("activo" o "cerrado"). Los activos se muestran en
               el PMO y los cerrados en su página separada.
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
                  | "engranaje" | "cliente" | "objetivo" | "megafono"
                  | "academia" | "finanzas" | "herramienta" | "balanza"
                  | "candado" | "hubspot" | "eccoqualita"

  Cada área o cliente tiene además un "id" (sin espacios ni acentos),
  que es lo que aparece en la dirección de su página.

  Un cliente puede llevar "logo": la ruta de una imagen cuadrada guardada
  en la carpeta "logos" (p. ej. "logos/banco-central.png"). Su tarjeta
  muestra ese logo en lugar del icono.

  Cada área lleva también "proceso": el grupo del mapa de procesos al
  que pertenece ("estrategico" | "operativo" | "soporte"). Un área sin
  accesos todavía se deja con "grupos: []".

  Las áreas siguen el Mapa de Procesos MAP-SGI-01 (versión 01, emisión
  20/08/2026), con un cambio: "Gestión de Proyectos" y "Gestión de
  Seguimiento (PMO)" están fusionadas en una sola área.
*/

const PROCESOS = [
  { id: "estrategico", titulo: "Procesos Estratégicos" },
  { id: "operativo", titulo: "Procesos Operativos" },
  { id: "soporte", titulo: "Procesos Soporte" },
];

const AREAS = [
  {
    id: "planificacion",
    nombre: "Gestión de Planificación",
    descripcion: "Planificación estratégica, operativa y presupuestaria.",
    icono: "objetivo",
    proceso: "estrategico",
    grupos: [],
  },
  {
    id: "calidad",
    nombre: "Gestión de la Calidad",
    descripcion: "Sistema de Gestión de Calidad: documentos, indicadores, auditoría y mejora continua.",
    icono: "calidad",
    proceso: "estrategico",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint Calidad", descripcion: "Sistema de Gestión de Calidad (SGC): procesos y documentación del área.", url: "https://eccoqualita2102.sharepoint.com/sites/GerenciadeCalidadEQ", icono: "sharepoint" },
          { nombre: "Planner Calidad", descripcion: "Tareas internas del área de Calidad.", url: "https://planner.cloud.microsoft/webui/v1/plan/YuHxUve2h0SyOTkWNdYyDWUAAys6?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
          { nombre: "Listado Maestro de Documentos", descripcion: "MAT-SGC-01: listado maestro de documentos internos.", url: "https://eccoqualita2102.sharepoint.com/sites/GerenciadeCalidadEQ/Lists/Listado%20Maestro%20Documentos%20InternosMATSGC01%20%20V01/AllItems.aspx?env=WebViewList", icono: "sharepoint" },
        ],
      },
    ],
  },
  {
    id: "comunicaciones",
    nombre: "Gestión de Comunicaciones",
    descripcion: "Comunicación interna y externa, mercadeo e imagen corporativa.",
    icono: "megafono",
    proceso: "estrategico",
    grupos: [],
  },
  {
    id: "comercial",
    nombre: "Gestión Comercial",
    descripcion: "Marketing, ventas y gestión de clientes.",
    icono: "comercial",
    proceso: "operativo",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint Comercial", descripcion: "Documentos del área comercial.", url: "https://eccoqualita2102.sharepoint.com/sites/ECCOCOMERCIAL", icono: "sharepoint" },
          { nombre: "Planner Comercial", descripcion: "Tareas y seguimiento del área comercial.", url: "https://planner.cloud.microsoft/webui/v1/plan/jynw7IFF90WClrnHUHpE-2UAHols?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
          { nombre: "HubSpot", descripcion: "CRM: gestión de clientes, contactos y oportunidades.", url: "https://app.hubspot.com/", icono: "hubspot" },
        ],
      },
    ],
  },
  {
    id: "pmo",
    nombre: "Gestión de Proyectos (PMO)",
    descripcion: "Gobierno del PMO, portafolio, planificación, seguimiento y cierre de proyectos.",
    icono: "proyectos",
    proceso: "operativo",
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
          { nombre: "Gobernanza PMO", descripcion: "Políticas, roles y lineamientos del PMO.", url: "https://eccoqualita2102.sharepoint.com/sites/PROJECTMANAGEMENTOFFICE/Documentos%20compartidos/Forms/AllItems.aspx?FolderCTID=0x012000F27531068D84394B8561DF2D7CC5B6B3&id=%2Fsites%2FPROJECTMANAGEMENTOFFICE%2FDocumentos%20compartidos%2F01%5FGobernanza%20PMO", icono: "sharepoint" },
          { nombre: "Metodología MEQ", descripcion: "Metodología, plantillas y guías de trabajo.", url: "https://eccoqualita2102.sharepoint.com/:f:/s/PROJECTMANAGEMENTOFFICE/IgA4MdotnhBFSpSqpm6lODPoATtt1MK82BBcmjGQb_ltpiY?e=REgjEk", icono: "sharepoint" },
          { nombre: "Portafolio", descripcion: "Vista general de todos los proyectos.", url: "https://eccoqualita2102.sharepoint.com/:f:/s/PROJECTMANAGEMENTOFFICE/IgD0Z6RYpx6JQ7Uack4Sub25AQNVIAL3jdjjeupHs8vzIJ0?e=WeyYhI", icono: "sharepoint" },
          { nombre: "Proyectos Cerrados", descripcion: "Archivo de proyectos finalizados.", url: "#/proyectos-cerrados", icono: "archivo" },
          { nombre: "Lecciones Aprendidas", descripcion: "Aprendizajes documentados de cada proyecto.", url: "https://eccoqualita2102.sharepoint.com/:f:/s/PROJECTMANAGEMENTOFFICE/IgByijg0MMP1R4dhYo2ZP49vASkNuzQ5twVgawb6-LEABpQ?e=FoqapX", icono: "sharepoint" },
          { nombre: "Gestión Interna PMO", descripcion: "Organización y documentos internos del PMO.", url: "", icono: "sharepoint" },
        ],
      },
      {
        titulo: "Accesos Directos",
        enlaces: [
          { nombre: "Reportes de Consultores", descripcion: "Reportes de avance que entregan los consultores.", url: "", icono: "sharepoint" },
          { nombre: "Plantillas PMO", descripcion: "Plantillas de uso interno del PMO.", url: "", icono: "sharepoint" },
          { nombre: "Material Educativo", descripcion: "Material de apoyo y consulta del PMO.", url: "", icono: "sharepoint" },
        ],
      },
    ],
  },
  {
    id: "academica",
    nombre: "Gestión Académica",
    descripcion: "Diseño, planificación y ejecución de cursos; evaluación y certificación.",
    icono: "academia",
    proceso: "operativo",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint Académica", descripcion: "Sitio de formación y recursos del área académica.", url: "https://eccoqualita2102.sharepoint.com/:u:/r/sites/ECCOTRAINING/SitePages/TrainingHome.aspx?d=w4aa90b0f92d140e08462c0ab25fee550&csf=1&web=2&share=IQAPC6lK0ZLgQIRiwKsl_uVQAf44zPqSmfyElQrNTCaXo1E&e=ugx8CC", icono: "sharepoint" },
        ],
      },
    ],
  },
  {
    id: "administrativa-financiera",
    nombre: "Gestión Administrativa y Financiera",
    descripcion: "Presupuesto, facturación, pagos, cobros, nómina y compras.",
    icono: "finanzas",
    proceso: "soporte",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "AdmCloud", descripcion: "ERP: facturación, contabilidad e inventario.", url: "https://system.admcloud.net/Login?RedirectUrl=%2F", icono: "erp" },
        ],
      },
    ],
  },
  {
    id: "recursos-humanos",
    nombre: "Gestión de Recursos Humanos",
    descripcion: "Reclutamiento, nómina, capacitación, clima laboral y desempeño.",
    icono: "personas",
    proceso: "soporte",
    grupos: [
      {
        titulo: "Accesos principales",
        enlaces: [
          { nombre: "SharePoint Recursos Humanos", descripcion: "Documentos y recursos de gestión humana.", url: "https://eccoqualita2102.sharepoint.com/sites/RecursosHumanos", icono: "sharepoint" },
          { nombre: "Planner Recursos Humanos", descripcion: "Tareas internas del área de Recursos Humanos.", url: "", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "servicios-generales",
    nombre: "Servicios Generales",
    descripcion: "Administración de activos fijos y conserjería.",
    icono: "engranaje",
    proceso: "soporte",
    grupos: [],
  },
  {
    id: "mantenimiento",
    nombre: "Mantenimiento de Infraestructura",
    descripcion: "Mantenimiento preventivo y correctivo.",
    icono: "herramienta",
    proceso: "soporte",
    grupos: [],
  },
  {
    id: "tic",
    nombre: "Gestión TIC",
    descripcion: "Seguridad de la información, infraestructura tecnológica y soporte técnico.",
    icono: "erp",
    proceso: "soporte",
    grupos: [],
  },
  {
    id: "legal",
    nombre: "Gestión Legal",
    descripcion: "Documentos legales y litigios.",
    icono: "balanza",
    proceso: "soporte",
    grupos: [],
  },
  {
    id: "seguridad",
    nombre: "Seguridad",
    descripcion: "Control de acceso, seguridad física y seguridad y salud en el trabajo.",
    icono: "candado",
    proceso: "soporte",
    grupos: [],
  },
];

const CLIENTES = [
  {
    id: "soluciones-globales",
    nombre: "Soluciones Globales",
    descripcion: "Proyecto en curso con el cliente Soluciones Globales.",
    estado: "activo",
    logo: "logos/soluciones-globales.png",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del cliente.", url: "https://eccoqualita2102.sharepoint.com/:u:/r/sites/SOLUCIONESGLOBALESJM/SitePages/ProjectHome.aspx?d=wcaf276bf9d704f2db96195c32d6fb3da&csf=1&web=2&share=IQC_dvLKcJ0tT7lhlcMtb7PaAXOTgQnN26tfZ642WxSZ1F8&e=MHDYMi", icono: "sharepoint" },
          { nombre: "Planner del proyecto", descripcion: "Tareas y seguimiento del proyecto.", url: "", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "omp",
    nombre: "OMP",
    descripcion: "Proyecto finalizado con el cliente OMP.",
    estado: "cerrado",
    logo: "logos/omp.png",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del proyecto finalizado.", url: "", icono: "sharepoint" },
          { nombre: "Planner del proyecto", descripcion: "Tareas y seguimiento del proyecto.", url: "https://planner.cloud.microsoft/webui/v1/plan/3GEYzyVz5kGqxsml4hLbRmUAGg0p?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "fintax",
    nombre: "Fintax Consulting",
    descripcion: "Proyecto en curso con el cliente Fintax Consulting.",
    estado: "activo",
    logo: "logos/fintax.png",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del cliente.", url: "https://eccoqualita2102.sharepoint.com/sites/FintaxConsulting/SitePages/CollabHome.aspx", icono: "sharepoint" },
          { nombre: "Planner del proyecto", descripcion: "Tareas y seguimiento del proyecto.", url: "https://planner.cloud.microsoft/webui/v1/plan/IXemCIoX50WH7WRXfwVKnGUADegf?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "agroplast",
    nombre: "Agroplast",
    descripcion: "Tres servicios contratados: Planificación Estratégica, Gerencia de Calidad y Programa de Salud Ocupacional EHS.",
    estado: "activo",
    logo: "logos/agroplast.png",
    grupos: [
      {
        titulo: "Planificación Estratégica",
        enlaces: [
          { nombre: "SharePoint de Planificación Estratégica", descripcion: "Documentos y entregables del servicio.", url: "https://eccoqualita2102.sharepoint.com/:u:/r/sites/Agroplast-CONSULTORA3DiseodelProcesoEstratgicodePlanificacin/SitePages/CollabHome.aspx?d=w69758b1d9b9a4be08c7725c31516bae7&csf=1&web=2&share=IQAdi3VpmpvgS4x3JcMVFrrnAQ6y-BYHjPzGoY0CsnpAhFg&e=p6cx4X", icono: "sharepoint" },
          { nombre: "Planner de Planificación Estratégica", descripcion: "Tareas y seguimiento del servicio.", url: "https://planner.cloud.microsoft/webui/v1/plan/-Z19N_H6FkqBLu7JnglquWUAE6TK?tid=f0b59f88-a70a-4207-864a-406a47180842", icono: "planner" },
        ],
      },
      {
        titulo: "Gerencia de Calidad",
        enlaces: [
          { nombre: "SharePoint de Gerencia de Calidad", descripcion: "Documentos y entregables del servicio.", url: "https://eccoqualita2102.sharepoint.com/:u:/r/sites/Agroplast-TERCERIZACINDELAGERENCIADECALIDAD/SitePages/CollabHome.aspx?d=w32fadb05dbca4aee8fb4f75c2837a25c&csf=1&web=2&share=IQAF2_oyytvuSo-091woN6JcAfdnQK04mgxvf_i7j_y67EI&e=H35kSd", icono: "sharepoint" },
          { nombre: "Planner de Gerencia de Calidad", descripcion: "Tareas y seguimiento del servicio.", url: "", icono: "planner" },
        ],
      },
      {
        titulo: "Programa de Salud Ocupacional EHS",
        enlaces: [
          { nombre: "SharePoint del Programa EHS", descripcion: "Documentos y entregables del servicio.", url: "https://eccoqualita2102.sharepoint.com/:u:/r/sites/Agroplast-TERCERIZACINDELAREADEEHS/SitePages/CollabHome.aspx?d=w7cea2ee7296046bc82c0c568bb685026&csf=1&web=2&share=IQDnLup8YCm8RoLAxWi7aFAmAYy9kb5wMEkNeuI991ly2YA&e=hktn0N", icono: "sharepoint" },
          { nombre: "Planner del Programa EHS", descripcion: "Tareas y seguimiento del servicio.", url: "", icono: "planner" },
        ],
      },
    ],
  },
  {
    id: "banco-central",
    nombre: "Banco Central",
    descripcion: "Proyecto finalizado con el cliente Banco Central.",
    estado: "cerrado",
    logo: "logos/banco-central.png",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del proyecto finalizado.", url: "https://eccoqualita2102.sharepoint.com/:u:/r/sites/BancoCentral/SitePages/ProjectHome.aspx?d=w04a39ae3239948b7923a62cbb5b7e14c&csf=1&web=2&share=IQDjmqMEmSO3SJI6Ysu1t-FMAQIb7AJLBDdw_rzVE1QOUZY&e=gjdd6S", icono: "sharepoint" },
        ],
      },
    ],
  },
  {
    id: "urban",
    nombre: "Urban Empresa Constructora",
    descripcion: "Proyecto finalizado con el cliente Urban Empresa Constructora.",
    estado: "cerrado",
    logo: "logos/urban.png",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del proyecto finalizado.", url: "", icono: "sharepoint" },
        ],
      },
    ],
  },
  {
    id: "agiltech",
    nombre: "AgilTech Solutions",
    descripcion: "Proyecto finalizado con el cliente AgilTech Solutions.",
    estado: "cerrado",
    logo: "logos/agiltech.png",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del proyecto finalizado.", url: "", icono: "sharepoint" },
        ],
      },
    ],
  },
  {
    id: "atomica-publicidad",
    nombre: "Atómica Publicidad",
    descripcion: "Proyecto finalizado con el cliente Atómica Publicidad.",
    estado: "cerrado",
    grupos: [
      {
        titulo: "Accesos del proyecto",
        enlaces: [
          { nombre: "SharePoint del proyecto", descripcion: "Documentos y entregables del proyecto finalizado.", url: "", icono: "sharepoint" },
        ],
      },
    ],
  },
];

const GENERALES = [
  { nombre: "Mis Planes", descripcion: "Todos los planes y tareas asignadas a ti en Planner.", url: "https://planner.cloud.microsoft/", icono: "planner" },
  { nombre: "Outlook", descripcion: "Correo y calendario.", url: "https://outlook.office.com/", icono: "correo" },
  { nombre: "Teams", descripcion: "Chat, reuniones y llamadas.", url: "https://teams.microsoft.com/", icono: "teams" },
  { nombre: "OneDrive", descripcion: "Tus archivos personales de trabajo.", url: "https://www.microsoft365.com/onedrive", icono: "nube" },
  { nombre: "Sitio Web", descripcion: "Sitio web de Ecco Qualitá (eccoqualita.com).", url: "https://eccoqualita.com/", icono: "eccoqualita" },
];

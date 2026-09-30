# Configurar el inicio de sesión con Microsoft 365

Este documento es para quien administra el Microsoft 365 (Entra ID / Azure AD) de Ecco
Qualitá. Son cinco pasos en el portal de Microsoft, sin tocar código. Al final, reenvíe a
Vincent Tapia los dos datos marcados en **negrita**.

No se necesita ninguna contraseña ni "client secret": la aplicación solo lee la identidad
de quien inicia sesión, usando el flujo seguro para aplicaciones de una sola página (SPA).

## 1. Registrar la aplicación

1. Entre a [entra.microsoft.com](https://entra.microsoft.com) con una cuenta de
   administrador de Ecco Qualitá.
2. Vaya a **Identity → Applications → App registrations → New registration**.
3. Nombre: `Directorio Ecco Qualitá`.
4. En **Supported account types**, deje la opción por defecto ("Accounts in this
   organizational directory only").
5. En **Redirect URI**, elija el tipo **Single-page application (SPA)** y escriba:
   `https://directorio.eccoqualita.com/`
6. Pulse **Register**.
7. En la página **Overview** que se abre, copie y guárdelos para el paso 5:
   - **Application (client) ID**
   - **Directory (tenant) ID**

## 2. Confirmar la dirección de redirección

1. Vaya a **Authentication** (menú de la izquierda, dentro de la misma aplicación).
2. Bajo **Single-page application**, confirme que aparece
   `https://directorio.eccoqualita.com/`. No hace falta agregar la dirección antigua
   (`https://445599vincent.github.io/DirectorioEQ/`): redirige sola a la nueva.
3. Pulse **Save** si hizo algún cambio.

## 3. Crear los roles del directorio ("App roles")

1. Vaya a **App roles** → **Create app role**.
2. Cree uno por cada fila de esta tabla (**Allowed member types: Users/Groups** en todos):

   | Display name | Value | Description |
   |---|---|---|
   | Administrador del directorio | `admin` | Ve todas las áreas y las administra |
   | Gestión de Planificación | `planificacion` | |
   | Gestión de la Calidad | `calidad` | |
   | Gestión de Comunicaciones | `comunicaciones` | |
   | Gestión Comercial | `comercial` | |
   | Gestión de Proyectos (PMO) | `pmo` | Incluye los proyectos de clientes |
   | Gestión Académica | `academica` | |
   | Gestión Administrativa y Financiera | `administrativa-financiera` | |
   | Gestión de Recursos Humanos | `recursos-humanos` | |
   | Servicios Generales | `servicios-generales` | |
   | Mantenimiento de Infraestructura | `mantenimiento` | |
   | Gestión TIC | `tic` | |
   | Gestión Legal | `legal` | |
   | Seguridad | `seguridad` | |

   El campo **Value** debe escribirse exactamente igual (son los mismos que usa el
   directorio internamente). Si en el futuro el directorio agrega una nueva área, avise a
   Vincent para crear su rol igual que estos.

## 4. Asignar a cada persona su rol (o roles)

1. Vaya a **Identity → Applications → Enterprise applications** y busque
   `Directorio Ecco Qualitá` (es la misma aplicación, bajo otro menú).
2. Entre a **Users and groups → Add user/group**.
3. Seleccione a la persona (o un grupo de Microsoft 365 ya existente, por ejemplo el
   equipo de Recursos Humanos) y el rol que le corresponde. Una persona puede tener más
   de un rol si trabaja en varias áreas; repita el proceso para asignar varios.
4. El rol **Administrador del directorio** debe asignarse solo a quien vaya a ver todo.

## 5. Exigir que solo las personas asignadas puedan entrar

1. Dentro de la misma aplicación, vaya a **Properties**.
2. Active **Assignment required?** → **Yes** → **Save**.
3. Esto es lo que de verdad bloquea la entrada: sin este paso, cualquier persona con
   cuenta de Ecco Qualitá podría iniciar sesión, aunque no tenga ningún rol asignado.

## 6. Enviar los datos

Reenvíe a Vincent Tapia (vincenttapia405@gmail.com):

- **Application (client) ID:** ...........................................
- **Directory (tenant) ID:** ...........................................

Con esos dos datos, el inicio de sesión queda activado en unos minutos.

---

## Qué protege esto y qué no

El directorio es una página sencilla, sin servidor propio. El inicio de sesión hace dos
cosas reales:

- Impide que alguien sin cuenta autorizada de Ecco Qualitá (con el paso 5 activado) llegue
  a usar la página.
- Muestra a cada persona solo las áreas de su rol, para que no tenga que buscar entre
  accesos que no usa.

Lo que no hace, porque ninguna página sin servidor puede hacerlo: impedir que alguien muy
técnico descargue el archivo `enlaces.js` directamente y lea ahí todas las direcciones,
incluso las de áreas que no le corresponden. Esto es un riesgo bajo, porque esas
direcciones no son la información en sí: cada una (SharePoint, Planner, HubSpot, AdmCloud)
exige su propio inicio de sesión con sus propios permisos, que esto no cambia ni reemplaza.

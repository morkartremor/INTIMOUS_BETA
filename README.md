🚀 Plan Maestro del Proyecto: INTIMOUS

Metodología: AGILE / SCRUM (Adaptado a Solo-Dev)
Objetivo: Lanzar y mantener la aplicación líder en juegos de intimidad para parejas y grupos.
Versión Actual: v44.0 (Alpha Estable)

1. 🏗️ Arquitectura del Proyecto

🛠️ Tech Stack (Tecnologías)

Frontend: React.js (Vite) + Tailwind CSS.

Mobile Wrapper: Capacitor.js (Android).

Base de Datos: Local (JSON/Arrays en código) - Optimizado para velocidad y offline.

Control de Versiones: Git & GitHub.

Despliegue Web: Vercel.

Despliegue Móvil: Google Play Store.

2. 🔄 Flujo de Trabajo (Workflow)

Para mantener el orden, utilizaremos ciclos de trabajo llamados Sprints (carreras cortas de 1-2 semanas).

El Ciclo de Vida de una Actualización:

📝 Planificación (Backlog): Escribir qué se va a hacer (ej. "Agregar modo Kinky").

💻 Desarrollo: Escribir el código en una rama local (no en la principal).

🧪 QA (Quality Assurance):

Prueba en navegador (Chrome modo móvil).

Prueba en dispositivo físico (Android APK).

Check: ¿Se rompe el diseño? ¿Los textos caben? ¿La lógica es correcta?

🚀 Despliegue (Release):

git push a GitHub (Backup).

Generar APK en Android Studio.

Subir a Google Play Console (cuando esté activa).

3. 🗺️ Roadmap (Hoja de Ruta)

🟢 Fase 1: MVP (Producto Mínimo Viable) - [COMPLETADO] ✅

[x] Estructura base de la app.

[x] Juegos principales (Dados, Verdad o Reto, Kamasutra).

[x] Sistema de Niveles de Intensidad (1-5).

[x] Base de datos inicial.

🟡 Fase 2: Refinamiento y Contenido - [EN PROCESO] 🚧

[x] Expansión masiva de base de datos (Word integrado).

[x] Nuevos juegos: Roleplay, Paparazzi X.

[x] Corrección de UI para móviles (Scroll, textos cortados).

[ ] Tarea Pendiente: Subir imágenes reales a la carpeta public para Kamasutra y Paparazzi.

[ ] Tarea Pendiente: Pruebas exhaustivas de UX en diferentes tamaños de celular.

🟠 Fase 3: Preparación para el Lanzamiento (Pre-Launch)

[ ] Crear cuenta de Desarrollador Google ($25 USD).

[ ] Diseño de Icono final y Screenshots promocionales.

[ ] Redacción de textos legales (Política de Privacidad simple).

[ ] Configuración de ficha en Play Store.

🔴 Fase 4: Monetización y Expansión (Post-Launch)

[ ] Integración de AdMob (Banners).

[ ] Sistema de Pagos (IAP) para quitar anuncios.

[ ] Traducir app a Inglés (Internacionalización).

4. 🗂️ Backlog de Tareas (Tu "To-Do" List Actual)

Estas son las tareas técnicas inmediatas para la Versión 45.0:

Prioridad

Tarea

Descripción

Estado

🔴 Alta

Imágenes Assets

Conseguir o generar los iconos PNG para las 30+ posiciones del Kamasutra y guardarlos en public/.

Pendiente

🔴 Alta

Test de Campo

Instalar el APK v44 en un celular real y jugar una partida completa de cada juego para verificar errores.

Pendiente

🟡 Media

Icono Adaptativo

Generar el icono final en Android Studio (Image Asset) para que no salga el androide verde.

Pendiente

🟡 Media

Limpieza de Código

Verificar que no haya variables sin usar (warnings de ESLint) antes de subir a producción.

Pendiente

🟢 Baja

Redes Sociales

Crear cuentas de Instagram/TikTok para apartar el nombre de usuario.

Pendiente

5. 🛡️ Protocolo de Seguridad (Backups)

Para evitar desastres, sigue esta regla de oro:

"Si funciona, guárdalo."

Commit Diario: Al terminar el día, siempre ejecuta:

git add .
git commit -m "Avance del dia: descripcion breve"
git push origin main


Backup de Versión (Milestone): Al terminar una versión importante (como la v44), crea un ZIP del proyecto (sin node_modules) y súbelo a la nube (Drive/OneDrive).

6. 🎨 Guía de Estilo (Design System)

Para mantener la consistencia visual:

Paleta de Colores:

Fondo: bg-black / bg-gray-900

Acentos: text-rose-500 (Pasión), text-purple-500 (Kinky), text-emerald-500 (Público).

Tipografía: Sans-serif (Default de Tailwind).

Iconos: Lucide React (Estilo lineal, tamaño 24-32px).

Bordes: Redondeados rounded-2xl o rounded-3xl para sensación moderna y táctil.

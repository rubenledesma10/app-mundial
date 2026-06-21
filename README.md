🏆 Aplicación Web: Mundial de Fútbol (IES 9-023)

[cite_start]Plataforma web integral diseñada para la gestión de jugagores y usuarios[cite: 3, 22]. [cite_start]Este proyecto fue desarrollado bajo una arquitectura Modelo-Vista-Controlador (MVC) desacoplada, cumpliendo con las directrices y requerimientos técnicos del parcial de **Programación III**[cite: 6, 115].

---

## 👥 Integrantes del Grupo
* **Ruben Ledesma** - Fullstack Developer
* **Rodrigo Espinosa** - Fullstack Developer
* **Santiago Romano** - Fullstack Developer

---

## 🛠️ Stack Tecnológico Obligatorio
[cite_start]De acuerdo a las tecnologías exigidas por la cátedra, el sistema implementa[cite: 8]:

* [cite_start]**Frontend:** React (Vite) [cite: 10][cite_start], Material UI (MUI) [cite: 11][cite_start], React Router Dom (Navegación entre vistas)[cite: 57].
* [cite_start]**Backend:** Flask [cite: 14][cite_start], SQLAlchemy (Mapeo de POO)[cite: 75], PyMySQL (Driver de conexión).
* [cite_start]**Base de Datos:** MySQL[cite: 15].
* [cite_start]**Control de Versiones:** Git & GitHub[cite: 18, 19].

---

## 🔍 Cumplimiento de Requisitos del Parcial

Para facilitar la corrección, se detalla a continuación de qué manera y en qué archivos se implementaron las directrices obligatorias de la consigna:

### 1. Requisitos Funcionales y Control de Accesos
* [cite_start]**Registro de usuarios públicos:** Implementado en la ruta `POST /api/auth/register` de Flask y consumido en `src/pages/Registro.jsx`[cite: 23].
* [cite_start]**Inicio de Sesión (Login):** Gestionado mediante `POST /api/auth/login`[cite: 24]. Valida credenciales e impide el acceso si la cuenta se encuentra desactivada por un administrador.
* [cite_start]**Cierre de Sesión (Logout):** Remueve los tokens de sesión de manera segura en el cliente[cite: 26].
* [cite_start]**Roles (Admin / Users):** Se diferencian los accesos tanto en el Frontend mediante rutas condicionales como en el Backend mediante decoradores de ruta[cite: 27].

### 2. Frontend React: Uso Obligatorio de Hooks
[cite_start]La lógica de la interfaz de usuario se resolvió aplicando estrictamente los Hooks requeridos[cite: 31, 32]:
* [cite_start]**`useState`:** Utilizado para el manejo de formularios (Login, Registro, Edición de Perfil), almacenamiento de estados de carga (`loading`, `error`) y el guardado de datos dinámicos obtenidos desde la API (`users`, `players`)[cite: 34, 35, 36, 37].
* [cite_start]**`useEffect`:** Implementado para la carga inicial de datos (tablas de backoffice y perfil propio) y la actualización de información en tiempo real ante eventos de filtrado[cite: 38, 41, 42].
* [cite_start]**`useContext`:** Empleado para la gestión global del estado de autenticación de la aplicación (`AuthContext`), permitiendo compartir la sesión del usuario activo de forma transversal entre todos los componentes y barras de navegación[cite: 43, 45, 46].
* [cite_start]**Custom Hook Obligatorio:** Se diseñó y aplicó el hook personalizado **`useAuth()`** para encapsular la lógica de validación, persistencia de tokens y acceso rápido a los datos de la sesión activa[cite: 47, 50].

### 3. Backend Flask: API REST y POO
* [cite_start]**Módulo Asignado (CRUD de Jugadores y Usuarios):** Implementación completa de operaciones para Crear, Consultar, Modificar y Eliminar tanto para el catálogo mundialista como para el control interno de accesos[cite: 68, 69, 70, 71, 72, 73].
* **Programación Orientada a Objetos (POO):** Aplicada en los modelos de base de datos definidos en el servidor (`User`, `Player`, `NationalTeam`). [cite_start]Se utilizan los principios de[cite: 74, 75]:
  * [cite_start]*Encapsulamiento:* Métodos internos en los modelos como `.set_password()` para abstracción de hashing de claves[cite: 76].
  * [cite_start]*Herencia y Abstracción:* Estructuras base compartidas (como entidades que heredan campos comunes o representaciones de personas)[cite: 76].

### 4. Integración de Consumo Híbrido (Desarrollo en Equipo)
[cite_start]Como resultado del trabajo colaborativo mediante ramas de Git (*feature branches*) y Pull Requests, la comunicación con la API se resolvió mediante un esquema híbrida[cite: 12, 83]:
* **Axios:** Implementado en formularios complejos (Registro y Mi Perfil) por su óptima flexibilidad para la serialización y transporte binario de objetos `FormData` (subida de fotos físicas y captura web).
* [cite_start]**Fetch API:** Utilizado de forma nativa en componentes estándar para el consumo de datos directos en formato JSON crudo[cite: 12].

---

## 🚀 Desafíos Extra Implementados (Opcionales)
[cite_start]Para robustecer la arquitectura, el grupo asumió el desarrollo de los siguientes desafíos opcionales sugeridos[cite: 110]:
1. [cite_start]**Autenticación JWT:** Reemplazo de sesiones tradicionales por la implementación estricta de tokens Web JSON (`Flask-JWT-Extended`) pasados en las cabeceras `Authorization: Bearer`[cite: 111].
2. [cite_start]**Búsquedas y Filtros Avanzados:** El endpoint `/api/players/search` cuenta con un motor avanzado utilizando operadores `ilike` y lógicas cruzadas de SQLAlchemy que permiten filtrar por coincidencia global (`q`) o rangos estadísticos exactos (goles mínimos, asistencias, tarjetas amarillas/rojas acumuladas)[cite: 112].
3. **Módulo Multimedia en Perfil:** Integración de la API de medios nativa del navegador para permitir a los usuarios capturar fotos de perfil directamente desde su **cámara web (Webcam)** o subir archivos locales.

---

## 📊 Documentación de la API
[cite_start]Toda la especificación de endpoints, métodos HTTP permitidos (GET, POST, PUT, PATCH, DELETE) y payloads de ejemplo se encuentran publicados en el entorno oficial de documentación[cite: 96, 97]:

🔗 **[Colección Publicada de Postman - App Mundial](https://documenter.getpostman.com/view/31369461/2sBXwvKUqh)**

---

## 📐 Modelado UML
[cite_start]*De acuerdo a lo requerido, a continuación se adjunta la ruta al diagrama de representación de clases principales del sistema[cite: 92, 95]:*

![Diagrama UML de Clases](backend/static/uploads/diagramaclases.png)

---

## [cite_start]🔧 Instrucciones de Instalación y Despliegue Local [cite: 90]

### Configuración del Servidor (Backend)
1. Navegar a la carpeta correspondiente:
   ```bash
   cd backend
Crear y activar el entorno virtual de Python:Bashpython -m venv venv
# En Windows:
.\venv\Scripts\activate
# En Mac/Linux:
source venv/bin/activate
Instalar dependencias obligatorias:Bashpip install -r requirements.txt
Configurar las variables de entorno locales creando un archivo .env en la raíz de /backend:Fragmento de códigoFLASK_APP=app.py
FLASK_ENV=development
JWT_SECRET_KEY=clave_secreta_para_desarrollo_local
SQLALCHEMY_DATABASE_URI=mysql+pymysql://USUARIO:PASSWORD@localhost:3306/nombre_de_tu_bd
Estructuración y Seeding de la BD: Para borrar tablas obsoletas, generar el esquema físico nuevo y cargar automáticamente el Administrador del sistema y las entidades iniciales del mundial, ejecutar:  Bashpython seed.py
Inicializar la API:Bashpython app.py
Configuración del Cliente (Frontend)Abrir otra terminal y situarse en la carpeta del cliente:Bashcd frontend
Descargar los paquetes de Node:Bashnpm install
Ejecutar el servidor local:Bashnpm run dev
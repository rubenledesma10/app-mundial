# 🏆 Aplicación Web: Mundial de Fútbol (IES 9-023)

Plataforma web integral diseñada para la gestión de jugadores y usuarios. Este proyecto fue desarrollado bajo una arquitectura **Modelo-Vista-Controlador (MVC)** desacoplada, cumpliendo con las directrices y requerimientos técnicos del parcial de **Programación III**.

---

# 👥 Integrantes del Grupo

* **Ruben Ledesma** — Fullstack Developer
* **Rodrigo Espinosa** — Fullstack Developer
* **Santiago Romano** — Fullstack Developer

---

# 🛠️ Stack Tecnológico

## Frontend

* React (Vite)
* Material UI (MUI)
* React Router DOM

## Backend

* Flask
* SQLAlchemy
* PyMySQL

## Base de Datos

* MySQL

## Control de Versiones

* Git
* GitHub

---

# 🔍 Cumplimiento de Requisitos del Parcial

## 1. Requisitos Funcionales y Control de Accesos

### Registro de Usuarios

Implementado mediante la ruta:

```http
POST /api/auth/register
```

Consumido desde:

```text
src/pages/Registro.jsx
```

### Inicio de Sesión (Login)

Implementado mediante:

```http
POST /api/auth/login
```

Valida credenciales e impide el acceso a usuarios desactivados por un administrador.

### Cierre de Sesión (Logout)

Elimina de forma segura la información de autenticación almacenada en el cliente.

### Roles (Administrador y Usuario)

Se implementó control de acceso tanto en el frontend mediante rutas protegidas como en el backend mediante validaciones y decoradores.

---

## 2. Frontend React: Uso de Hooks

### useState

Utilizado para:

* Manejo de formularios.
* Estados de carga.
* Gestión de errores.
* Almacenamiento de datos obtenidos desde la API.

### useEffect

Utilizado para:

* Carga inicial de datos.
* Actualización automática de información.
* Sincronización con cambios de filtros y vistas.

### useContext

Implementado mediante `AuthContext` para compartir globalmente la información de autenticación entre componentes.

### Custom Hook: useAuth()

Se desarrolló el hook personalizado:

```javascript
useAuth()
```

Encargado de:

* Gestionar la autenticación.
* Persistir tokens.
* Centralizar el acceso a los datos de sesión.

---

## 3. Backend Flask: API REST y Programación Orientada a Objetos

### CRUD de Jugadores y Usuarios

Implementación completa de operaciones:

* Crear
* Consultar
* Modificar
* Eliminar

sobre jugadores y usuarios.

### Aplicación de POO

Los modelos principales son:

* User
* Player
* NationalTeam

#### Encapsulamiento

Se utilizan métodos internos para abstraer procesos sensibles como el hashing de contraseñas:

```python
user.set_password(password)
```

#### Herencia y Abstracción

Se implementaron estructuras compartidas para reutilizar atributos y comportamientos comunes entre entidades.

---

## 4. Integración de Consumo Híbrido

Como resultado del trabajo colaborativo mediante ramas Git y Pull Requests, se implementó una estrategia híbrida para el consumo de la API.

### Axios

Utilizado principalmente en:

* Registro de usuarios.
* Gestión de perfil.
* Envío de formularios complejos.
* Subida de imágenes mediante FormData.

### Fetch API

Utilizado en:

* Consultas simples.
* Consumo de datos JSON.
* Operaciones estándar de lectura.

---

# 🚀 Funcionalidades Adicionales

## 1. Autenticación JWT

Implementación mediante:

```text
Flask-JWT-Extended
```

Los tokens son enviados mediante el encabezado:

```http
Authorization: Bearer <token>
```

---

## 2. Búsquedas y Filtros Avanzados

El endpoint:

```http
GET /api/players/search
```

permite realizar búsquedas por:

* Nombre.
* Coincidencia global.
* Goles mínimos.
* Asistencias.
* Tarjetas amarillas.
* Tarjetas rojas.

Utilizando filtros avanzados de SQLAlchemy.

---

## 3. Gestión Multimedia de Perfil

Los usuarios pueden:

* Subir imágenes desde su dispositivo.
* Capturar fotografías directamente desde la cámara web.
* Actualizar su foto de perfil.

---

# 📊 Documentación de la API

Toda la documentación de endpoints, métodos HTTP y ejemplos de uso se encuentra disponible en:

🔗 **Colección Postman**

https://documenter.getpostman.com/view/31369461/2sBXwvKUqh

---

# 📐 Modelado UML

A continuación se presenta el diagrama de clases principal del sistema:

```markdown
![Diagrama UML de Clases](backend/static/uploads/diagramaclases.png)
```

![Diagrama UML de Clases](backend/static/uploads/diagramaclases.png)

---

# 🔧 Instalación y Ejecución Local

## Configuración del Backend

### 1. Ingresar a la carpeta del servidor

```bash
cd backend
```

### 2. Crear entorno virtual

```bash
python -m venv venv
```

### 3. Activar entorno virtual

#### Windows

```bash
.\venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### 4. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 5. Configurar variables de entorno

Crear un archivo `.env`:

```env
FLASK_APP=app.py
FLASK_ENV=development
JWT_SECRET_KEY=clave_secreta_para_desarrollo_local
SQLALCHEMY_DATABASE_URI=mysql+pymysql://USUARIO:PASSWORD@localhost:3306/nombre_de_tu_bd
```

### 6. Inicializar la base de datos

```bash
python seed.py
```

### 7. Ejecutar el servidor

```bash
python app.py
```

---

## Configuración del Frontend

### 1. Ingresar a la carpeta del cliente

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar aplicación

```bash
npm run dev
```

---

# 📍 Acceso a la Aplicación

Una vez iniciados ambos servicios:

| Servicio | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |

---

# 🌳 Flujo de Trabajo con Git

El desarrollo se realizó utilizando una estrategia basada en ramas, por ejemplo:

```text
main
└── develop
    ├── feature/frontend
    ├── feature/backend
    └── feature/auth
```

Utilizando Pull Requests para integrar funcionalidades y mantener la estabilidad del proyecto.

---

# 📄 Licencia

Proyecto desarrollado con fines académicos para la materia **Programación III** del **IES 9-023**.

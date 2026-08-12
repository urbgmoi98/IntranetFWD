# 🏫 Intranet Escolar

Intranet escolar unificada (React + Vite) con dos portales diferenciados por
RBAC: **docentes (staff)** y **estudiantes / familias (solo lectura)**.

> ⚙️ Incluye **modo demo automático**: si el backend no está disponible, puedes
> iniciar sesión con cualquier correo y la app queda navegable de forma autónoma.

## Tecnologías

- **React 18** + **Vite 5**
- **React Router DOM 6** (rutas protegidas por rol)
- **Axios** (cliente API con interceptor JWT)
- CSS propio: **tema oscuro**, animaciones y transiciones interactivas de sección

## Requisitos

- Node.js 18 o superior

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run dev      # entorno de desarrollo (http://localhost:5173)
npm run build    # compilación de producción
npm run preview  # previsualizar el build
```

## Estructura

```
src/
├── main.jsx                 # Punto de entrada React
├── App.jsx                  # Router y rutas protegidas
├── api.js                   # Cliente Axios con token JWT
├── context/AuthContext.jsx  # Autenticación + modo demo
├── pages/                   # Login, dashboards, 404, no autorizado
├── components/
│   ├── common/              # Layout, PrivateRoute, Spinner, Reveal
│   ├── staff/               # Paneles de docentes (CRUD)
│   └── student/             # Consultas de estudiantes (solo lectura)
└── styles/global.css        # Tema oscuro + animaciones
```

## Accesos de demostración (sin backend)

Cualquier correo es válido en modo demo. El rol se infiere:
- Correos que incluyan `docente`, `staff` o `profesor` → panel del **staff**.
- Cualquier otro correo → portal de **estudiante**.

Ejemplos en la pantalla de login:
- **Docente:** `docente@colegio.edu`
- **Estudiante:** `estudiante@colegio.edu`

## Notas

- Con backend disponible, `/api` se redirige (proxy) a `http://localhost:3000`
  durante el desarrollo (ver `vite.config.js`).
- El esquema de base de datos PostgreSQL se encuentra en `postgre.sql`.
- `dashboard-docente.html` y `dashboard-estudiante.html` son demos HTML
  autónomos enlazados a `styles.css` (también tema oscuro).

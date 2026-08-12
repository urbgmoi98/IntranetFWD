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

Hay 5 cuentas demo predefinidas. Cualquiera de ellas entra **aunque el backend
esté caído o aún no tenga esos usuarios creados** (la app cae automáticamente
en modo demo). Todas usan la contraseña `123456`.

| Rol                     | Correo                | Contraseña |
| ----------------------- | --------------------- | ---------- |
| 👩‍🏫 Docente (staff)      | `docente@colegio.edu` | `123456`   |
| 👨‍🏫 Profesor (staff)     | `profesor@colegio.edu`| `123456`   |
| 🧑‍💼 Staff / Admin (staff) | `staff@colegio.edu`   | `123456`   |
| 🎓 Estudiante            | `estudiante@colegio.edu` | `123456` |
| 👪 Familiar              | `familiar@colegio.edu`| `123456`   |

Además, en modo demo **cualquier otro correo** también es válido; el rol se
infiere automáticamente según el texto del correo:

- Correos que incluyan `docente`, `staff`, `profesor` o `admin` → panel del **staff**.
- Cualquier otro correo → portal de **estudiante**.

> 💡 La configuración de estas cuentas vive en `src/config/demoAccounts.js`, y
> los usuarios equivalentes para PostgreSQL están en `seed-demo.sql`.

## Notas

- Con backend disponible, `/api` se redirige (proxy) a `http://localhost:3000`
  durante el desarrollo (ver `vite.config.js`).
- El esquema de base de datos PostgreSQL se encuentra en `postgre.sql`.
- `dashboard-docente.html` y `dashboard-estudiante.html` son demos HTML
  autónomos enlazados a `styles.css` (también tema oscuro).

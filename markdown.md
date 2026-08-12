# 🏫 Prompt: Especificación Técnica para Intranet Escolar (RBAC)


## 🎯 Requerimientos Funcionales

### 1. Staff / Docentes
- CRUD completo de calificaciones.
- Control de asistencia.
- Publicación de circulares.
- Reserva de aulas/recursos (**con control de concurrencia**).

### 2. Estudiantes / Familias (Solo Lectura)
- Consulta de notas y horarios.
- Calendario de exámenes.
- Descarga de tareas y material didáctico.
- Visualización de avisos oficiales.

## 📦 Entregables Obligatorios

1. **Esquema DB Relacional:** Definición de tablas, campos clave y relaciones (ERD).
2. **Endpoints API REST:** Método HTTP, ruta, payload de request y estructura de response para cada módulo.
3. **Estructura Frontend:** Arquitectura de páginas y componentes (React/Vue).
4. **Roadmap de Implementación:** Plan priorizado enfocado en seguridad (JWT + HTTPS) y experiencia *mobile-first*.

---

## 💡 Por qué funciona este prompt (Ingeniería de Prompts)

| Elemento | Justificación Técnica |
| :--- | :--- |
| **Rol** | Ancla la experiencia técnica del modelo hacia arquitectura y diseño de sistemas, evitando respuestas de código suelto o superficial. |
| **Restricciones** | Separa explícitamente los roles (RBAC) y define el alcance de permisos (CRUD vs. Solo Lectura), reduciendo ambigüedad en la seguridad. |
| **Formato** | Fuerza entregables medibles y estructurados (esquemas, endpoints, roadmap), evitando respuestas genéricas o narrativas. |
| **Contexto** | Incluye tanto el "qué" (módulos funcionales) como el "cómo técnico" (concurrencia en reservas, mobile-first), guiando al modelo hacia soluciones de producción real. |
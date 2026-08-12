# Memoria de Conversación — Intranet Escolar RBAC

## Contexto
Solicitud de especificación técnica completa para una intranet escolar con dos dashboards diferenciados por RBAC, priorizando seguridad (JWT + HTTPS) y experiencia mobile-first.

## Decisiones Arquitectónicas Clave

### Backend
- **Node.js 22 + Express 5** con arquitectura modular por rutas
- **PostgreSQL 16** con Row-Level Security (RLS) para aislamiento de datos
- **Redis 7** para sesiones, blacklist de tokens y rate limiting
- **JWT RS256** con rotación de refresh tokens (detección de reutilización)
- **Argon2id** para hashing de contraseñas
- **Optimistic Locking** (`version` en grades/reservations) + `SELECT FOR UPDATE` para concurrencia
- **Índice GIST** en PostgreSQL para prevención de overlap en reservas
- **Audit Logs inmutables** con trigger que bloquea UPDATE/DELETE

### Frontend
- **React 19 + Vite 6 + Tailwind CSS 3**
- **TanStack Query v5** para server state con staleTime de 5 min
- **Zustand + persist** para auth state
- **Framer Motion** para page transitions, stagger lists, modales
- **Mobile-First**: bottom nav (&lt;768px), sidebar desktop, touch targets 44px, PWA
- **shadcn/ui-inspired** componentes propios: Card, Badge, Skeleton

### Seguridad
- Helmet.js con CSP, HSTS, X-Frame-Options
- Rate limiting: 100 req/min general, 10 req/min auth
- CORS con whitelist
- RBAC atómico: permissions table + middleware `requirePermission()`
- SoD: validaciones de negocio en ownership de recursos

### Estructura de Carpetas
- Backend: routes/ por dominio, middleware/ reutilizable, utils/ audit
- Frontend: feature-based architecture con co-location de api, components, hooks, stores

## Entregables Generados
1. `docker-compose.yml` — infra completa (DB, Redis, API, Frontend)
2. `database/schema.sql` — 20+ tablas con RLS, índices GIST, triggers
3. `database/seed.sql` — datos iniciales de roles, permisos, aulas
4. `backend/src/app.js` — app Express con seguridad
5. `backend/src/middleware/auth.js` — JWT + RBAC middleware
6. `backend/src/routes/*.routes.js` — 8 módulos API REST documentados
7. `frontend/src/` — React app completa con layouts, páginas, animaciones

## Prompt Engineering Notes
- El rol "Senior Full-Stack Developer" ancló la profundidad técnica
- Las restricciones RBAC forzaron la separación real entre CRUD y read-only
- El formato de entregables medibles evitó respuestas genéricas
- El contexto de concurrencia y mobile-first determinó decisiones de arquitectura concretas

## Próximos Pasos Sugeridos
1. Generar claves RSA para JWT (`openssl genrsa -out private.pem 2048`)
2. Configurar MinIO/S3 para uploads
3. Implementar WebSocket para notificaciones en tiempo real
4. Agregar tests E2E con Playwright
5. Configurar CI/CD con GitHub Actions
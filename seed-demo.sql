-- ==========================================================================
-- Seed: Cuentas de demostración de la intranet escolar.
--
-- Ejecutar DESPUÉS de postgre.sql (requiere las tablas ya creadas). Es
-- idempotente: puede ejecutarse varias veces sin duplicar registros.
--
-- Nota: estos usuarios son los equivalentes en base de datos de las cuentas
-- definidas en src/config/demoAccounts.js. Si el backend aún no está disponible
-- (o estos usuarios no existen), la app cae automáticamente en "modo demo" y
-- cualquiera de estos correos igualmente permite entrar.
--
-- Contraseñas demo (cambiar hashes con el backend arrancado):
--   docente@  -> 654321
--   profesor@ -> 126534
--   staff@    -> 109816
--   estudiante@ -> 220330
--   familiar@ -> admin2022227
--
-- NOTA: Los hashes de abajo corresponden a la contraseña anterior (123456).
-- Regenera los hashes Argon2id para estas claves antes de usarlo en el backend,
-- por ejemplo con:  node -e "await import('argon2').then(async a=>console.log(await a.hash('PASS')))"
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1) Usuarios principales
-- --------------------------------------------------------------------------
INSERT INTO usuarios (email, password_hash, nombre, apellido, rol, activo)
VALUES
  ('docente@colegio.edu',
   '$argon2id$v=19$m=65536,p=4,t=3$bRkqCj92hm/fzeX5VX/TnA$IrkiUetaI5sSUwGyLDS8T1YBoKwNOB4No1URnt12dL8',
   'Carlos', 'Alvarado', 'staff', TRUE),

  ('profesor@colegio.edu',
   '$argon2id$v=19$m=65536,p=4,t=3$bRkqCj92hm/fzeX5VX/TnA$IrkiUetaI5sSUwGyLDS8T1YBoKwNOB4No1URnt12dL8',
   'Lucía', 'Mendoza', 'staff', TRUE),

  ('staff@colegio.edu',
   '$argon2id$v=19$m=65536,p=4,t=3$bRkqCj92hm/fzeX5VX/TnA$IrkiUetaI5sSUwGyLDS8T1YBoKwNOB4No1URnt12dL8',
   'Andrea', 'Ramírez', 'staff', TRUE),

  ('estudiante@colegio.edu',
   '$argon2id$v=19$m=65536,p=4,t=3$bRkqCj92hm/fzeX5VX/TnA$IrkiUetaI5sSUwGyLDS8T1YBoKwNOB4No1URnt12dL8',
   'Mariana', 'Fonseca', 'estudiante', TRUE),

  ('familiar@colegio.edu',
   '$argon2id$v=19$m=65536,p=4,t=3$bRkqCj92hm/fzeX5VX/TnA$IrkiUetaI5sSUwGyLDS8T1YBoKwNOB4No1URnt12dL8',
   'Ana', 'Fonseca', 'familiar', TRUE)
ON CONFLICT (email) DO NOTHING;

-- --------------------------------------------------------------------------
-- 2) Perfiles de docentes (tabla docentes)
-- --------------------------------------------------------------------------
INSERT INTO docentes (id_usuario, especialidad)
SELECT id, 'Matemáticas'      FROM usuarios WHERE email = 'docente@colegio.edu'
UNION ALL
SELECT id, 'Ciencias Naturales' FROM usuarios WHERE email = 'profesor@colegio.edu'
UNION ALL
SELECT id, 'Administración'   FROM usuarios WHERE email = 'staff@colegio.edu'
ON CONFLICT (id_usuario) DO NOTHING;

-- --------------------------------------------------------------------------
-- 3) Perfil de estudiante (tabla estudiantes) y su vínculo familiar
-- --------------------------------------------------------------------------
INSERT INTO estudiantes (id_usuario, grado, grupo, tutor_legal_id)
SELECT es.id, '5to', 'B',
       (SELECT id FROM usuarios WHERE email = 'familiar@colegio.edu')
FROM usuarios es
WHERE es.email = 'estudiante@colegio.edu'
ON CONFLICT (id_usuario) DO NOTHING;

-- --------------------------------------------------------------------------
-- VERIFICACIÓN: qué usuarios demo existen
-- --------------------------------------------------------------------------
-- SELECT id, email, nombre, apellido, rol FROM usuarios
-- WHERE email IN ('docente@colegio.edu','profesor@colegio.edu','staff@colegio.edu',
--                 'estudiante@colegio.edu','familiar@colegio.edu')
-- ORDER BY rol, email;

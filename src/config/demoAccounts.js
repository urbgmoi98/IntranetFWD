// ==========================================================================
// Cuentas de demostración de la intranet escolar.
//
// Cualquier correo de este listado (junto con su contraseña) permite entrar
// en "modo demo", garantizando que la intranet siempre sea navegable:
//  - si el backend no está disponible (error de red), o
//  - si el backend responde "credenciales incorrectas" (usuario aún no creado).
//
// Los roles disponibles en la app son:
//   'staff'      -> panel de docente / personal (CRUD)
//   'estudiante' -> portal de estudiante / familia (solo lectura)
// ==========================================================================

export const DEMO_ACCOUNTS = [
  // ---- Personal / Staff ----
  {
    email: 'docente@colegio.edu',
    password: '123456',
    rol: 'staff',
    nombre: 'Carlos',
    apellido: 'Alvarado',
    etiqueta: '👩‍🏫 Docente',
  },
  {
    email: 'profesor@colegio.edu',
    password: '123456',
    rol: 'staff',
    nombre: 'Lucía',
    apellido: 'Mendoza',
    etiqueta: '👨‍🏫 Profesor',
  },
  {
    email: 'staff@colegio.edu',
    password: '123456',
    rol: 'staff',
    nombre: 'Andrea',
    apellido: 'Ramírez',
    etiqueta: '🧑‍💼 Staff / Admin',
  },

  // ---- Estudiantes / Familias ----
  {
    email: 'estudiante@colegio.edu',
    password: '123456',
    rol: 'estudiante',
    nombre: 'Mariana',
    apellido: 'Fonseca',
    etiqueta: '🎓 Estudiante',
  },
  {
    email: 'familiar@colegio.edu',
    password: '123456',
    rol: 'estudiante',
    nombre: 'Ana',
    apellido: 'Fonseca',
    etiqueta: '👪 Familiar',
  },
];

/** Copia mínima de una cuenta (sin exponer la contraseña en el estado). */
export const toUser = (acc) => ({
  id: acc.id ?? 1,
  nombre: acc.nombre,
  apellido: acc.apellido,
  email: acc.email,
  rol: acc.rol,
});

/** Devuelve la cuenta demo que coincida con el correo dado (o undefined). */
export const findDemoAccount = (email) =>
  DEMO_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === String(email || '').toLowerCase()
  );

/** true si correo+contraseña coinciden con una cuenta demo. */
export const isDemoAccount = (email, password) =>
  DEMO_ACCOUNTS.some(
    (acc) =>
      acc.email.toLowerCase() === String(email || '').toLowerCase() &&
      acc.password === password
  );

/**
 * Construye un usuario de demostración a partir de un correo.
 * Si el correo figura en DEMO_ACCOUNTS, usa esos datos; en caso contrario
 * infiere el rol según las palabras del correo.
 */
export const buildDemoUser = (email) => {
  const account = findDemoAccount(email);
  if (account) return toUser(account);

  const lower = String(email || '').toLowerCase();
  const isStaff =
    lower.includes('docente') ||
    lower.includes('staff') ||
    lower.includes('profesor') ||
    lower.includes('admin');
  if (isStaff) {
    return { id: 1, nombre: 'Carlos', apellido: 'Alvarado', email, rol: 'staff' };
  }
  return { id: 2, nombre: 'Mariana', apellido: 'Fonseca', email, rol: 'estudiante' };
};

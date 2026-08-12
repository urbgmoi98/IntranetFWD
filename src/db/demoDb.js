// ==========================================================================
// Base de datos demo (persistencia en localStorage).
//
// Permite que cada CRUD del "Panel de Control" (calificaciones, asistencia,
// circulares y reservas) se guarde de forma persistente aunque el backend no
// esté disponible. Actúa como un mini-ORM estilo tablas:
//
//   demoDb.get('grades')        -> lectura
//   demoDb.insert('grades', x)  -> alta (prepende y asigna id)
//   demoDb.remove('grades', id) -> borrado
//
// Cada colección se guarda bajo una clave propia en localStorage para que
// sobreviva a recargas del navegador y sea compartida entre secciones.
// ==========================================================================

const KEYS = {
  grades: 'intranet_demo_grades',
  attendance: 'intranet_demo_attendance',
  circulars: 'intranet_demo_circulars',
  reservations: 'intranet_demo_reservations',
};

/** Lee una colección del almacenamiento local (siempre devuelve un array). */
const read = (collection) => {
  try {
    const raw = localStorage.getItem(KEYS[collection]);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/** Guarda una colección completa en el almacenamiento local. */
const write = (collection, list) => {
  localStorage.setItem(KEYS[collection], JSON.stringify(list));
};

export const demoDb = {
  /** Devuelve todos los registros de una colección. */
  get(collection) {
    return read(collection);
  },

  /**
   * Inserta un nuevo registro al inicio de la colección y le asigna un id
   * numérico, además de etiquetas de auditoría (created_at).
   */
  insert(collection, record) {
    const list = read(collection);
    const item = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString(),
      ...record,
    };
    list.unshift(item);
    write(collection, list);
    return item;
  },

  /** Elimina un registro por id. Devuelve true si existía. */
  remove(collection, idToRemove) {
    const list = read(collection);
    const next = list.filter((r) => r.id !== idToRemove);
    if (next.length === list.length) return false;
    write(collection, next);
    return true;
  },

  /** Vacía por completo una colección. */
  clear(collection) {
    write(collection, []);
  },

  /**
   * Concurrencia optimista para reservas: detecta si ya existe una reserva
   * para la misma aula, fecha e intervalo de tiempo.
   */
  hasConflict(aulaId, fecha, horaInicio, horaFin) {
    const normalize = (t) => String(t || '').slice(0, 5);
    return read('reservations').some(
      (r) =>
        r.aula_id === aulaId &&
        r.fecha === fecha &&
        normalize(r.hora_inicio) === normalize(horaInicio) &&
        (normalize(r.hora_fin) === normalize(horaFin) ||
          normalize(r.hora_inicio) === normalize(horaFin))
    );
  },
};
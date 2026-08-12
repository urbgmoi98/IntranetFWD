-- Crear extensiones si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('staff','estudiante','familiar')),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla estudiantes
CREATE TABLE estudiantes (
    id_usuario INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    grado VARCHAR(20),
    grupo VARCHAR(10),
    tutor_legal_id INT REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla docentes
CREATE TABLE docentes (
    id_usuario INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    especialidad VARCHAR(100)
);

-- Tabla materias
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    docente_id INT REFERENCES docentes(id_usuario) ON DELETE SET NULL
);

-- Tabla grados
CREATE TABLE grados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    año_lectivo VARCHAR(10)
);

-- Tabla aulas
CREATE TABLE aulas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    capacidad INT,
    recursos TEXT[]
);

-- Tabla reservas_aulas (con control de concurrencia optimista)
CREATE TABLE reservas_aulas (
    id SERIAL PRIMARY KEY,
    aula_id INT REFERENCES aulas(id) ON DELETE CASCADE,
    docente_id INT REFERENCES docentes(id_usuario) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente','confirmada','cancelada')),
    version INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_reserva UNIQUE (aula_id, fecha, hora_inicio, hora_fin)
);

-- Tabla clases
CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    materia_id INT REFERENCES materias(id) ON DELETE CASCADE,
    grado_id INT REFERENCES grados(id) ON DELETE CASCADE,
    dia_semana INT CHECK (dia_semana BETWEEN 1 AND 7),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    aula_id INT REFERENCES aulas(id) ON DELETE SET NULL
);

-- Tabla calificaciones
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    estudiante_id INT REFERENCES estudiantes(id_usuario) ON DELETE CASCADE,
    materia_id INT REFERENCES materias(id) ON DELETE CASCADE,
    periodo VARCHAR(20) NOT NULL,
    nota DECIMAL(4,2) CHECK (nota BETWEEN 0 AND 10),
    observacion TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(estudiante_id, materia_id, periodo)
);

-- Tabla asistencia
CREATE TABLE asistencia (
    id SERIAL PRIMARY KEY,
    estudiante_id INT REFERENCES estudiantes(id_usuario) ON DELETE CASCADE,
    clase_id INT REFERENCES clases(id) ON DELETE SET NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('presente','ausente','tardanza')),
    justificacion TEXT,
    UNIQUE(estudiante_id, fecha, clase_id)
);

-- Tabla circulares
CREATE TABLE circulares (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    autor_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    publicada BOOLEAN DEFAULT FALSE,
    fecha_publicacion TIMESTAMP,
    destinatarios TEXT[] -- array de grados o 'todos'
);

-- Tabla tareas_material
CREATE TABLE tareas_material (
    id SERIAL PRIMARY KEY,
    materia_id INT REFERENCES materias(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    archivo_url VARCHAR(255),
    fecha_entrega DATE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('tarea','material'))
);

-- Tabla examenes
CREATE TABLE examenes (
    id SERIAL PRIMARY KEY,
    materia_id INT REFERENCES materias(id) ON DELETE CASCADE,
    grado_id INT REFERENCES grados(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    aula_id INT REFERENCES aulas(id) ON DELETE SET NULL,
    descripcion TEXT
);

-- Índices para performance
CREATE INDEX idx_calificaciones_estudiante ON calificaciones(estudiante_id);
CREATE INDEX idx_asistencia_fecha ON asistencia(fecha);
CREATE INDEX idx_reservas_fecha ON reservas_aulas(fecha);
CREATE INDEX idx_clases_grado ON clases(grado_id);
// ============================================
// DATOS DE USUARIOS PREDEFINIDOS
// ============================================
// Base de datos local de usuarios para autenticación

export const usuarios = [
  {
    id: 1,
    email: "alvaro.sarria@duocuc.cl",
    password: "123456",
    nombres: "Álvaro",
    apellidos: "Sarria González",
    rut: "12.345.678-9",
    telefono: "+56 9 8765 4321",
    fechaNacimiento: "1995-03-15",
    // Dirección de entrega
    calle: "Av. Principal",
    numero: "1234",
    departamento: "Depto. 4B",
    comuna: "Providencia",
    region: "Región Metropolitana",
    codigoPostal: "7500000",
    indicaciones: "Portón verde, tocar timbre azul",
    // Configuración
    recibirPromociones: true,
    fechaRegistro: "2024-01-15T10:30:00Z",
    ultimoLogin: null
  },
  {
    id: 2,
    email: "maria.gonzalez@email.com",
    password: "password123",
    nombres: "María José",
    apellidos: "González Pérez",
    rut: "98.765.432-1",
    telefono: "+56 9 1234 5678",
    fechaNacimiento: "1988-07-22",
    // Dirección de entrega
    calle: "Calle Los Aromos",
    numero: "567",
    departamento: "",
    comuna: "Las Condes",
    region: "Región Metropolitana",
    codigoPostal: "7550000",
    indicaciones: "Casa con jardín frontal",
    // Configuración
    recibirPromociones: false,
    fechaRegistro: "2024-02-10T14:20:00Z",
    ultimoLogin: null
  },
  {
    id: 3,
    email: "carlos.rodriguez@gmail.com",
    password: "mipassword",
    nombres: "Carlos Alberto",
    apellidos: "Rodríguez Soto",
    rut: "15.678.432-5",
    telefono: "+56 9 5555 7777",
    fechaNacimiento: "1992-11-08",
    // Dirección de entrega
    calle: "Pasaje San Martín",
    numero: "89",
    departamento: "Casa 3",
    comuna: "Ñuñoa",
    region: "Región Metropolitana",
    codigoPostal: "7800000",
    indicaciones: "Al final del pasaje, casa amarilla",
    // Configuración
    recibirPromociones: true,
    fechaRegistro: "2024-03-05T09:45:00Z",
    ultimoLogin: null
  },
  {
    id: 4,
    email: "ana.martinez@hotmail.com",
    password: "ana2024",
    nombres: "Ana Sofía",
    apellidos: "Martínez López",
    rut: "20.123.456-8",
    telefono: "+56 9 9999 1111",
    fechaNacimiento: "1990-05-17",
    // Dirección de entrega
    calle: "Av. Libertador",
    numero: "2345",
    departamento: "Torre A, Piso 12",
    comuna: "Vitacura",
    region: "Región Metropolitana",
    codigoPostal: "7630000",
    indicaciones: "Edificio con portería 24 horas",
    // Configuración
    recibirPromociones: true,
    fechaRegistro: "2024-01-28T16:15:00Z",
    ultimoLogin: null
  },
  {
    id: 5,
    email: "test@test.com",
    password: "test123",
    nombres: "Usuario",
    apellidos: "De Prueba",
    rut: "11.111.111-1",
    telefono: "+56 9 1111 1111",
    fechaNacimiento: "1985-01-01",
    // Dirección de entrega
    calle: "Calle Test",
    numero: "123",
    departamento: "",
    comuna: "Santiago",
    region: "Región Metropolitana",
    codigoPostal: "8320000",
    indicaciones: "Usuario para pruebas del sistema",
    // Configuración
    recibirPromociones: false,
    fechaRegistro: "2024-04-01T12:00:00Z",
    ultimoLogin: null
  }
];

// Función para buscar usuario por email
export const buscarUsuarioPorEmail = (email) => {
  return usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());
};

// Función para validar credenciales
export const validarCredenciales = (email, password) => {
  const usuario = buscarUsuarioPorEmail(email);
  if (usuario && usuario.password === password) {
    return { ...usuario, password: undefined }; // No devolver la contraseña
  }
  return null;
};

// Función para obtener usuario por ID
export const obtenerUsuarioPorId = (id) => {
  return usuarios.find(usuario => usuario.id === id);
};

// Exportar por defecto
export default usuarios;
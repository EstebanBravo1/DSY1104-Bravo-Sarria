// ============================================
// CONTEXTO DE AUTENTICACIÓN
// ============================================
// Manejo global del estado de autenticación

import React, { createContext, useContext, useState, useEffect } from 'react';
import { validarCredenciales } from '../data/usuarios';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      try {
        const usuarioData = JSON.parse(usuarioGuardado);
        setUsuario(usuarioData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error al cargar usuario guardado:', error);
        localStorage.removeItem('usuarioLogueado');
      }
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (email, password) => {
    const usuarioValidado = validarCredenciales(email, password);
    
    if (usuarioValidado) {
      // Actualizar último login
      const usuarioConLogin = {
        ...usuarioValidado,
        ultimoLogin: new Date().toISOString()
      };
      
      setUsuario(usuarioConLogin);
      setIsLoggedIn(true);
      
      // Guardar en localStorage
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioConLogin));
      
      return { success: true, usuario: usuarioConLogin };
    } else {
      return { 
        success: false, 
        error: 'Email o contraseña incorrectos' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
    setIsLoggedIn(false);
    localStorage.removeItem('usuarioLogueado');
  };

  // Función para actualizar datos del usuario
  const actualizarUsuario = (nuevosData) => {
    const usuarioActualizado = { ...usuario, ...nuevosData };
    setUsuario(usuarioActualizado);
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));
  };

  // Función para verificar si está logueado
  const verificarAutenticacion = () => {
    return isLoggedIn && usuario;
  };

  // Función para obtener datos para autocompletar checkout
  const getDatosCheckout = () => {
    if (!usuario) return null;
    
    return {
      // Datos personales
      nombres: usuario.nombres || '',
      apellidos: usuario.apellidos || '',
      rut: usuario.rut || '',
      email: usuario.email || '',
      telefono: usuario.telefono || '',
      fechaNacimiento: usuario.fechaNacimiento || '',
      
      // Dirección de entrega
      calle: usuario.calle || '',
      numero: usuario.numero || '',
      departamento: usuario.departamento || '',
      comuna: usuario.comuna || '',
      region: usuario.region || '',
      codigoPostal: usuario.codigoPostal || '',
      indicaciones: usuario.indicaciones || '',
      
      // Configuración
      recibirPromociones: usuario.recibirPromociones || false
    };
  };

  const value = {
    // Estado
    usuario,
    isLoggedIn,
    loading,
    
    // Funciones
    login,
    logout,
    actualizarUsuario,
    verificarAutenticacion,
    getDatosCheckout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
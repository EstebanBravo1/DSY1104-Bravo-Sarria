// ============================================
// CONTEXTO DE AUTENTICACIÓN
// ============================================
// Manejo global del estado de autenticación con backend AWS

import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS_API_URL } from '../config/api';

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
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (token && usuarioGuardado) {
      try {
        const usuarioData = JSON.parse(usuarioGuardado);
        setUsuario(usuarioData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error al cargar usuario guardado:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
      }
    }
    setLoading(false);
  }, []);

  // Función para registrar nuevo usuario
  const register = async (datosRegistro) => {
    try {
      const response = await fetch(`${USERS_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosRegistro)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error al registrar usuario');
      }

      const data = await response.json();
      
      console.log('📥 Datos recibidos del backend (register):', data);
      
      // Guardar token y usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data));
      
      setUsuario(data);
      setIsLoggedIn(true);
      
      return { success: true, usuario: data };
    } catch (error) {
      console.error('Error en register:', error);
      return { 
        success: false, 
        error: error.message || 'Error al registrar usuario'
      };
    }
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch(`${USERS_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Credenciales incorrectas');
      }

      const data = await response.json();
      
      console.log('📥 Datos recibidos del backend (login):', data);
      
      // Guardar token y usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data));
      
      setUsuario(data);
      setIsLoggedIn(true);
      
      return { success: true, usuario: data };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: error.message || 'Error al iniciar sesión'
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  // Función para actualizar perfil
  const actualizarPerfil = async (id, nuevosData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${USERS_API_URL}/profile/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevosData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error al actualizar perfil');
      }

      const data = await response.json();
      
      // Actualizar usuario en estado y localStorage
      localStorage.setItem('usuario', JSON.stringify(data));
      setUsuario(data);
      
      return { success: true, usuario: data };
    } catch (error) {
      console.error('Error en actualizarPerfil:', error);
      return { 
        success: false, 
        error: error.message || 'Error al actualizar perfil'
      };
    }
  };

  // Función para verificar si está logueado
  const verificarAutenticacion = () => {
    return isLoggedIn && usuario;
  };

  // Función para obtener el token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Función para obtener datos para autocompletar checkout
  const getDatosCheckout = () => {
    if (!usuario) return null;
    
    console.log('🔍 Usuario completo en getDatosCheckout:', usuario);
    
    const datos = {
      nombre: usuario.nombre || '',
      apellidos: usuario.apellido || '',
      rut: usuario.rut || '',
      email: usuario.email || '',
      telefono: usuario.telefono || ''
    };
    
    console.log('📋 Datos para checkout:', datos);
    
    return datos;
  };

  const value = {
    // Estado
    usuario,
    isLoggedIn,
    loading,
    
    // Funciones
    register,
    login,
    logout,
    actualizarPerfil,
    verificarAutenticacion,
    getToken,
    getDatosCheckout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
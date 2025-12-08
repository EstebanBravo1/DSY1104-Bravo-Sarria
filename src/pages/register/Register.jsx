// ============================================
// PÁGINA DE REGISTRO
// ============================================

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido: '',
    rut: '',
    telefono: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  // Validar RUT chileno
  const validarRUT = (rut) => {
    // Eliminar puntos y guión
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');
    
    if (rutLimpio.length < 8) return false;
    
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
    
    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    const dvCalculado = 11 - (suma % 11);
    const dvFinal = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString();
    
    return dv === dvFinal;
  };

  // Formatear RUT mientras se escribe
  const formatearRUT = (valor) => {
    // Eliminar todo excepto números y K
    const limpio = valor.replace(/[^0-9kK]/g, '');
    
    if (limpio.length <= 1) return limpio;
    
    // Separar cuerpo y dígito verificador
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    
    // Formatear cuerpo con puntos
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${cuerpoFormateado}-${dv}`;
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let valorFinal = value;
    
    // Formatear RUT
    if (name === 'rut') {
      valorFinal = formatearRUT(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: valorFinal
    }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validar nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    
    // Validar apellido
    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es requerido';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'Email inválido';
    }
    
    // Validar RUT
    if (!formData.rut.trim()) {
      nuevosErrores.rut = 'El RUT es requerido';
    } else if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido';
    }
    
    // Validar teléfono
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[0-9]{8,12}$/.test(formData.telefono.replace(/\s/g, ''))) {
      nuevosErrores.telefono = 'Teléfono inválido (8-12 dígitos)';
    }
    
    // Validar contraseña
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      nuevosErrores.confirmPassword = 'Debes confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral('');
    
    if (!validarFormulario()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Preparar datos para el backend (sin confirmPassword)
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...datosRegistro } = formData;
      
      const resultado = await register(datosRegistro);
      
      if (resultado.success) {
        // Redirigir a la página principal
        navigate('/');
      } else {
        setErrorGeneral(resultado.error);
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setErrorGeneral('Error al registrar usuario. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Lado izquierdo - Welcome */}
      <div className="register-welcome">
        <h1>Únete a<br />Nuestra Familia</h1>
        <p>Crea tu cuenta y disfruta de productos frescos, naturales y orgánicos directo del campo a tu mesa.</p>
        <div className="register-benefits">
          <div className="benefit-item">
            <i className="ri-check-double-line"></i>
            <span>Productos 100% Orgánicos</span>
          </div>
          <div className="benefit-item">
            <i className="ri-check-double-line"></i>
            <span>Entrega Rápida y Segura</span>
          </div>
          <div className="benefit-item">
            <i className="ri-check-double-line"></i>
            <span>Ofertas Exclusivas</span>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="register-card">
        <h1>Crear Cuenta</h1>
        <p className="register-subtitle">Regístrate para comenzar a comprar</p>
        
        {errorGeneral && (
          <div className="alert alert-error">
            {errorGeneral}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? 'input-error' : ''}
                placeholder="Juan"
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={errors.apellido ? 'input-error' : ''}
                placeholder="Pérez"
              />
              {errors.apellido && <span className="error-message">{errors.apellido}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="tu@email.com"
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rut">RUT *</label>
              <input
                type="text"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                className={errors.rut ? 'input-error' : ''}
                placeholder="12.345.678-9"
                maxLength="12"
              />
              {errors.rut && <span className="error-message">{errors.rut}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={errors.telefono ? 'input-error' : ''}
                placeholder="912345678"
              />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              placeholder="Repite tu contraseña"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary btn-register"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;

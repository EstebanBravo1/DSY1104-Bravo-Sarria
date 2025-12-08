// ============================================
// PÁGINA DE INICIO DE SESIÓN
// ============================================

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    // Validar email
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'Email inválido';
    }
    
    // Validar contraseña
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es requerida';
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
      const resultado = await login(formData.email, formData.password);
      
      if (resultado.success) {
        // Redirigir a la página principal o a donde venía
        navigate('/');
      } else {
        setErrorGeneral(resultado.error);
      }
    } catch (error) {
      console.error('Error en login:', error);
      setErrorGeneral('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Lado izquierdo - Welcome */}
      <div className="login-welcome">
        <h1>Bienvenido<br />de Vuelta</h1>
        <p>Inicia sesión para acceder a tu cuenta y disfrutar de nuestros productos frescos y naturales.</p>
        <div className="login-social-links">
          <a href="#" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
          <a href="#" aria-label="Twitter"><i className="ri-twitter-fill"></i></a>
          <a href="#" aria-label="Instagram"><i className="ri-instagram-fill"></i></a>
          <a href="#" aria-label="YouTube"><i className="ri-youtube-fill"></i></a>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="login-card">
        <h1>Sign in</h1>
        <p className="login-subtitle">Ingresa tus credenciales</p>
        
        {errorGeneral && (
          <div className="alert alert-error">
            {errorGeneral}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#" className="forgot-link">Lost your password?</a>
          </div>
          
          <button 
            type="submit" 
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in now'}
          </button>
        </form>
        
        <div className="login-footer">
          <p style={{ fontSize: '0.9rem', color: '#718096' }}>
            By clicking on "Sign in now" you agree to <br />
            <Link to="/terms" style={{ color: '#4caf50' }}>Terms of Service</Link> | <Link to="/privacy" style={{ color: '#4caf50' }}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

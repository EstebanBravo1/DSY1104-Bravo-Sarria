import React from 'react';
import 'Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h1>Huerto Hogar</h1>
            </div>

            <nav className="nav">
                <ul className="nav-list">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#productos">Productos</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </nav>

            <div className="header-actions">
                <button className="login-btn">Iniciar Sesión</button>
                <button className="signup-btn">Registrarse</button>
                <button className="cart-btn">Carrito</button>
            </div>
        </header>
    )
}
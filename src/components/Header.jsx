import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <h1>Huerto Hogar</h1>
                </Link>
            </div>

            <nav className="nav">
                <ul className="nav-list">
                    <li><Link to="/" className={isActive('/')}>Inicio</Link></li>
                    <li><Link to="/productos" className={isActive('/productos')}>Productos</Link></li>
                    <li><Link to="/blog" className={isActive('/blog')}>Blog</Link></li>
                    <li><Link to="/contacto" className={isActive('/contacto')}>Contacto</Link></li>
                </ul>
            </nav>

            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>


            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-list">
                    <li><Link to="/" className={isActive('/')} onClick={toggleMenu}>Inicio</Link></li>
                    <li><Link to="/productos" className={isActive('/productos')} onClick={toggleMenu}>Productos</Link></li>
                    <li><Link to="/blog" className={isActive('/blog')} onClick={toggleMenu}>Blog</Link></li>
                    <li><Link to="/contacto" className={isActive('/contacto')} onClick={toggleMenu}>Contacto</Link></li>
                </ul>
            </div>

            <div className='header-actions'>
                <Link to="/login" className="login-button">Iniciar Sesión</Link>
                <Link to="/register" className="register-button">Registrarse</Link>
                <Link to="/cart" className="cart-button">🛒</Link>
            </div>
        </header>
    )
}
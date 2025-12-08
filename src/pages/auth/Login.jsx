import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowAlert(false);

        try {
            const resultado = login(formData.email, formData.password);
            
            if (resultado.success) {
                setAlertType('success');
                setAlertMessage(`¡Bienvenido ${resultado.usuario.nombres}! Redirigiendo...`);
                setShowAlert(true);
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setAlertType('danger');
                setAlertMessage(resultado.error || 'Error al iniciar sesión');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error en login:', error);
            setAlertType('danger');
            setAlertMessage('Error del sistema. Intenta nuevamente.');
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={5} md={7}>
                        <Card className="auth-card">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <h2 className="auth-title">Bienvenido de nuevo</h2>
                                    <p className="auth-subtitle">Ingresa a tu cuenta Frescura Natural</p>
                                </div>

                                {showAlert && (
                                    <Alert variant={alertType} className="text-center">
                                        {alertMessage}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Correo electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="tu@email.com"
                                            required
                                            className="auth-input"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Ingresa tu contraseña"
                                            required
                                            className="auth-input"
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Recordarme" 
                                            className="auth-remember"
                                        />
                                        <Link to="/forgot-password" className="auth-link">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="auth-button w-100 mb-3"
                                        size="lg"
                                        disabled={loading}
                                    >
                                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                    </Button>

                                    <div className="text-center">
                                        <span className="auth-divider">¿No tienes cuenta? </span>
                                        <Link to="/register" className="auth-link">
                                            Regístrate aquí
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (!formData.acceptTerms) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }

        // Aquí iría la lógica de registro
        console.log('Register attempt:', formData);
        
        // Simulación de registro exitoso
        setShowAlert(true);
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    return (
        <div className="auth-page">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={6} md={8}>
                        <Card className="auth-card">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <h2 className="auth-title">Únete a Frescura Natural</h2>
                                    <p className="auth-subtitle">Crea tu cuenta y disfruta de productos orgánicos</p>
                                </div>

                                {showAlert && (
                                    <Alert variant="success" className="text-center">
                                        ¡Registro exitoso! Redirigiendo al login...
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    placeholder="Tu nombre"
                                                    required
                                                    className="auth-input"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Tu apellido"
                                                    required
                                                    className="auth-input"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

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

                                    <Form.Group className="mb-3">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Crea una contraseña segura"
                                            required
                                            className="auth-input"
                                        />
                                        <Form.Text className="text-muted">
                                            Mínimo 8 caracteres, incluye mayúsculas y números
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Confirmar Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Repite tu contraseña"
                                            required
                                            className="auth-input"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Check 
                                            type="checkbox"
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={handleChange}
                                            label={
                                                <span>
                                                    Acepto los{' '}
                                                    <Link to="/terminos" className="auth-link">
                                                        Términos y Condiciones
                                                    </Link>{' '}
                                                    y la{' '}
                                                    <Link to="/privacidad" className="auth-link">
                                                        Política de Privacidad
                                                    </Link>
                                                </span>
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        type="submit" 
                                        className="auth-button w-100 mb-3"
                                        size="lg"
                                    >
                                        Crear Cuenta
                                    </Button>

                                    <div className="text-center">
                                        <span className="auth-divider">¿Ya tienes cuenta? </span>
                                        <Link to="/login" className="auth-link">
                                            Inicia sesión aquí
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

export default Register;

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar email de recuperación
        console.log('Password recovery for:', email);
        
        // Simulación de envío exitoso
        setShowAlert(true);
        setIsSubmitted(true);
    };

    return (
        <div className="auth-page">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={5} md={7}>
                        <Card className="auth-card">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <h2 className="auth-title">Recuperar Contraseña</h2>
                                    <p className="auth-subtitle">
                                        {!isSubmitted 
                                            ? "Te enviaremos un enlace para restablecer tu contraseña" 
                                            : "Revisa tu correo electrónico"
                                        }
                                    </p>
                                </div>

                                {showAlert && (
                                    <Alert variant="info" className="text-center">
                                        <i className="fas fa-envelope me-2"></i>
                                        Hemos enviado un enlace de recuperación a tu email
                                    </Alert>
                                )}

                                {!isSubmitted ? (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Correo electrónico</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="tu@email.com"
                                                required
                                                className="auth-input"
                                            />
                                            <Form.Text className="text-muted">
                                                Ingresa el email asociado a tu cuenta
                                            </Form.Text>
                                        </Form.Group>

                                        <Button 
                                            type="submit" 
                                            className="auth-button w-100 mb-3"
                                            size="lg"
                                        >
                                            Enviar Enlace de Recuperación
                                        </Button>

                                        <div className="text-center">
                                            <Link to="/login" className="auth-link">
                                                ← Volver al inicio de sesión
                                            </Link>
                                        </div>
                                    </Form>
                                ) : (
                                    <div className="text-center">
                                        <div className="success-icon mb-3">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <p className="mb-4">
                                            Si el email <strong>{email}</strong> existe en nuestro sistema, 
                                            recibirás un enlace para restablecer tu contraseña en los próximos minutos.
                                        </p>
                                        <div className="d-grid gap-2">
                                            <Link to="/login" className="auth-link">
                                                Volver al inicio de sesión
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPassword;

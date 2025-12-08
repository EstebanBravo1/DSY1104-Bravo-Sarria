import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function ErrorPage() {
  const error = useRouteError();
  console.error("Error capturado por React Router:", error);

  return (
    <Container className="text-center mt-5 pt-5">
      <h1 className="display-1 text-danger">¡Ups!</h1>
      <h2 className="mb-4">Algo salió mal al cargar la página.</h2>

      <div className="alert alert-warning">
        {error.statusText || error.message || "Error desconocido"}
      </div>

      <p className="text-muted">
        Puede que el servidor Backend no esté respondiendo o hubo un error de conexión.
      </p>

      <Button as={Link} to="/" variant="primary" size="lg">
        Volver al Inicio
      </Button>
    </Container>
  );
}
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm);
  };

  return (
    <div className="search-bar-block">
      <Container>
        <Form className="search-bar-container" onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <Button type="submit" className="search-btn">
            Buscar
          </Button>
        </Form>
      </Container>
    </div>
  );
}
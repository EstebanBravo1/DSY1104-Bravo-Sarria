import "./Contacto.css";

function Contacto() {
    return (
        <div className="container-full">
            <header className="header-contacto">
                <div className="container">
                    <h1>Contáctanos</h1>
                    <p>
                        Estamos aquí para ayudarte con tus consultas sobre nuestras frutas y
                        verduras frescas
                    </p>
                </div>
            </header>

            <main className="main-contacto">
                <div className="container">
                    {/* Información de contacto */}
                    <section className="info-contacto">
                        <div className="info-grid">
                            <div className="info-card">
                                <div className="info-icon">
                                    <i className="ri-map-pin-line"></i>
                                </div>
                                <h3>Dirección</h3>
                                <p>
                                    Av. Providencia 1234
                                    <br />
                                    Santiago, Chile
                                    <br />
                                    Código Postal: 7500000
                                </p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <i className="ri-phone-line"></i>
                                </div>
                                <h3>Teléfono</h3>
                                <p>
                                    +56 9 1234 5678
                                    <br />
                                    +56 2 2234 5678
                                    <br />
                                    Lunes a Viernes: 8:00 - 18:00
                                </p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <i className="ri-mail-line"></i>
                                </div>
                                <h3>Email</h3>
                                <p>
                                    info@frutasyverduras.cl
                                    <br />
                                    ventas@frutasyverduras.cl
                                    <br />
                                    soporte@frutasyverduras.cl
                                </p>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <i className="ri-time-line"></i>
                                </div>
                                <h3>Horarios</h3>
                                <p>
                                    Lunes a Viernes: 8:00 - 20:00
                                    <br />
                                    Sábados: 9:00 - 18:00
                                    <br />
                                    Domingos: 10:00 - 16:00
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Formulario de contacto */}
                    <section className="formulario-contacto">
                        <div className="form-container">
                            <div className="form-header">
                                <h2>Envíanos un mensaje</h2>
                                <p>
                                    Completa el formulario y nos pondremos en contacto contigo lo
                                    antes posible
                                </p>
                            </div>

                            <form className="contact-form" id="contactForm">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre *</label>
                                        <input type="text" id="nombre" name="nombre" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="apellido">Apellido *</label>
                                        <input type="text" id="apellido" name="apellido" required />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="rut">RUT *</label>
                                        <input
                                            type="text"
                                            id="rut"
                                            name="rut"
                                            maxLength="12"
                                            pattern="[0-9kK\.-]{9,12}"
                                            required
                                            placeholder="Ej: 12.345.678-5"
                                        />
                                        <span className="error-message" id="rutError"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telefono">Teléfono *</label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            maxLength="9"
                                            pattern="[0-9]{9}"
                                            required
                                            placeholder="Ej: 912345678"
                                        />
                                        <span className="error-message" id="telefonoError"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="asunto">Asunto *</label>
                                    <select id="asunto" name="asunto" required>
                                        <option value="">Selecciona un asunto</option>
                                        <option value="consulta-productos">Consulta sobre productos</option>
                                        <option value="pedido-especial">Pedido especial</option>
                                        <option value="reclamo">Reclamo</option>
                                        <option value="sugerencia">Sugerencia</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mensaje">Mensaje *</label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        rows={6}
                                        placeholder="Escribe tu mensaje aquí..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input type="checkbox" id="newsletter" name="newsletter" />
                                        <span className="checkmark"></span>
                                        Quiero recibir ofertas y novedades por email
                                    </label>
                                </div>

                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input type="checkbox" id="terminos" name="terminos" required />
                                        <span className="checkmark"></span>
                                        Acepto los <a href="#">términos y condiciones</a> *
                                    </label>
                                </div>

                                <button type="submit" className="btn-enviar">
                                    <i className="ri-send-plane-line"></i>
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Mapa */}
                    <section className="mapa-section">
                        <div className="mapa-container">
                            <h2>Nuestra Ubicación</h2>
                            <div className="mapa-placeholder">
                                <i className="ri-map-pin-fill"></i>
                                <p>
                                    Mapa interactivo
                                    <br />
                                    <small>Av. Providencia 1234, Santiago</small>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="faq-section">
                        <h2>Preguntas Frecuentes</h2>
                        <div className="faq-container">
                            <div className="faq-item">
                                <div className="faq-question">
                                    <h3>¿Hacen delivery?</h3>
                                    <i className="ri-arrow-down-s-line"></i>
                                </div>
                                <div className="faq-answer">
                                    <p>
                                        Sí, realizamos entregas a domicilio en Santiago y comunas
                                        aledañas. Los pedidos mínimos y costos de envío varían según
                                        la zona.
                                    </p>
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">
                                    <h3>¿Cómo garantizan la frescura?</h3>
                                    <i className="ri-arrow-down-s-line"></i>
                                </div>
                                <div className="faq-answer">
                                    <p>
                                        Trabajamos directamente con productores locales y recibimos
                                        mercadería fresca diariamente. Además, mantenemos cadena de
                                        frío en todos nuestros productos.
                                    </p>
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">
                                    <h3>¿Aceptan pedidos al por mayor?</h3>
                                    <i className="ri-arrow-down-s-line"></i>
                                </div>
                                <div className="faq-answer">
                                    <p>
                                        Absolutamente. Ofrecemos precios especiales para
                                        restaurantes, hoteles y otros negocios. Contáctanos para más
                                        información sobre nuestros planes corporativos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Contacto;
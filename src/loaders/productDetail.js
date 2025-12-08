// src/loaders/productDetail.js
import { PRODUCTS_API_URL } from '../config/api.js';

export async function productDetailLoader({ params }) {
    // El 'params.id' es el código del producto (ej: FR001) que viene de la URL
    const codigo = params.id;

    try {
        // Llamada al endpoint específico que creamos en Spring Boot
        const response = await fetch(`${PRODUCTS_API_URL}/codigo/${codigo}`);

        if (!response.ok) {
            throw new Response("Producto no encontrado", { status: 404 });
        }

        const producto = await response.json();

        return { producto };

    } catch (error) {
        console.error("Error cargando detalle:", error);
        throw error;
    }
}
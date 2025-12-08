// src/loaders/products.js
import { PRODUCTS_API_URL } from '../config/api.js';

export async function productsLoader({ request }) {
    // URL de tu Backend Spring Boot desde configuración centralizada
    const API_URL = PRODUCTS_API_URL;

    try {
        const url = new URL(request.url);
        const categoria = url.searchParams.get("categoria");

        let fetchUrl = API_URL;
        if (categoria && categoria !== 'all') {
            fetchUrl += `?categoria=${categoria}`;
        }

        console.log("🔗 Conectando a:", fetchUrl);

        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error("Error al conectar con el servidor");
        }

        const data = await response.json();
        console.log("✅ Respuesta completa del backend:", data);
        
        // El backend ahora devuelve un objeto Page con paginación
        // Extraemos el contenido (array de productos) del objeto Page
        const productos = data.content || data;
        console.log("✅ Productos extraídos:", productos);

        return { productos };

    } catch (error) {
        console.error("❌ Error cargando productos:", error);
        return { productos: [] };
    }
}

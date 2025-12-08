// ============================================
// CONFIGURACIÓN DE APIs - MICROSERVICIOS
// ============================================
// Este archivo centraliza las URLs de los diferentes dominios/microservicios

/**
 * Configuración de URLs de los microservicios en AWS EC2
 * 
 * IMPORTANTE: Actualiza estas URLs según tus instancias EC2:
 * - PRODUCTS_API_URL: URL del microservicio de productos
 * - SALES_API_URL: URL del microservicio de ventas
 * - USERS_API_URL: URL del microservicio de autenticación de usuarios
 */

// URL del microservicio de PRODUCTOS (Dominio de Productos) - AWS
export const PRODUCTS_API_URL = "http://34.201.115.114:8080/api/products";

// URL del microservicio de VENTAS (Dominio de Ventas) - AWS (puerto 8081)
export const SALES_API_URL = "http://34.201.115.114:8081/api/sales";

// URL del microservicio de USUARIOS (Dominio de Autenticación) - AWS (puerto 8082)
export const USERS_API_URL = "http://34.201.115.114:8082/api/auth";

// PARA DESARROLLO LOCAL, COMENTAR LAS DE ARRIBA Y DESCOMENTAR:
// export const PRODUCTS_API_URL = "http://localhost:8080/api/products";
// export const SALES_API_URL = "http://localhost:8081/api/sales";
// export const USERS_API_URL = "http://localhost:8082/api/auth";

/**
 * Configuración para desarrollo local (descomenta si usas local)
 * Ambos microservicios locales
 */
// export const PRODUCTS_API_URL = "http://localhost:8080/api/products";
// export const SALES_API_URL = "http://localhost:8081/api/sales";

/**
 * Configuración de timeout para las peticiones
 */
export const API_TIMEOUT = 10000; // 10 segundos

/**
 * Headers comunes para todas las peticiones
 */
export const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

/**
 * Función helper para hacer peticiones con timeout y manejo de errores
 * @param {string} url - URL del endpoint
 * @param {object} options - Opciones de fetch
 * @returns {Promise} - Promesa con la respuesta
 */
export const fetchWithTimeout = async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                ...API_HEADERS,
                ...options.headers
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error('La petición tardó demasiado tiempo. Por favor, verifica tu conexión.');
        }

        throw error;
    }
};

/**
 * Función para verificar la conectividad con un servicio
 * @param {string} url - URL del servicio
 * @returns {Promise<boolean>} - true si el servicio está disponible
 */
export const checkServiceHealth = async (url) => {
    try {
        const response = await fetchWithTimeout(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error(`❌ Servicio no disponible: ${url}`, error);
        return false;
    }
};

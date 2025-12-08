/**
 * Utilidades para manejo de imágenes en el proyecto
 */

/**
 * Construye la ruta correcta para una imagen de producto
 * @param {string} imagenPath - Ruta de imagen desde base de datos
 * @returns {string} - Ruta completa para usar en src
 */
export const getImagePath = (imagenPath) => {
    if (!imagenPath) {
        return '/assets/imagenes/placeholder.svg'; // Imagen por defecto
    }
    
    // Si ya incluye 'imagenes/' al inicio, solo agregar /assets/
    if (imagenPath.startsWith('imagenes/')) {
        return `/assets/${imagenPath}`;
    }
    
    // Si empieza con /, usar tal como está
    if (imagenPath.startsWith('/')) {
        return imagenPath;
    }
    
    // Si no, asumir que es solo el nombre del archivo
    return `/assets/imagenes/${imagenPath}`;
};

/**
 * Construye la ruta para imagen de receta
 * @param {string} imagenPath - Ruta de imagen de receta
 * @returns {string} - Ruta completa para usar en src
 */
export const getRecipeImagePath = (imagenPath) => {
    if (!imagenPath) {
        return '/assets/imagenes/recetas/placeholder.jpg';
    }
    
    if (imagenPath.startsWith('imagenes/recetas/')) {
        return `/assets/${imagenPath}`;
    }
    
    if (imagenPath.startsWith('/')) {
        return imagenPath;
    }
    
    return `/assets/imagenes/recetas/${imagenPath}`;
};

/**
 * Construye la ruta para íconos de categorías
 * @param {string} categoriaId - ID de categoría
 * @returns {string} - Ruta del ícono de categoría
 */
export const getCategoryIcon = (categoriaId) => {
    const iconos = {
        'FR': '/assets/imagenes/iconos/frutas.svg',
        'VR': '/assets/imagenes/iconos/verduras.svg',
        'PO': '/assets/imagenes/iconos/organicos.svg',
        'PL': '/assets/imagenes/iconos/lacteos.svg'
    };
    
    return iconos[categoriaId] || '/assets/imagenes/iconos/default.svg';
};

/**
 * Valida si una imagen existe y está disponible
 * @param {string} imagePath - Ruta de la imagen
 * @returns {Promise<boolean>} - True si existe, false si no
 */
export const validateImageExists = async (imagePath) => {
    try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.warn(`❌ Error validando imagen: ${imagePath}`, error);
        return false;
    }
};

/**
 * Carga una imagen de forma lazy con fallback
 * @param {HTMLImageElement} imgElement - Elemento de imagen
 * @param {string} imagePath - Ruta de la imagen
 * @param {string} fallbackPath - Ruta de fallback
 */
export const loadImageWithFallback = (imgElement, imagePath, fallbackPath = '/assets/imagenes/placeholder.svg') => {
    const img = new Image();
    
    img.onload = () => {
        imgElement.src = imagePath;
        imgElement.classList.add('loaded');
        console.log(`✅ Imagen cargada: ${imagePath}`);
    };
    
    img.onerror = () => {
        console.warn(`❌ Error cargando imagen: ${imagePath}, usando fallback`);
        imgElement.src = fallbackPath;
        imgElement.classList.add('fallback');
    };
    
    img.src = imagePath;
};

// Exportación por defecto con todas las utilidades
export default {
    getImagePath,
    getRecipeImagePath,
    getCategoryIcon,
    validateImageExists,
    loadImageWithFallback
};
import { productos } from '../data';

export async function productDetailLoader({ params }) {
    // Simulamos búsqueda asíncrona en base de datos
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = productos.find(p => p.codigo === params.id);
            
            if (!producto) {
                reject(new Response("Producto no encontrado", { status: 404 }));
            } else {
                resolve({ producto });
            }
        }, 500); // 500ms de delay
    });
}
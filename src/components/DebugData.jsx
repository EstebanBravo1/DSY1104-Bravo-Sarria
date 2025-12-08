import { useLoaderData } from 'react-router-dom';

function DebugData() {
    const { productos } = useLoaderData();
    
    console.log('🔍 DEBUG: Productos desde Supabase:', productos);
    
    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Debug de Datos de Supabase</h1>
            <h3>Total de productos: {productos ? productos.length : 0}</h3>
            
            {productos && productos.slice(0, 3).map((producto, index) => (
                <div key={index} style={{ 
                    border: '1px solid #ccc', 
                    margin: '10px 0', 
                    padding: '10px',
                    backgroundColor: '#f5f5f5'
                }}>
                    <h4>Producto {index + 1}: {producto.nombre}</h4>
                    <p><strong>Código:</strong> {producto.codigo}</p>
                    <p><strong>Imagen:</strong> {producto.imagen}</p>
                    <p><strong>Ruta construida:</strong> /assets/imagenes/{producto.imagen}</p>
                    <p><strong>Categoría ID:</strong> {producto.categoria_id}</p>
                    <p><strong>Precio:</strong> {producto.precio}</p>
                    
                    <div style={{ marginTop: '10px' }}>
                        <strong>Imagen test:</strong><br/>
                        <img 
                            src={`/assets/imagenes/${producto.imagen}`} 
                            alt={producto.nombre}
                            style={{ width: '100px', border: '2px solid red' }}
                            onLoad={() => console.log(`✅ Imagen cargada: ${producto.imagen}`)}
                            onError={() => console.error(`❌ Error cargando: ${producto.imagen}`)}
                        />
                    </div>
                    
                    <details style={{ marginTop: '10px' }}>
                        <summary>JSON completo</summary>
                        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                            {JSON.stringify(producto, null, 2)}
                        </pre>
                    </details>
                </div>
            ))}
        </div>
    );
}

export default DebugData;
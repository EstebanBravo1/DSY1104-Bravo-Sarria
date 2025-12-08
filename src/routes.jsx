import { createBrowserRouter } from 'react-router-dom';
import { productsLoader, productDetailLoader } from './loaders'
import Root from './pages/root';
import Home from './pages/home/home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Producto from './pages/productos/Productos'
import DetalleProducto from './pages/detalleproducto/DetalleProducto'
import Carrito from './pages/carrito/Carrito'
import Contacto from './pages/contacto/Contacto'
import Blog from './pages/blog/Blog'
import TransbankSucces from './pages/productos/TransbankSuccess'
import DebugData from './components/DebugData'


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    ),
    errorElement: <div className="container mt-5 text-center"><h1>⚠️ Error de Conexión</h1><p>No se pudo conectar con el servidor Spring Boot (Puerto 8080).</p><a href="/" className="btn btn-primary">Reintentar</a></div>,
    children: [
      {
        index: true,  // Ruta principal "/"
        Component: Home
      },
      {
        path: "login",  // Ruta: /login
        Component: Login
      },
      {
        path: "register",  // Ruta: /register
        Component: Register
      },
      {
        path: "productos",
        children: [
          {
            index: true,  // Esta será "/productos"
            Component: Producto,
            loader: productsLoader,
          },
          {
            path: ":id",  // Esta será "/productos/:id"
            Component: DetalleProducto,
            loader: productDetailLoader,
          }
        ]
      },
      {
        path: "carrito",
        Component: Carrito,
      },
      {
        path: "blog",
        Component: Blog,
      },
      {
        path: "checkout-success",
        Component: TransbankSucces,
      },
      {
        path: "contacto",
        Component: Contacto,
      },
      {
        path: "debug",
        Component: DebugData,
        loader: productsLoader,
      },

    ]
  }
]);

import { createBrowserRouter } from 'react-router-dom';
import { productsLoader, productDetailLoader } from './loaders'
import Root from './pages/root';
import Home from './pages/home/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgotPassword';
import Producto from './pages/productos/Productos'
import DetalleProducto from './pages/detalleproducto/DetalleProducto'
import Carrito from './pages/carrito/Carrito'
import Contacto from './pages/contacto/Contacto'

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
        path: "forgot-password",  // Ruta: /forgot-password
        Component: ForgotPassword
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
        path: "contacto",
        Component: Contacto,
      }
    ]
  }
]);
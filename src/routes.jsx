import { createBrowserRouter } from 'react-router-dom';
import { productsLoader, productDetailLoader } from './loaders'
import Root from './pages/root';
import Home from './pages/home/home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Producto from './pages/productos/Productos'
import DetalleProducto from './pages/detalleproducto/DetalleProducto'
import Carrito from './pages/carrito/Carrito'
import Contacto from './pages/contacto/Contacto'
import TransbankSucces from './pages/productos/TransbankSuccess'

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
        path:"checkout-success",
        Component:TransbankSucces,
      },
      {
        path: "contacto",
        Component: Contacto,
      }
    ]
  }
]);

import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/root';
import Home from './pages/home/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgotPassword';

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
      }
    ]
  }
]);
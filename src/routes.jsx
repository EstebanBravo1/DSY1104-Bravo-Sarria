import { createBrowserRouter } from 'react-router'
import Root from './pages/root'
import Home from './pages/home/Home'

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,  // Esta será nuestra ruta principal "/"
        Component: Home
      }
    ]
  }
])
import { productos } from '../data'

export async function productsLoader() {
  // Simulamos una llamada a API con delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        productos: productos
      });
    }, 800); // 800ms de delay para simular latencia de red
  });
}
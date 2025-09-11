 const CART_KEY = 'huerto hogar carrito';

// OBTENER EL CARRITO DESDE EL LOCALSTORAGE
export function getCart(){
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// GUARDAR EL CARRITO EN EL LOCALSTORAGE
function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// AÑADIR UN PRODUCTO AL CARRITO
export function addToCart(producto, cantidad=1){
    const cart = getCart();
    const existingItem = cart.find(item => item.codigo === producto.codigo);

    if(existingItem){
        //Si ya existe el producto en el carrito, solo actualizamos la cantidad, respetando el stock
        existingItem.qty = Math.min(producto.stock,existingItem.qty + cantidad);
    }else{
        // Si es nuevo, lo agregamos al carrito
        cart.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            qty: cantidad,
        });

    }
    saveCart(cart);

    document.dispatchEvent(new Event('cartUpdated'));

}

export function clearCart(){
    if(confirm('¿Estas seguro que deseas vaciar el carrito?')){
        saveCart([]);
        document.dispatchEvent(new Event('cartUpdated'));
    }
}

// ACTUALIZAR LA CANTIDAD DE UN PRODUCTO EN EL CARRITO
export function updateQuantity(codigo, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.codigo === codigo);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(codigo);
        } else {
            item.qty = newQuantity;
            saveCart(cart);
            document.dispatchEvent(new Event('cartUpdated'));
        }
    }
}

// ELIMINAR UN PRODUCTO DEL CARRITO
export function removeFromCart(codigo) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.codigo !== codigo);
    saveCart(updatedCart);
    document.dispatchEvent(new Event('cartUpdated'));
}

// OBTENER EL TOTAL DEL CARRITO
export function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.precio * item.qty), 0);
}

// OBTENER EL NÚMERO TOTAL DE ITEMS EN EL CARRITO
export function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.qty, 0);
}

// FORMATEAR PRECIO A PESOS CHILENOS
export function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}
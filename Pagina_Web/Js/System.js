// Verificar si el usuario ha iniciado sesión
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (!isLoggedIn) {
        // Redirigir al login si no ha iniciado sesión
        alert('Por favor, inicia sesión para acceder a esta página.');
        window.location.href = 'login.html';
        return;
    }
    
    // Mostrar información del usuario si está logueado
    console.log('Usuario logueado:', currentUser);
    
    // El resto de tu código JavaScript existente...
});
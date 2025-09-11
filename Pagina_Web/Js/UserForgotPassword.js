document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.querySelector('.close');
    
    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Función para validar email
    function validateEmail() {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'El email es obligatorio');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, emailError, 'El email no tiene un formato válido');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }
    
    // Función para mostrar error
    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
    }
    
    // Función para mostrar éxito
    function showSuccess(input, errorElement) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
    }
    
    // Función para abrir el modal
    function openModal() {
        modal.style.display = 'flex';
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
        // Redirigir al login después de cerrar el modal
        setTimeout(function() {
            window.location.href = 'Login.html';
        }, 500);
    }
    
    // Event listeners para validación en tiempo real
    emailInput.addEventListener('blur', validateEmail);
    
    // Event listener para el envío del formulario
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar el campo de email
        const isEmailValid = validateEmail();
        
        if (isEmailValid) {
            // Aquí normalmente se enviaría una solicitud al servidor
            // Para este ejemplo, simulamos el envío
            
            // Obtener usuarios registrados en localStorage
            const storedUserData = localStorage.getItem('userData');
            
            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                
                // Verificar si el email existe en el sistema
                if (emailInput.value === userData.email) {
                    // Simular envío de email (en un caso real, se conectaría con un backend)
                    console.log('Enviando email de recuperación a:', emailInput.value);
                    
                    // Mostrar modal de confirmación
                    openModal();
                    
                    // Limpiar formulario
                    forgotPasswordForm.reset();
                } else {
                    // Email no registrado
                    alert('El email proporcionado no está registrado en nuestro sistema.');
                }
            } else {
                // No hay usuarios registrados
                alert('No hay usuarios registrados con ese email.');
            }
        }
    });
    
    // Cerrar modal al hacer clic en la X
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});

// Hacer la función closeModal global para que funcione desde el HTML
window.closeModal = closeModal;
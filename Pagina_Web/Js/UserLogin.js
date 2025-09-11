document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const recoveryModal = document.getElementById('recoveryModal');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const closeModal = document.querySelector('.close');
    const btnRecovery = document.querySelector('.btn-recovery');

    // Expresión regular para validar emails con dominios permitidos
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    // Validación en tiempo real para email
    emailInput.addEventListener('input', function() {
        validateEmail();
    });

    // Validación en tiempo real para contraseña
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });

    // Abrir modal de recuperación
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        recoveryModal.style.display = 'flex';
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        recoveryModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === recoveryModal) {
            recoveryModal.style.display = 'none';
        }
    });

    // Enviar formulario de recuperación
    btnRecovery.addEventListener('click', function() {
        const recoveryEmail = document.getElementById('recoveryEmail').value;
        const recoveryEmailError = document.getElementById('recoveryEmailError');
        
        if (!recoveryEmail) {
            recoveryEmailError.textContent = 'Por favor ingresa tu email';
            return;
        }
        
        if (!emailRegex.test(recoveryEmail)) {
            recoveryEmailError.textContent = 'Por favor ingresa un email válido con dominio permitido (duoc.cl, profesor.duoc.cl, gmail.com)';
            return;
        }
        
        recoveryEmailError.textContent = '';
        alert('Se han enviado instrucciones de recuperación a ' + recoveryEmail);
        recoveryModal.style.display = 'none';
    });

    // Validar formulario de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isEmailValid && isPasswordValid) {
            // Simulación de inicio de sesión exitoso
            alert('Inicio de sesión exitoso');
            loginForm.reset();
            
            // Guardar en localStorage si se seleccionó "Recordarme"
            if (document.getElementById('rememberMe').checked) {
                localStorage.setItem('rememberedEmail', emailInput.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Redirigir a la página principal (simulado)
            // window.location.href = 'index.html';
        }
    });

    // Cargar email recordado si existe
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (!email) {
            emailError.textContent = 'El email es requerido';
            emailInput.classList.add('invalid');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor ingresa un email válido con dominio permitido (duoc.cl, profesor.duoc.cl, gmail.com)';
            emailInput.classList.add('invalid');
            return false;
        }
        
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        
        if (!password) {
            passwordError.textContent = 'La contraseña es requerida';
            passwordInput.classList.add('invalid');
            return false;
        }
        
        if (password.length < 4 || password.length > 10) {
            passwordError.textContent = 'La contraseña debe tener entre 4 y 10 caracteres';
            passwordInput.classList.add('invalid');
            return false;
        }
        
        passwordError.textContent = '';
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
        return true;
    }
});
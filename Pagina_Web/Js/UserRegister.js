document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');
    
    // Datos de regiones y comunas de Chile (ejemplo simplificado)
    const regionesComunas = {
        '': ['Selecciona una comuna'],
        'Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Maipú', 'La Florida'],
        'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Quillota'],
        'Bío Bío': ['Concepción', 'Talcahuano', 'Chiguayante', 'San Pedro de la Paz', 'Coronel'],
        // Se pueden agregar más regiones y comunas según sea necesario
    };

    // Cargar regiones en el select
    for (const region in regionesComunas) {
        if (region !== '') {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        }
    }

    // Actualizar comunas cuando cambia la región
    regionSelect.addEventListener('change', function() {
        const region = this.value;
        comunaSelect.innerHTML = '';
        
        if (region) {
            comunaSelect.disabled = false;
            regionesComunas[region].forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                comunaSelect.appendChild(option);
            });
        } else {
            comunaSelect.disabled = true;
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Selecciona una comuna';
            comunaSelect.appendChild(option);
        }
    });

    // Expresión regular para validar emails con dominios permitidos
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    // Validar formulario de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isRunValid = validateRun();
        const isNombreValid = validateNombre();
        const isApellidosValid = validateApellidos();
        const isEmailValid = validateEmail();
        const isRegionValid = validateRegion();
        const isComunaValid = validateComuna();
        const isDireccionValid = validateDireccion();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        if (isRunValid && isNombreValid && isApellidosValid && isEmailValid && 
            isRegionValid && isComunaValid && isDireccionValid && isPasswordValid && isConfirmPasswordValid) {
            // Simulación de registro exitoso
            alert('Registro exitoso. Bienvenido a HuertoHogar!');
            registerForm.reset();
            comunaSelect.disabled = true;
            
            // Guardar usuario en localStorage (simulado)
            const userData = {
                run: document.getElementById('run').value,
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                email: document.getElementById('email').value,
                fechaNacimiento: document.getElementById('fechaNacimiento').value,
                region: document.getElementById('region').value,
                comuna: document.getElementById('comuna').value,
                direccion: document.getElementById('direccion').value
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Redirigir a la página principal (simulado)
            // window.location.href = 'index.html';
        }
    });

    // Validaciones en tiempo real
    document.getElementById('run').addEventListener('input', validateRun);
    document.getElementById('nombre').addEventListener('input', validateNombre);
    document.getElementById('apellidos').addEventListener('input', validateApellidos);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('region').addEventListener('change', validateRegion);
    document.getElementById('comuna').addEventListener('change', validateComuna);
    document.getElementById('direccion').addEventListener('input', validateDireccion);
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);

    function validateRun() {
        const runInput = document.getElementById('run');
        const runError = document.getElementById('runError');
        const run = runInput.value.trim();
        const runRegex = /^\d{7,8}-[0-9kK]$/; // Formato básico de RUT chileno
        if (!run) {
            runError.textContent = 'El RUT es requerido';
            runInput.classList.add('invalid');
            return false;
        }
        if (!runRegex.test(run)) { 
            runError.textContent = 'El RUT debe tener un formato válido (ej: 12345678-9)';
            runInput.classList.add('invalid');
            return false;
        }
        runError.textContent = '';
        runInput.classList.remove('invalid');
        runInput.classList.add('valid');
        return true;
    }
    function validateNombre() {
        const nombreInput = document.getElementById('nombre');
        const nombreError = document.getElementById('nombreError');
        const nombre = nombreInput.value.trim();
        if (!nombre) {
            nombreError.textContent = 'El nombre es requerido';
            nombreInput.classList.add('invalid');
            return false;
        }
        if (nombre.length < 2 || nombre.length > 30) {
            nombreError.textContent = 'El nombre debe tener entre 2 y 30 caracteres';
            nombreInput.classList.add('invalid');
            return false;
        }
        nombreError.textContent = '';
        nombreInput.classList.remove('invalid');
        nombreInput.classList.add('valid');
        return true;
    }
    function validateApellidos() {
        const apellidosInput = document.getElementById('apellidos');
        const apellidosError = document.getElementById('apellidosError');
        const apellidos = apellidosInput.value.trim();
        if (!apellidos) {
            apellidosError.textContent = 'Los apellidos son requeridos';
            apellidosInput.classList.add('invalid');
            return false;
        }
        if (apellidos.length < 2 || apellidos.length > 30) {
            apellidosError.textContent = 'Los apellidos deben tener entre 2 y 30 caracteres';
            apellidosInput.classList.add('invalid');
            return false;
        }
        apellidosError.textContent = '';
        apellidosInput.classList.remove('invalid');
        apellidosInput.classList.add('valid');
        return true;
    }
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
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
    function validateRegion() {
        const regionInput = document.getElementById('region');
        const regionError = document.getElementById('regionError');
        const region = regionInput.value;
        if (!region) {
            regionError.textContent = 'La región es requerida';
            regionInput.classList.add('invalid');
            return false;
        }
        regionError.textContent = '';
        regionInput.classList.remove('invalid');
        regionInput.classList.add('valid');
        return true;
    }
    function validateComuna() {
        const comunaInput = document.getElementById('comuna');
        const comunaError = document.getElementById('comunaError');
        const comuna = comunaInput.value;
        if (!comuna) {
            comunaError.textContent = 'La comuna es requerida';
            comunaInput.classList.add('invalid');
            return false;
        }
        comunaError.textContent = '';
        comunaInput.classList.remove('invalid');
        comunaInput.classList.add('valid');
        return true;
    }
    function validateDireccion() {
        const direccionInput = document.getElementById('direccion');
        const direccionError = document.getElementById('direccionError');
        const direccion = direccionInput.value.trim();
        if (!direccion) {
            direccionError.textContent = 'La dirección es requerida';
            direccionInput.classList.add('invalid');
            return false;
        }
        if (direccion.length < 5 || direccion.length > 100) {
            direccionError.textContent = 'La dirección debe tener entre 5 y 100 caracteres';
            direccionInput.classList.add('invalid');
            return false;
        }
        direccionError.textContent = '';
        direccionInput.classList.remove('invalid');
        direccionInput.classList.add('valid');
        return true;
    }
    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
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
    function validateConfirmPassword() {
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const password = document.getElementById('password').value;
        const confirmPassword = confirmPasswordInput.value;
        if (!confirmPassword) {
            confirmPasswordError.textContent = 'Por favor confirma tu contraseña';
            confirmPasswordInput.classList.add('invalid');
            return false;
        }
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Las contraseñas no coinciden';
            confirmPasswordInput.classList.add('invalid');
            return false;
        }
        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('invalid');
        confirmPasswordInput.classList.add('valid');
        return true;
    }
});
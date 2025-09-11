// Validación de RUT chileno y teléfono para Contacto

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const rutInput = document.getElementById('rut');
    const rutError = document.getElementById('rutError');
    const telInput = document.getElementById('telefono');
    const telError = document.getElementById('telefonoError');

    function validarRut(rut) {
        // Limpia formato
        rut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
        if (rut.length < 8 || rut.length > 9) return false;
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);
        let suma = 0, multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i]) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        let dvEsperado = 11 - (suma % 11);
        dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        return dv === dvEsperado;
    }

    function validarTelefono(tel) {
        return /^[0-9]{9}$/.test(tel);
    }

    rutInput.addEventListener('input', function() {
        if (rutInput.value.length < 9 || rutInput.value.length > 12 || !validarRut(rutInput.value)) {
            rutError.textContent = 'Ingrese un RUT válido (Ej: 12.345.678-5)';
        } else {
            rutError.textContent = '';
        }
    });

    telInput.addEventListener('input', function() {
        if (!validarTelefono(telInput.value)) {
            telError.textContent = 'El teléfono debe tener 9 dígitos (Ej: 912345678)';
        } else {
            telError.textContent = '';
        }
    });

    form.addEventListener('submit', function(e) {
        let valido = true;
        if (rutInput.value.length < 9 || rutInput.value.length > 12 || !validarRut(rutInput.value)) {
            rutError.textContent = 'Ingrese un RUT válido (Ej: 12.345.678-5)';
            valido = false;
        }
        if (!validarTelefono(telInput.value)) {
            telError.textContent = 'El teléfono debe tener 9 dígitos (Ej: 912345678)';
            valido = false;
        }
        if (!valido) e.preventDefault();
    });
});

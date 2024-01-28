function toggleParkingLockState(shouldLock) {
    
    // Convierte isNight a booleano si es una cadena
    if (typeof shouldLock === 'string') {
        shouldLock = shouldLock.toLowerCase() === 'false';
    }

    // Asegúrate de que jQuery esté cargado
    if (typeof $ !== "undefined") {

        var isCurrentlyLocked = $('.lock-top').hasClass('loaded');       
        if (isCurrentlyLocked == shouldLock) {            
            return;
        }
        
        if (shouldLock) {
            // Inicia el proceso de bloqueo
            $('.lock-top, .lock-body, .lock-spinner').addClass('loading');
            // Después de 500ms, se completa el bloqueo
            setTimeout(function() {
                $('.lock-top, .lock-body, .lock-spinner').addClass('loaded');
                $('.lock-spinner, .lock-top, .lock-body, .lock-spinner').removeClass('loading');
                $('.lock-body').css('fill', '#fa113d'); // Asegúrate de cambiar el color directamente si es necesario
                
            }, 500);
        } else {
            // Inicia el proceso de desbloqueo
            $('.lock-top, .lock-body, .lock-spinner').addClass('loading');
            $('.lock-top').removeClass('loaded');
            $('.lock-body').css('fill', '#02ac1e'); // Cambiar de nuevo el color al original
            // Después de 500ms, se completa el desbloqueo
            setTimeout(function() {
                $('.lock-top, .lock-body, .lock-spinner').removeClass('loading');
            }, 500);
        }
    } else {
        console.error("jQuery no está definido");
    }
}

// Ejemplo: toggleLockState(true); para activar el candado, toggleLockState(false); para desactivarlo


function setParkingLightBulb(encendida) {
    var wrap = document.querySelector('.wrap');

    if (typeof encendida === 'string') {
        encendida = encendida.toLowerCase() === 'true';
    }

    if (encendida) {
        wrap.classList.add('bombilla-encendida');
    } else {
        wrap.classList.remove('bombilla-encendida');
    }
}


// Llama a la función con false para apagar la bombilla
setParkingLightBulb(false);

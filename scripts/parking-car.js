const indicator = document.querySelector('.indicator');

function setParkingState(isOccupied) {
    // Convierte isNight a booleano si es una cadena
    if (typeof isOccupied === 'string') {
        isOccupied = isOccupied.toLowerCase() === 'true';
    }

    if (isOccupied) {
        indicator.classList.add('occupied');
    } else {
        indicator.classList.remove('occupied');
    }
}

// Para cambiar el estado, llama a setParkingState con true (ocupado) o false (libre)
setParkingState(true); // Ejemplo: cambia a ocupado

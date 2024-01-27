function setFireValue(newValue) {
    const fireElemento = document.querySelector('.fire');
    if (fireElemento) {
      const elementoValor = fireElemento.querySelector('.value');
      if (elementoValor) {
        elementoValor.textContent = newValue + " nm";
      }
    }
  }

   // Ejemplos de uso:
   setFireValue(20); // Cambiar el valor de "fire" a '20nm'
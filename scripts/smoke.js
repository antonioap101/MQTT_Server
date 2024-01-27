function setSmokeValue(newValue) {
    const smokeElemento = document.querySelector('.smoke');
    if (smokeElemento) {
      const elementoValor = smokeElemento.querySelector('.value');
      if (elementoValor) {
        elementoValor.textContent = newValue + " ppm";
      }
    }
  }

  setSmokeValue(60); // Cambiar el valor de "smoke" a '60ppm'
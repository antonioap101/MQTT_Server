function toggleDayNight(isNight) {
    // Convierte isNight a booleano si es una cadena
    if (typeof isNight === 'string') {
      isNight = isNight.toLowerCase() === 'true';
    }

    const iconElement = document.querySelector('.icon');
    const skyElement = iconElement.querySelector('.sky');
    const sunElement = iconElement.querySelector('.sun');
    const moonElement = iconElement.querySelector('.moon');
    const mountain1Element = iconElement.querySelector('.m1');
    const mountain2Element = iconElement.querySelector('.m2');
    
    if (isNight) {
      // Cambiar a modo noche
      sunElement.style.animation = 'loopOut 0.65s both linear';
      skyElement.style.backgroundPosition = 'left 85%';
      moonElement.style.animation = 'loopIn 0.6s both ease-out';
      
      mountain1Element.style.transform = 'translateX(3%) translateZ(0)';
      mountain2Element.style.transform = 'scale(1.4) translateX(2%) translateZ(0)';
    } else {
      // Cambiar a modo día
      sunElement.style.animation = 'loopIn 0.6s both ease-out';
      skyElement.style.backgroundPosition = 'top left';
      moonElement.style.animation = 'loopOut 0.65s both linear';
      
      mountain1Element.style.transform = 'translateX(0%) translateZ(0)';
      mountain2Element.style.transform = 'scale(1) translateX(0%) translateZ(0)';
    }
  }

  
  
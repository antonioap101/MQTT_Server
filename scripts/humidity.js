var cnt = document.getElementById("count");
var water = document.getElementById("water");
var percent = parseInt(cnt.innerText, 10);
var interval;

function setHumidity(newPercent) {
  var step = 1;
  var direction = newPercent > percent ? 1 : -1; // Determinar si aumentamos o disminuimos el valor

  clearInterval(interval); // Detener la animación anterior si la hay

  interval = setInterval(function () {
    if (percent === newPercent) {
      clearInterval(interval);
    } else {
      percent += step * direction;
      cnt.innerHTML = percent;
      water.style.transform = 'translate(0,' + (100 - percent) + '%)';
    }
  }, 60);
}

// Ejemplo de cómo usar la función para actualizar la barra de progreso gradualmente
setHumidity(0); // Actualiza gradualmente desde el valor actual al 50%

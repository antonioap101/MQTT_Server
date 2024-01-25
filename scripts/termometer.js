(function () {
	// Variables encapsuladas
	let units = {
	  Celcius: "°C",
	  Fahrenheit: "°F"
	};
  
	let config = {
	  currentTemp: null,
	  minTemp: -20,
	  maxTemp: 50,
	  unit: "Celcius"
	};
  
	// Cambiar valores de temperatura mínima y máxima
	const tempValueInputs = document.querySelectorAll("input[type='text']#minTemp, input[type='text']#maxTemp");
  
	tempValueInputs.forEach((input) => {
	  input.addEventListener("change", (event) => {
		const newValue = event.target.value;
  
		if (isNaN(newValue)) {
		  return (input.value = config[input.id]);
		} else {
		  config[input.id] = input.value;
		  range[input.id.slice(0, 3)] = config[input.id]; // Actualizar el rango
		  return setTemperature(); // Actualizar temperatura
		}
	  });
	});
  
	// Cambiar temperatura
	const temperature = document.getElementById("mercury");
  
	function setTemperature() {
	  console.log("CONFIGURANDO TEMPERATURA: ", range.value);
	  temperature.style.height = ((config.currentTemp - config.minTemp) / (config.maxTemp - config.minTemp)) * 100 + "%";
	  temperature.dataset.value = config.currentTemp + units[config.unit];
	}
  
	setTimeout(setTemperature, 1000);
  })();
  
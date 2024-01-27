
// Variables encapsuladas
let units = {
	Celcius: "°C",
	Fahrenheit: "°F"
};

let config = {
	currentTemp: null,
	minTemp: -10,
	maxTemp: 40,
	unit: "Celcius"
};



// Cambiar temperatura
const temperature = document.getElementById("mercury");

function setTemperature(newTemperature) {	
	config.currentTemp = newTemperature; // Actualiza el valor de la temperatura en la configuración
	temperature.style.height = ((config.currentTemp - config.minTemp) / (config.maxTemp - config.minTemp)) * 100 + "%";
	temperature.dataset.value = config.currentTemp + units[config.unit];
}

setTemperature(0);

// Estructura de los temas MQTT basados en tu JSON
let topics = {
  Temperature: 'Temperature',
  Humidity: 'Humidity',
  GasDetection: 'GasDetection',
  FireDetection: 'FireDetection',
  GardenLightStatus: 'GardenLightStatus',
  GardenSoilStatus: 'GardenSoilHumidity',
  ParkingCarStatus: 'ParkingCarStatus',
  ParkingAccessStatus: 'ParkingAccessStatus',
  ParkingLightStatus: 'ParkingLightStatus'
};

// Estructura de los temas MQTT basados en tu JSON
let TopicBaseText = {
  Temperature: 'Temperatura actual: ',
  Humidity: 'Humedad actual: ',
  GasDetection: 'Gas: ',
  FireDetection: 'Fuego: ',
  GardenLightStatus: 'Luz del jardín: ',
  GardenSoilStatus: 'Humedad del jardín: ',
  ParkingCarStatus: 'Coche en el parking: ',
  ParkingAccessStatus: 'Acceso al parking: ',
  ParkingLightStatus: 'Luz del parking: '
};


// Dirección y puerto del servidor MQTT
var mqttServerAddress = "localhost"; // Cambia "localhost" por la dirección del servidor MQTT si es diferente
var mqttServerPort = 9001; // Puerto predeterminado para MQTT

// Create a client instance
var client = new Paho.MQTT.Client(mqttServerAddress, mqttServerPort, "clientId");

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Obtener el elemento "status" por su id
var statusElement = document.getElementById("status");
var statusTextElement = document.getElementById("status-text");
var messagesElement = document.getElementById("messages");


// Variable para rastrear si la conexión está activa
var isConnected = false;

// Connect the client
client.connect({
  onSuccess: onConnect,
  useSSL: false, // Cambia a true si estás utilizando HTTPS
});

// Función para suscribirse a todos los temas
function subscribeToTopics() {
  for (const key in topics) {
    if (topics.hasOwnProperty(key)) {
      const topic = topics[key];
      client.subscribe(topic, {
        onSuccess: () => {
          console.log(`Suscrito al tema: ${topic}`);
        },
        onFailure: (err) => {
          console.error(`Error al suscribirse a ${topic}: ${err.errorMessage}`);
        }
      });
    }
  }
}


// Called when the client connects
function onConnect() {
  console.log("Connected to MQTT broker");

  // Actualizar el contenido del elemento "status" cuando la conexión tiene éxito
  statusTextElement.innerText = "Conectado";
  statusElement.classList.remove("disconnected");
  statusElement.classList.add("connected");

  // Marcar la conexión como activa
  isConnected = true;

  // Once connected, subscribe to the topics
  subscribeToTopics();

}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Connection lost: " + responseObject.errorMessage);

    // Actualizar el contenido del elemento "status" cuando la conexión se pierde
    statusTextElement.innerText = "Desconectado";
    statusElement.classList.remove("connected");
    statusElement.classList.add("disconnected");

    // Marcar la conexión como inactiva
    isConnected = false;
  }
}

// Called when a message arrives
function onMessageArrived(message) {
  //console.log("Message received: " + message.payloadString);
  //console.log("Topic: " + message.destinationName); // Obtener el topic del mensaje

  // Verificar si la conexión está activa antes de mostrar mensajes
  if (isConnected) {
    // Manejar el destino del mensaje en función de su topic
    handleTopicMessage(message.destinationName, message.payloadString);
  }
}

// Función para manejar mensajes basados en el topic
function handleTopicMessage(topicName, message) {
  // Crear un nuevo div para mostrar el mensaje MQTT recibido con su topic en chat-messages
  var chatMessagesElement = document.getElementById("chat-messages");
  var messageDiv = document.createElement("div");
  messageDiv.textContent = "MQTT → Topic: " + topicName + " - Mensaje: " + message;

  chatMessagesElement.appendChild(messageDiv);

  //const topic = topics[key];
  switch (topicName) {
    case topics.Temperature:
      // Manejar mensajes de temperatura      
      var temperatureElement = document.getElementById("temperature-txt").querySelector(".sensor-value");
      temperatureElement.innerText = TopicBaseText.Temperature + message + " °C";
      setTemperature(parseFloat(message));

      break;
    case topics.Humidity:
      var humidityElement = document.getElementById("humidity-txt").querySelector(".sensor-value");
      humidityElement.innerText = TopicBaseText.Humidity + message + " %";
      setHumidity(parseInt(message));
      break;
    case topics.GasDetection:
      var gasElement = document.getElementById("gas-txt").querySelector(".sensor-value");
      gasElement.innerText = TopicBaseText.GasDetection + message + " ppm";
      setSmokeValue(message);
      break;
    case topics.FireDetection:
      var gasElement = document.getElementById("fire-txt").querySelector(".sensor-value");
      gasElement.innerText = TopicBaseText.FireDetection + message + " nm";
      setFireValue(message);
      break;
    case topics.GardenLightStatus:
      var gasElement = document.getElementById("gardenLight-txt").querySelector(".sensor-value");
      gasElement.innerText = TopicBaseText.GardenLightStatus + ((message.toLowerCase() === "true") ? "Encendida" : "Apagada");
      toggleDayNight(message.toLowerCase());
      break;
    case topics.GardenSoilStatus:
      var gasElement = document.getElementById("gardenSoil-txt").querySelector(".sensor-value");
      gasElement.innerText = TopicBaseText.GardenSoilStatus + message + " %";
      setHumidityGarden(parseInt(message));
      break;

    case topics.ParkingCarStatus:
      var parkingCarElement = document.getElementById("parkingCar-txt").querySelector(".sensor-value");
      parkingCarElement.innerText = TopicBaseText.ParkingCarStatus + ((message.toLowerCase() === "true") ? "Ocupado" : "Libre");
      setParkingState(message.toLowerCase());
      break;

    case topics.ParkingAccessStatus:
      var parkingDoorElement = document.getElementById("parkingAccess-txt").querySelector(".sensor-value");
      parkingDoorElement.innerText = TopicBaseText.ParkingAccessStatus + ((message.toLowerCase() === "true") ? "Desbloqueado" : "Bloqueado");
      toggleParkingLockState(message.toLowerCase());
      break;

    case topics.ParkingLightStatus:
        var parkingLightElement = document.getElementById("parkingLight-txt").querySelector(".sensor-value");
        parkingLightElement.innerText = TopicBaseText.ParkingLightStatus + ((message.toLowerCase() === "true") ? "Encendida" : "Apagada");
        setParkingLightBulb(message.toLowerCase());
        break;

    default:
      console.log("Topic no reconocido: " + topicName);
  }
}

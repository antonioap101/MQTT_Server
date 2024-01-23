

console.log("Loading home");
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

console.log("SE: ", statusElement);
console.log("STE: ", statusTextElement);


// Variable para rastrear si la conexión está activa
var isConnected = false;

// Connect the client
client.connect({
  onSuccess: onConnect,
  useSSL: false, // Cambia a true si estás utilizando HTTPS
});

// Called when the client connects
function onConnect() {
  console.log("Connected to MQTT broker");

  // Actualizar el contenido del elemento "status" cuando la conexión tiene éxito
  statusTextElement.innerText = "Conectado";  
  statusElement.classList.remove("disconnected");
  statusElement.classList.add("connected");

  // Marcar la conexión como activa
  isConnected = true;

  // Once connected, subscribe to a topic
  client.subscribe("temperature");
  client.subscribe("parking");
  client.subscribe("test");
  message = new Paho.MQTT.Message("28");
  message.destinationName = "temperature";
  client.send(message);

  message = new Paho.MQTT.Message("Libre");
  message.destinationName = "parking";
  client.send(message);
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
  console.log("Message received: " + message.payloadString);
  console.log("Topic: " + message.destinationName); // Obtener el topic del mensaje

  // Verificar si la conexión está activa antes de mostrar mensajes
  if (isConnected) {
    // Obtener el elemento "chat-messages" por su id
    var chatMessagesElement = document.getElementById("chat-messages");

    // Crear un nuevo div para mostrar el mensaje MQTT recibido con su topic
    var messageDiv = document.createElement("div");
    messageDiv.textContent = "MQTT → Topic: " + message.destinationName + " - Mensaje: " + message.payloadString;

    // Agregar el nuevo div al elemento "chat-messages"
    chatMessagesElement.appendChild(messageDiv);

    // Actualizar el texto en "Temperatura Actual" o "Estado del Aparcamiento"
    if (message.destinationName === "temperature") {
      // Si el mensaje proviene del topic "temperature", actualizar "Temperatura Actual"
      var temperatureElement = document.getElementById("temperature");
      temperatureElement.innerText = "Temperatura actual: " + message.payloadString;
      config.currentTemp = parseFloat(message.payloadString);
      console.log("New msg: ", range.value, "PayloadStr: ", message.payloadString);
      setTemperature();
      
    } else if (message.destinationName === "parking") {
      // Si el mensaje proviene del topic "parking", actualizar "Estado del Aparcamiento"
      var parkingElement = document.getElementById("parking");
      parkingElement.innerText = "Estado del estacionamiento: " + message.payloadString;
    }
    
  }
}

// Obtener elementos de entrada y botón
var topicInput = document.getElementById("topic-input");
var messageInput = document.getElementById("message-input");
var sendButton = document.getElementById("send-button");

// Agregar un evento al botón de enviar
sendButton.addEventListener("click", function () {
  
  var topic = topicInput.value; // Obtener el valor del campo de topic
  var message = messageInput.value; // Obtener el valor del campo de mensaje

  console.log("Pressed sendButton -> TOPIC: ", topic, " MESSAGE: ", message);

  // Verificar si la conexión está activa antes de enviar el mensaje
  if (isConnected) {
    if (topic && message) {
      // Crear un nuevo mensaje y enviarlo al topic especificado
      var newMessage = new Paho.MQTT.Message(message);
      newMessage.destinationName = topic;
      client.send(newMessage);

      // Limpiar los campos de entrada después de enviar el mensaje
      topicInput.value = "";
      messageInput.value = "";
    } else {
      alert("Por favor, ingresa un topic y un mensaje antes de enviar.");
    }
  } else {
    alert("La conexión MQTT no está activa. Por favor, espera a que se conecte.");
  }
});

console.log("Loaded home");

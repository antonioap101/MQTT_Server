console.log("Loading home");
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

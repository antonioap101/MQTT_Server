const express = require('express');
const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

// Define la carpeta donde se encuentran los archivos estáticos
app.use(express.static(__dirname));

// Ruta principal (por defecto: index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/app.html');
});

app.listen(port, () => {
  console.log(`Servidor web en ejecución en http://localhost:${port}`);
});

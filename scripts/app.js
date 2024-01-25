console.log("app.js start\n");

 // Define variables para las rutas de los archivos HTML
 var summaryPage = "../pages/summary.html"
 var homePage = "../pages/home.html";
 var parkingPage = "../pages/parking.html";
 var gardenPage = "../pages/garden.html" 

// Función para cargar el contenido de las páginas
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const contentContainer = document.getElementById('content-container');
            contentContainer.innerHTML = data;
            // Encuentra los scripts en el contenido
            const scripts = contentContainer.querySelectorAll('script');
            scripts.forEach(script => {
                const src = script.getAttribute('src');
                if (src) {
                    // Crea un nuevo script y añádelo al documento
                    const newScript = document.createElement('script');
                    newScript.src = src;
                    document.body.appendChild(newScript);
                }
            });
        })
        .catch(error => console.error('Error al cargar la página', error));

        
}

// Cargar la página inicial al cargar la página principal
loadPage(homePage);

console.log("Loaded app");

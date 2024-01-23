console.log("app.js start\n");

 // Define variables para las rutas de los archivos HTML
 var homePage = "../pages/home.html";
 var temperaturaPage = "../pages/termometer.html";
 var humedadPage = "humedad.html";
 var humoPage = "humo.html";
 var fuegoPage = "fuego.html";

// Función para cargar el contenido de las páginas
function cargarPagina(url) {
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

// Agrega un evento click a los enlaces de la barra de tareas
document.querySelector(".navbar a[href='#home']").addEventListener('click', function () {
    cargarPagina(homePage);
});

document.querySelector(".navbar a[href='#temperature']").addEventListener('click', function () {
    cargarPagina(temperaturaPage);
});

document.querySelector(".navbar a[href='#humidity']").addEventListener('click', function () {
    cargarPagina(humedadPage);
});

document.querySelector(".navbar a[href='#smoke']").addEventListener('click', function () {
    cargarPagina(humoPage);
});

document.querySelector(".navbar a[href='#fire']").addEventListener('click', function () {
    cargarPagina(fuegoPage);
});


// Cargar la página inicial al cargar la página principal
cargarPagina(homePage);

console.log("Loaded app");

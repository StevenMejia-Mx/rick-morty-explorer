const API_URL = 'https://rickandmortyapi.com/api/character/';
const contenedorResultados = document.getElementById('resultados');
async function obtenerPersonajes() {
    try{
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        mostrarPersonajes(datos.results);
        
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }       
}

function crearTarjeta(personaje){
    const tarjeta = document.createElement("article");
    tarjeta.classList.add('tarjeta');

    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;

    const nombre = document.createElement('h2');
    nombre.textContent = personaje.name;

    const estado = document.createElement('p');
    estado.textContent = `Estado: ${personaje.status}`;
    estado.classList.add("estado", personaje.status.toLowerCase());

    const especie = document.createElement('p');
    especie.textContent = `Especie: ${personaje.species}`;

    const origen = document.createElement('p');
    origen.textContent = `Origen: ${personaje.origin.name}`;

    tarjeta.append(imagen, nombre, estado, especie, origen);
    return tarjeta;
}

function mostrarPersonajes(personajes) {
    contenedorResultados.innerHTML = "";

    personajes.forEach(personaje => {
        const tarjeta = crearTarjeta(personaje);
        contenedorResultados.appendChild(tarjeta);
    });
}

obtenerPersonajes();
const API_URL = 'https://rickandmortyapi.com/api/character/';
const contenedorResultados = document.getElementById('resultados');

function construirURL() {
  const parametros = new URLSearchParams();

  const nombre = inputNombre.value.trim();
  const estado = selectEstado.value;

  if (nombre) parametros.append("name", nombre);
  if (estado) parametros.append("status", estado);

  return `${API_URL}?${parametros.toString()}`;
}

async function obtenerPersonajes(url) {
    try{
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        mostrarPersonajes(datos.results);
        
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }       
}
function construirURL() {
  const parametros = new URLSearchParams();

  const nombre = inputNombre.value.trim();
  const estado = selectEstado.value;

  if (nombre) parametros.append("name", nombre);
  if (estado) parametros.append("status", estado);

  return `${API_URL}?${parametros.toString()}`;
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
        const formBusqueda = document.getElementById("formBusqueda");
        const inputNombre = document.getElementById("inputNombre");
        const selectEstado = document.getElementById("selectEstado");
    });

    formBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault();          // evitar que la página se recargue
    const url = construirURL();
    console.log("Buscando en:", url); // para que veas la URL armada
    obtenerPersonajes(url);
    });
}

obtenerPersonajes(API_URL);
const API_URL = 'https://rickandmortyapi.com/api/character/';
const contenedorResultados = document.getElementById("resultados");
const formBusqueda = document.getElementById("formBusqueda");
const inputNombre = document.getElementById("inputNombre");
const selectEstado = document.getElementById("selectEstado");
const mensaje = document.getElementById("mensaje");
const paginacion = document.getElementById("paginacion");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const infoPagina = document.getElementById("infoPagina");

let urlSiguiente = null;
let urlAnterior = null;
let paginaActual = 1;


function construirURL() {
  const parametros = new URLSearchParams();

  const nombre = inputNombre.value.trim();
  const estado = selectEstado.value;

  if (nombre) parametros.append("name", nombre);
  if (estado) parametros.append("status", estado);

  return `${API_URL}?${parametros.toString()}`;
}

async function obtenerPersonajes(url) {
  contenedorResultados.innerHTML = "";
  paginacion.hidden = true;
  mostrarMensaje("Cargando personajes...", "cargando");

  try {
    const respuesta = await fetch(url);

    // Estado vacío: la API responde 404 cuando no hay coincidencias
    if (respuesta.status === 404) {
      mostrarMensaje("No se encontraron personajes con esos criterios. Intenta con otro nombre o filtro.", "vacio");
      return;
    }

    // Cualquier otro código fuera de 200-299 es un error del servidor
    if (!respuesta.ok) {
      throw new Error(`Error del servidor: código ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    mostrarMensaje("", "");          // quitar el mensaje de carga
    mostrarPersonajes(datos.results);
    actualizarPaginacion(datos.info);

  } catch (error) {
    // Estado de error: sin conexión o fallo del servidor
    console.error("Detalle técnico:", error);
    mostrarMensaje("No se pudieron cargar los personajes. Revisa tu conexión a internet e intenta de nuevo.", "error");
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
    evento.preventDefault();          
    const url = construirURL();
    console.log("Buscando en:", url);
    obtenerPersonajes(url);
    });
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function actualizarPaginacion(info) {
  urlSiguiente = info.next;
  urlAnterior = info.prev;

  btnSiguiente.disabled = !info.next;  
  btnAnterior.disabled = !info.prev;    

  infoPagina.textContent = `Página ${paginaActual} de ${info.pages}`;
  paginacion.hidden = false;
}

btnSiguiente.addEventListener("click", () => {
  if (urlSiguiente) {
    paginaActual++;
    obtenerPersonajes(urlSiguiente);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

btnAnterior.addEventListener("click", () => {
  if (urlAnterior) {
    paginaActual--;
    obtenerPersonajes(urlAnterior);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

formBusqueda.addEventListener("submit", (evento) => {
  evento.preventDefault();
  paginaActual = 1;                 // ← NUEVO: una búsqueda nueva empieza en la página 1
  const url = construirURL();
  obtenerPersonajes(url);
});


obtenerPersonajes(API_URL);
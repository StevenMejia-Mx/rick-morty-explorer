const API_URL = 'https://rickandmortyapi.com/api/character/';
async function obtenerPersonajes() {
    try{
        const respuesta = await fetch(API_URL);
        console.log("Código de estado:", respuesta.status);
        const datos = await respuesta.json();
        console.log("Datos obtenidos:", datos);
        console.log("Total de personajes:", datos.info.count);
        console.log("Primer personaje:", datos.results[0].name);

        datos.results.forEach(personaje => {
            console.log("Nombre del personaje;", personaje.name);
        });

    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
        
}

obtenerPersonajes();


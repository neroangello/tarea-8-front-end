console.log("Funciona el archivo");

/* Clases, creación objetos (getters y setters) */
class Personaje{
    constructor(Id, Nombre, Especie, Imagen){
        this.id = Id;
        this.nombre = Nombre;
        this.especie = Especie;
        this.imagen = Imagen;
    }

    /* Getters */
    get getNombre() {
        return this.nombre;
    }

    get getId() {
        return this.id;
    }

    get getEspecie() {
        return this.especie;
    }

    get getImagen() {
        return this.imagen;
    }

    /* Setters */
    set setNombre(nombre) {
        this.nombre = nombre;
    }

    set setId(id) {
        this.id = id;
    }

    set setIEspecie(especie) {
        this.especie = especie;
    }

    set setImagen(imagen) {
        this.imagen = imagen;
    }

}


/* Ruta de la API */
const url = 'https://rickandmortyapi.com/api/character'

/* Oculta el spinner de carga */
function escondeCarga(){
    const bloqueCarga = document.getElementById("bloqueCarga");
    bloqueCarga.classList.add('oculto');
}
/* Metodo de creación de tarjetas */
function crearTarjeta(idTarjeta, nombreTarjeta, rutaImagen, nombreEspecie){
    let tarjeta = '';
    tarjeta = document.createElement("article");
    tarjeta.className = "card"
    tarjeta.classList.add("text-white");
    tarjeta.classList.add(validarEspecie(nombreEspecie));
    tarjeta.classList.add("mb-3");
    tarjeta.classList.add("mx-w-18");
    bloqueTitulo = document.createElement("div");
    bloqueTitulo.classList.add("card-header");
    bloqueTitulo.innerHTML = "Especie: " + ajustarEspecie(nombreEspecie);
    bloqueCuerpo = document.createElement("div");
    bloqueCuerpo.classList.add("card-body");
    imagen = document.createElement("img");
    imagen.src = rutaImagen;
    subtitulo = document.createElement("h5");
    subtitulo.innerHTML = nombreTarjeta;
    subtitulo.classList.add("card-title");
    parrafo = document.createElement("p");
    parrafo.classList.add("card-text");
    bloqueFooter = document.createElement("div");
    bloqueFooter.classList.add("card-footer");
    bloqueFooter.innerHTML = "N° " + idTarjeta;
    
    bloqueCuerpo.appendChild(subtitulo);
    bloqueCuerpo.appendChild(imagen);
    bloqueCuerpo.appendChild(parrafo);
    tarjeta.appendChild(bloqueTitulo);
    tarjeta.appendChild(bloqueCuerpo);
    tarjeta.appendChild(bloqueFooter);

    return tarjeta;

}

/* Validación de la especie para definir el color de la tarjeta
   (Si la especie no está, se usará un default, pudiendo agregar
    una nueva en el scss) */
function validarEspecie(parEspecie){
    
    const varEspecie = parEspecie.toLowerCase();
    let resultado = '';

    switch(varEspecie) {
        case 'human':
            resultado = 'bg-primary'
            break;
        case 'alien':
            resultado = 'bg-success'
            break;
        default:
            resultado = 'bg-secondary'
      }

    return resultado;

}

/* Método que cambia el resultado de la raza a su versión en español
   si no existe se deja como no definido */
function ajustarEspecie(parEspecie){

    const varEspecie = parEspecie.toLowerCase();
    let resultado = '';

    switch(varEspecie) {
        case 'human':
            resultado = 'Humano'
            break;
        case 'alien':
            resultado = 'Alien'
            break;
        default:
            resultado = 'No definido'
      }

    return resultado;
}

/* Método donde se crean las instancias de clase para personajes
   y luego se pasan a un arreglo de objetos */
function mostrarElementos(arreglo){

    const personajes = [];

    arreglo.forEach(elemento => {
        const personaje = new Personaje(elemento.id, elemento.name, elemento.species, elemento.image);
        personajes.push(personaje);
    });    

    try {
        const contenedor = document.getElementById("cards");        
        personajes.forEach(elemento => {
            contenedor.appendChild(crearTarjeta(elemento.getId, elemento.getNombre, elemento.getImagen, elemento.getEspecie));
        });

    } catch (error) {
        console.log(error);
    }


}

/* Función asíncrona que consume la API llama a la construcción de tarjetas */
async function llamarApi(url) {
    try {
      const response = await axios.get(url);
      const salida = response.data.results;
      escondeCarga();
      mostrarElementos(salida);

    } catch (error) {
      console.error(error);
    } 

  }


// Se genera la llamada al método que construye las cartas
llamarApi(url);

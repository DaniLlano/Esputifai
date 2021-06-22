const form = document.getElementById("form");
const search = document.getElementById("search");
const resultados = document.getElementById("resultados");
const masResultados = document.getElementById("masResultados");

const URL = "https://api.lyrics.ovh";

// buscar cancioncita
const searchSong = (value) => {
    fetch(`${URL}/suggest/${value}`)
    .then((valor) => valor.json())
    .then((resultado) => pintarCanciones(resultado))
}



// mostramos resultados
const pintarCanciones = (resultado) => {
    console.log(resultado)
    const canciones = `
    <h2>Búsquedas relacionadas a ${search.value}</h2>
    <ul>
    ${resultado.data
        .map(
            (valor) => 
        `<li>
        <p>${valor.artist.name} - ${valor.title}</p>
        <audio controls id="audio">
            <source src=${valor.preview} type="audio/mpeg">
        </audio>
        </li>`)
        .join("")}
        </ul>`;

    resultados.innerHTML = canciones;

    if(resultado.prev || resultado.next){
        masResultados.innerHTML = `
        ${resultado.prev ? `<button onclick=masTemaikenes("${resultado.prev}")>Anterior</button>` : ``}
        ${resultado.next ? `<button onclick=masTemaikenes("${resultado.next}")>Siguiente</button>` : ``}
        `
    }
}

const masTemaikenes = async (dir) => {
    const urlFetch = dir;
    const fetcheando = await fetch(urlFetch);
    const urlDef = await fetcheando.json();
    pintarCanciones(urlDef);
}


// buscamos cancioncitas y mostramos

const iniciar = () => {
    form.addEventListener("submit", (e) => {
    e.preventDefault();
    const buscarTemaikenes = search.value;

    if (!buscarTemaikenes) {
        return
    }

    searchSong(buscarTemaikenes);
    });
};


iniciar();
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".boton-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++){
    fetch(URL + i)
        .then((response)=> response.json())
        .then(data => mostrarPokemon(data))
}
function mostrarPokemon(pokemon){
    
    let tipos = pokemon.types.map(type =>
        `<p class="electric tipo rounded-full bg-${type.type.name} p-2">${type.type.name}</p>`);
        tipos = tipos.join("");

    let pokemonId = pokemon.id.toString();
    if (pokemonId.length === 1){
        pokemonId = "00"+pokemonId;
    } else if (pokemonId.length === 2){
          pokemonId = "0"+pokemonId;
    }
    
    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "place-items-center", "relative", "shadow-lg", "overflow-hidden", "rounded-md", "p-4", "w-full");
    div.innerHTML = `
        <p class="pokemon-id-back absolute left-1/2 -translate-x-1/2 translate-y-1/2 text-8xl -z-10 text-gray-300">#${pokemonId}</p>
        <div class="pokemon-imagen w-full max-w-[14rem]">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        </div>
        <div class="pokemon-info flex flex-col place-items-center gap-2 flex-wrap">
            <div class="nombre-contenedor flex flex-wrap gap-x-2 justify-center items-center">
                <p class="pokemon-id rounded-full bg-gray-300 p-2">#${pokemonId}</p>
                <h2 class="pokemon-nombre uppercase text-2xl">${pokemon.name}</h2>
            </div>
            <div class="pokemon-tipos flex gap-2 uppercase flex-wrap justify-center">
                ${tipos}
            </div>
            <div class="pokemon-stats flex flex-wrap gap-x-2 ">
                <p class="stat p-2 rounded-full bg-gray-300">${pokemon.height}m</p>
                <p class="stat p-2 rounded-full bg-gray-300">${pokemon.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    console.log(botonId)

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))

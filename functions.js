const pokemons = [
    {id:1, name: "Bulbasaur",type: "hierva", price: 25, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
    {id:2, name: "Ivysaur",type: "hierva", price: 30, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" },
    {id:3, name: "Venusaur",type: "hierva", price: 40, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" },
    {id:4, name: "Charmander",type: "fuego", price: 25, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" },
    {id:5, name: "Charmeleon",type: "fuego", price: 30, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png" },
    {id:6, name: "Charizard",type: "fuego", price: 40, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" },
    {id:7, name: "Squirtle",type: "agua", price: 25, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
    {id:8, name: "Wartortle",type: "agua", price: 30, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png" },
    {id:9, name: "Blastoise",type: "agua", price: 40, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png" },
    {id:10, name: "Caterpie",type: "bicho", price: 3, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png" },
    {id:11, name: "Metapod",type: "bicho", price: 10, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png" },
    {id:12, name: "Butterfree",type: "bicho", price: 25, image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png" }
];

const savePokemonsLS = (pokemons) =>{
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
}

const loadPokemonsLS = (pokemons) => {
    return JSON.parse(localStorage.getItem("pokemons")) || [];
    
}

const renderPokemons = ()=>{
    const pokemons = loadPokemonsLS();
    let contentHTML = "";
    pokemons.forEach(pokemon => {
        contentHTML += `<div class="flex flex-col place-items-center justify-center">
        <img src=${pokemon.image} alt=${pokemon.name}>
        <h2>${pokemon.name}</h2>
        <p>Price: ${pokemon.price} </p>
        <button class="bg-red-600 text-white block w-max p-4 rounded-md" onClick="addToCart(${pokemon.id})">Agregar +</button>
    </div>
        `      
    });
    document.getElementById("products").innerHTML = contentHTML;
}

const saveCartLS = (cart) =>{
    localStorage.setItem("cart", JSON.stringify(cart));
}

const obtainCartLS = ()=>{
    return JSON.parse(localStorage.getItem("cart")) || [];
}

const searchPokemon = (id)=>{
    const pokemons =loadPokemonsLS();
    let pokemon = pokemons.find(item => item.id === id);
    return pokemon;
}

const addToCart = (id)=>{
   const cart = obtainCartLS();
   const pokemon = searchPokemon(id);
   cart.push(pokemon);
   saveCartLS(cart);   
}

const isInCart = (id) => {
    const pokemons = loadPokemonsLS();
    return pokemons.some(item=> item.id === id);
} 

const renderCart = ()=>{
    const pokemons = obtainCartLS();
    let contentHTML = "";
    pokemons.forEach(pokemon => {
        contentHTML += `<div class="flex flex-col md:flex-row place-items-center justify-between">
        <img src=${pokemon.image} alt=${pokemon.name}>
        <h2>${pokemon.name}</h2>
        <button class="bg-red-600 text-white block w-max p-4 rounded-md" onClick="">Eliminar</button>
    </div>
        `      
    });
    document.getElementById("cart").innerHTML = contentHTML;
}

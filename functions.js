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
        contentHTML += `<div class="flex flex-col place-items-center justify-center gap-4">
        <img src=${pokemon.image} alt=${pokemon.name}>
        <h2>${pokemon.name}</h2>
        <p>Price: ${pokemon.price} </p>
        <button class="bg-red-600 text-white block w-max p-2 rounded-md" onClick="addToCart(${pokemon.id})">Agregar +</button>
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
    if(isInCart(id)){
        const existingPokemon = cart.find(pokemon=> pokemon.id === id);
        existingPokemon.quantity++;
    } else{
        pokemon.quantity = 1;
        cart.push(pokemon);
    }
  
   saveCartLS(cart);
   renderCartQuantity();   
}


const isInCart = (id) => {
    const pokemons = obtainCartLS();
    return pokemons.some(item=> item.id === id);
} 

const cartQuantity = ()=>{
    const cart = obtainCartLS();
    return cart.reduce((total, pokemon)=> total += pokemon.quantity,0);
}


const cartTotalPrice = ()=>{
    const cart = obtainCartLS();
    return cart.reduce((total, pokemon)=> total += pokemon.price*pokemon.quantity,0);
}

const renderCartQuantity = ()=>{
    let totalCartQuantity = document.getElementById("totalCartQuantity");
    totalCartQuantity.innerHTML = cartQuantity();
}

const renderCart = ()=>{
    const pokemons = obtainCartLS();
    let contentHTML = `<table> `;
    if (cartQuantity()>0){
        pokemons.forEach(pokemon => {
            contentHTML += `
                <tbody>
                    <tr class="grid grid-cols-1 md:grid-cols-6 place-items-center gap-4">
                    <td><img class="m-auto " src=${pokemon.image} alt=${pokemon.name}></td>
                    <td>${pokemon.name}</td>
                    <td>x${pokemon.quantity}</td>
                    <td>$${pokemon.price}</td>
                    <td>$${pokemon.price*pokemon.quantity}</td>
                    <td><button class="bg-red-600 text-white text-center p-2 rounded-md" onClick="deleteFromCart(${pokemon.id})">Eliminar</button></td>
                    </tr>
                </tbody>
            `      
        });
            contentHTML += `
            <tbody>
                <tr class="grid grid-cols-6 place-items-center gap-4 mt-4">    
                <td class="col-span-4">Total</td>
                <td>$${cartTotalPrice()}</td>
                <td></td>
                </tr>
            </tbody>
            </table>`;
    } else {
        contentHTML = `<div class="w-[50%] mx-auto text-center">
        <div>¡Parece que no hay nadie por aquí, regresa a la tienda y elige tu pokémon favorito!</div>
        <a class="mx-auto mt-4 bg-red-600 text-white block w-max p-4 rounded-md" href="store.html">Tienda</a>
        </div>
        `
    }
    
    document.getElementById("cart").innerHTML = contentHTML;
}

const deleteFromCart = (id)=>{
    const cart = obtainCartLS();
    const newCart = cart.filter(pokemon => pokemon.id !==id );
    saveCartLS(newCart);
    renderCart();
    renderCartQuantity();

}

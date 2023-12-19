const pokeApi = {};

function convertePokemonModel(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    const [type] = types;    
    pokemon.types = types;
    pokemon.type = type;

    pokemon.imagem = pokeDetail.sprites.other.dream_world.front_default; 
    
    //Atributos para detalhamento de pokemon 
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight; 
    pokemon.abilities = pokeDetail.abilities.map(past => past.ability.name);

    pokemon.stats = pokeDetail.stats; 
    pokemon.stat= pokeDetail.stats.map(item => item.stat.name);
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertePokemonModel);
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch(err => console.log(err));
}

pokeApi.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
    .then((response) => response.json())
    .then(convertePokemonModel)
    .catch((err) => console.log(err));
}


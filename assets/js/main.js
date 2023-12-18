const lista = document.querySelector('.pokemons');
const botaoAdicionaPokemon = document.querySelector('.botao');

var offset = 0;

inserePokemons();

botaoAdicionaPokemon.addEventListener('click', () => {    
    offset += 10;
    var limit = 10;
    inserePokemons (offset, limit);
});

function inserePokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(pokemons => {
        const listaDePokemons = pokemons.map(criaListaDePokemons).join('');        
        lista.innerHTML += listaDePokemons;
    });    
}


function criaListaDePokemons(pokemon) {
    let segundoAtributo;

    //condicional para os pokemons com apenas 1 atributo, limpar no html o segundo atributo
    if (!pokemon.types[1]) {
        segundoAtributo = "<li class=li-none></li>";
    } else {
        segundoAtributo = `<li class='${pokemon.types[0].type.name}'>${pokemon.types[1].type.name}</li>`;
    }

    return `<li class="pokemon ${pokemon.types[0].type.name}">
    <span class="pokemon-number">#${pokemon.id}</span>
    <span class="pokemon-name">${pokemon.name}</span>
    <div class="pokemon-detail">
        <ol class="pokemon-type">
            <li class = "${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</li>
            ${segundoAtributo}
        </ol>
        <img src="${pokemon.sprites.other.dream_world.front_default}"
        alt="${pokemon.name}">
    </div>    
    </li>`;
}

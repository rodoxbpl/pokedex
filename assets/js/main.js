const lista = document.querySelector('.pokemons');
const pokeId = document.querySelector('.pokemon-number');
const botaoAdicionaPokemon = document.querySelector('.load-more');

const liPokemon = document.querySelector('.poke-detail');

let id = null;

const maxRecords = 151;
const limit = 10;
let offset = 0;


inserePokemons(offset, limit);

botaoAdicionaPokemon.addEventListener('click', () => {
    offset += limit;

    const qtdRecords = offset + limit;

    if(qtdRecords >= maxRecords) {
        const newLimit = maxRecords - offset;
        inserePokemons(offset, newLimit);
        
        botaoAdicionaPokemon.parentElement.removeChild(botaoAdicionaPokemon);
    } else{
        inserePokemons(offset, limit);
    }
    
});

function inserePokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(pokemons => {
        const listaDePokemons = pokemons.map(criaListaDePokemons).join('');
        lista.innerHTML += listaDePokemons;
    });
}

function criaListaDePokemons(pokemon) {
    id = pokemon.id;
    return `<a class="poke-detail" href="poke-detail.html?id=${pokemon.id}"><li id="li-poke" class="pokemon ${pokemon.type}">
    <span class="pokemon-number">#${pokemon.id}</span>
    <span class="pokemon-name">${pokemon.name}</span>
    <div class="pokemon-detail">
        <ol class="pokemon-type">
            ${pokemon.types.map(type => `<li class = "${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.imagem}"
        alt="${pokemon.name}">
    </div>    
    </li></a>`;
}
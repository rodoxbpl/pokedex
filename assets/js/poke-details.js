const listaAtributos = document.querySelector('.content-secundario');
const listaPrincipal = document.querySelector('.content-principal');

window.addEventListener('load', () => {

    const [_, pokeid] = window.location.search.split("=");

    pokeApi.getPokemon(pokeid).then(pokemon => {
        const dadosPrincipaisdoPokemon = insereDadosPokemonHtml(pokemon);
        const dadosDoPokemon = criaDetalhesDoPokemon(pokemon);
        listaPrincipal.innerHTML = dadosPrincipaisdoPokemon;
        listaAtributos.innerHTML = dadosDoPokemon;

    });
});

window.addEventListener('popstate', () => {
    const [_, pokeid] = window.location.search.split("=");
    pokeApi.getPokemon(pokeid).then(pokemon => {
        const dadosDoPokemon = criaDetalhesDoPokemon(pokemon);
        listaAtributos.innerHTML = dadosDoPokemon;

    });
});

function insereDadosPokemonHtml(pokemon) {
    return `
    <div class="secao-pokemon ${pokemon.type}">
        <div class="pokemon-texto">
            <span class="pokemon-name">${pokemon.name}</span>
            <span class="pokemon-id">#${pokemon.id}</span>
        </div>

        <div class="pokemon-detail">
            <ol class="pokemon-type">
                ${pokemon.types.map(type => `<li class = "${type}">${type}</li>`).join('')}
            </ol>
        </div>            
        <img class="pokemon-img"
            src="${pokemon.imagem}" alt="${pokemon.name}">   
    </div> 
    `;
}

function criaDetalhesDoPokemon(pokemon) {
    return ` 
    <div class="secao-atributos">
        <ol class="pokemons">
            <div class="pokemons-atributos">
                <li>Height: ${pokemon.height}ft</li>
                <li>Weight: ${pokemon.weight}lb</li>
            </div>
            <ol class="status">${pokemon.stats.map(status => `<li>${status.base_stat} <p>${status.stat.name}</p></li>`).join('')}</ol>
            <p>Abilities:</p>${pokemon.abilities.map(ability => `<li>${ability}`).join('')}</li>
        </ol>
    </div>`;
}



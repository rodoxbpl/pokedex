const listaAtributos = document.querySelector('.content-secundario');
const listaPrincipal = document.querySelector('.content-principal');

pegaDados();

function pegaDados() {
    const [_, pokeid] = window.location.search.split("=");

    pokeApi.getPokemon(pokeid).then(pokemon => {
        const dadosPrincipaisdoPokemon = insereDadosDoPokemon(pokemon);
        const dadosDoPokemon = insereAtributosDoPokemon(pokemon);
        listaPrincipal.innerHTML = dadosPrincipaisdoPokemon;
        listaAtributos.innerHTML = dadosDoPokemon;
    });
}

function insereDadosDoPokemon(pokemon) {
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

function insereAtributosDoPokemon(pokemon) {
    return ` 
    <div class="secao-atributos">
        <ol class="atributos">
            <div class="pokemons-atributos">
                <li>Height: ${pokemon.height}ft</li>
                <li>Weight: ${pokemon.weight}lb</li>
            </div>
            <ol class="status">${pokemon.stats.map(status => `<li>${status.base_stat} <p>${status.stat.name}</p></li>`).join('')}</ol>
            <p>Abilities:</p>${pokemon.abilities.map(ability => `<li class="habilidades">${ability}`).join('')}</li>
        </ol>
    </div>`;
}



const pokemonOl = document.getElementById("pokemons");
const loadMoreButton = document.getElementById("loadMore");
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItems(offset, limit) {
    
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonOl.innerHTML += pokemonList.map((pokemon) => `
        <li class="pokemon ${pokemon.mainType}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
                
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
        </li>
        `).join('');
    })

}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecord = offset + limit;

    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit)
    }
    
})
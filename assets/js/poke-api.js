const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) // me entrega uma promise...
        .then((response) => response.json()) // recebo essa promise e transformo para json... 
        .then((jsonBody) => jsonBody.results) // recebo o json e extraio somente o results que é o que me interessa
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails)) // mapeamos a lista de pokemons em uma lista de detalhes, que e um novo fetch
        .then((detailRequests) => Promise.all(detailRequests)) // espera todos os fetchs terminarem e vai pro proximo

        // aqui ja tenho a lista de detalhes dos pokemons
        .then((pokemonsDetails) => pokemonsDetails)

        .catch((error) => console.error(error))

};

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) // faz o fetch do pokemon especifico com detalhes dos pokemons da lista
        .then(convertApiDetailToPokemon) // chama a função que formata o pokemon detalhado abstraindo somente o necessário
}

// função que recebe o pokemon json detalhado e abstrai ele 
function convertApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type1] = types

    pokemon.types = types;
    pokemon.mainType = type1;

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default;

    return pokemon;
}
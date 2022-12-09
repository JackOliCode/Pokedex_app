// IIFE for pokemonList array
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
        {name: 'Ivysaur', height: 1.0, type: ['grass', 'poison']},
        {name: 'Venusaur', height: 2, type: ['grass', 'poison']},
        {name: 'Charmander', height: 0.6, type: ['fire']},
        {name: 'Charmeleon', height: 1.1 , type: ['fire']},
        {name: 'Charizard', height: 1.7, type: ['fire', 'flying']}];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList
    }

    return {
        add: add,
        getAll: getAll
    };
})();

/*update forEach loop using key to access IIFE
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(`${pokemon.name} (height ${pokemon.height})`);
    if (pokemon.height > 1.7) {
        document.write(" - Wow, that's big! <br>");
    }else {
        document.write("<br>");
    }
});*/

pokemonRepository.getAll().forEach(function(pokemon) {
    let pokemonul = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = [pokemon.name];
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonul.appendChild(listItem);
});
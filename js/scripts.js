/* 
let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1.0, type: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type: ['fire']},
    {name: 'Charmeleon', height: 1.1 , type: ['fire']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},



];/*

// code for loop to list pokemon and height 
/*
for (let i=0; i < pokemonList.length; i++){
    document.write(`${pokemonList[i].name} (height ${pokemonList[i].height})`);
    if (pokemonList[i].height > 1.7) {
        document.write(" - Wow, that's big! <br>");
    }else {
        document.write("<br>");
    }
} */

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

console.log(pokemonRepository.getAll());
pokemonRepository.add ({name: 'Pikachu', height: 1.4, type: ['electric'] });
console.log(pokemonRepository.getAll());

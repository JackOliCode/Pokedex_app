let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1.0, type: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type: ['fire']},
    {name: 'Charmeleon', height: 1.1 , type: ['fire']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},



];

for (let i=0; i < pokemonList.length; i++){
    document.write(`${pokemonList[i].name} (height ${pokemonList[i].height}) <br>`); 
}
// IIFE for pokemonList array
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList
    }

    function addListItem(pokemon) {
        let pokemonul = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonul.appendChild(listItem);
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }


    function loadList() { //name function
        return fetch(apiUrl).then(function (response) { //return gives something to use, fetch(apiUrl) is a promise, the value of which is given to response if resovled
           return response.json(); // return response parameter and parsed via .json
        }).then(function (json) { //.json() is another promise and the parsed info given to json parameter
            json.results.forEach(function (item) { //forEach fuction for json parameter (which is the pulled info from api) given to parameter item
                let = pokemon = { // new object 
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon); // add object
            });
        }).catch(function (e) {
            console.error(e);
        })   
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList
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
    pokemonRepository.addListItem(pokemon);
});
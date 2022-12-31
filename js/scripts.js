// IIFE for pokemonList array
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let pokemonListElement = $('.pokemon-list');
    
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList
    }

    /*previous addList item
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
    }*/

    function addListItem(pokemon) {
        //creating a list item (pokemons) with a button
        let listItem = $('<li class="list-group-item"></li>');
        let button = $(
          '<button class="pokemon-button btn btn-warning" data-target="#pokemon-modal" data-toggle="modal">' +
            pokemon.name +
            '</button>'
        );
        // add button to list item and add item(pokemon) to the pokemon list elements in index.html
        listItem.append(button);
        pokemonListElement.append(listItem);
        // listens to clicks on pokemon button to show more details
        button.on('click', function () {
          showDetails(pokemon);
        });
      }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) { // now add details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = [];
            for (let index = 0; index < details.types.length; index++) {
                item.types.push(details.types[index].type.name);
            }
        }).catch(function (e) {
            console.error (e);
        });
    }

    /*modal function//
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.add('is-visible');
    //clear all existing modal content//
        modalContainer.innerHTML = ' ';
     //create modal div and add modal class
        let modal = document.createElement('div');
        modal.classList.add('modal');
    //close button element
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

    //add pkmnImageElement for img of pokemon (img)
        let pkmnImageElement = document.createElement('img');
        pkmnImageElement.classList.add('pkmn-image-class')
        pkmnImageElement.src = pokemon.imageUrl;

    // add pkmnNameElement for pokemon.name (h1)
        let pkmnNameElement = document.createElement('h1');
        pkmnNameElement.innerText = pokemon.name;
  
    // add pkmnTypesElement for pokemon.types (p)
        let pkmnTypesElement = document.createElement('p');
        pkmnTypesElement.innerText = 'Type: ' + pokemon.types

    // add pkmnHeightElement for pokemon.height (p)
        let pkmnHeightElement = document.createElement('p');
        pkmnHeightElement.innerText = 'Height: ' + pokemon.height;

    //append the elements to parent element modal
        modal.appendChild(closeButtonElement);
        modal.appendChild(pkmnImageElement);
        modal.appendChild(pkmnNameElement);
        modal.appendChild(pkmnTypesElement);
        modal.appendChild(pkmnHeightElement);
        modalContainer.appendChild(modal);

    // add event.Listener for clicking outside modal to hideModal
        modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    };

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });*/

      function showModal(item) {
        let modalBody = $(".modal-body"); // define variables
        let modalTitle = $(".modal-title");

        modalTitle.empty();
        modalBody.empty(); //clear existing content of modal

        //creating element for name
        let nameElement = $("<h1>" + item.name + "</h1>");
        //creating image element
        let imageElement = $('<img class="modal-img">');
        imageElement.attr("src", item.imageUrl);
        //creating height element
        let heightElement = $("<p>" + "Height: " + item.height + "</p>");
        //creating type element
        let typeElement = $("<p>" + "Type(s): " + item.types + "</p>");

        //append to parent elements
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typeElement);
      }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// Outside the IIFE

pokemonRepository.loadList().then(function() { // data is loaded
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});
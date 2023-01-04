/* eslint-disable no-undef */
// IIFE for pokemonList array
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let pokemonListElement = $('.pokemon-list'); // replaced let pokemonul = document.querySelector('.pokemon-list');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    //creating a list item (pokemons) with a button
    let listItem = $('<li></li>');
    listItem.addClass('group-list-item');
    let button = $(
      '<button type="button" class="button-class btn btn-primary" data-target="#pokemon-modal" data-toggle="modal">' +
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

  function loadList() {
    //name function
    return fetch(apiUrl)
      .then(function (response) {
        //return gives something to use, fetch(apiUrl) is a promise, the value of which is given to response if resovled
        return response.json(); // return response parameter and parsed via .json
      })
      .then(function (json) {
        //.json() is another promise and the parsed info given to json parameter
        json.results.forEach(function (item) {
          //forEach fuction for json parameter (which is the pulled info from api) given to parameter item
          let = pokemon = {
            // new object
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon); // add object
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // now add details to the item
        item.imageUrl = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.weight = details.weight / 10;
        item.height = details.height;
        item.types = [];
        for (let index = 0; index < details.types.length; index++) {
          item.types.push(details.types[index].type.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(item) {
    let modalBody = $('.modal-body'); // define variables
    let modalTitle = $('.modal-title');
    let modalType = $('.modal-type');

    modalTitle.empty();
    modalBody.empty(); //clear existing content of modal
    modalType.empty();

    let titleElement = $('<b>' + item.name + '</b>');
    //creating image element
    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', item.imageUrl);
    let imageElementBack = $('<img class="modal-img">');
    imageElementBack.attr('src', item.imageUrlBack);
    //creating height element
    let heightElement = $('<p>' + 'Height: ' + item.height + '</p>');
    //creating weight element
    let weightElement = $('<p>' + 'Weight: ' + item.weight + 'kg' + '</p>');
    //creating type element
    let typeElement = $('<b>' + item.types + ' type Pokemon' + '</b>');

    //append to parent elements
    modalTitle.append(titleElement);
    modalType.append(typeElement);
    modalBody.append(imageElement);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// Outside the IIFE

pokemonRepository.loadList().then(function () {
  // data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

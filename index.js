// VARIABLES AND OTHER SETUP
let baseUrl = "https://pokeapi.co/api/v2/";
let imageBaseUrl = "https://pokeres.bastionbot.org/images/pokemon/";
let spriteBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let pokemonId = 0;
let pokemonImage = document.getElementById("sprite");
let shinyImage = document.getElementById("spriteShiny");
let pokemonName = document.getElementById("pokemonName");
let pokeNumber = document.getElementById("pokeNumber");
let pokemonType = document.getElementById("pokemonType");
let pokeHeight = document.getElementById("height");
let pokeWeight = document.getElementById("weight");
let evolvesFrom = document.getElementById("evoFrom");
let searchBox = document.getElementById("search-box");
let pokeInfo = document.getElementById("pokeInfo");
let inputError = document.getElementById("input-error");


//syntax for if pokemon is random
function randomPokemon() {
  pokemonId = randomIntFromInterval(1, 807);
  console.log(pokemonId);
  clearPokemon();
  showPokemon(pokemonId);
}

//syntax for if pokemon is searched
function searchedPokemon() {
    pokemonId = searchBox.value;
    searchBox.value = "";
    inputError.style.display = "none";
    console.log(pokemonId);
    clearPokemon();
    showPokemon(pokemonId);
}

//clear the list info between searches
function clearPokemon() {
  pokemonImage.style.display = "none";
  shinyImage.style.display = "none";
  pokemonName.innerText = "";
  pokeNumber.innerText = "";
  pokemonType.innerText = "";
  pokeHeight.innerText = "";
  pokeWeight.innerText = "";
  evolvesFrom.innerText = "";
}

//setting urls, displaying the list, and calling fetch methods
function showPokemon(pokemonId) {
  speciesUrl = `${baseUrl}pokemon-species/${pokemonId}`;
  pokemonUrl = `${baseUrl}pokemon/${pokemonId}`;

  pokemonName.innerText = "Name:";
  pokeNumber.innerText = "Number:";
  pokemonType.innerText = "Type:";
  pokeHeight.innerText = "Height:";
  pokeWeight.innerText = "Weight:";
  evolvesFrom.innerText = "Evolves From:";

  fetchSpecies();
  fetchPokemon();
  pokeInfo.style.display = "block";
}



function fetchSpecies() {
  function CheckError(response) {
    if (response.status >= 200 && response.status <= 299) {
      inputError.style.display = "none";
      return response.json();
    } else {
      inputError.innerText = "Pokemon not found. Try again.";
      inputError.style.display="block";
      pokeInfo.style.display="none";
      throw Error(response.statusText);
    }
  }
  fetch(speciesUrl)
    .then(CheckError)
    .then((data) => {
      fetchSpeciesInfo(data);
    })
    .catch((err) => console.log(err)); 
}

function fetchSpeciesInfo(passedData) {
  pokemonName.innerText += " " + capitalizeFirstLetter(passedData.name);
  let imageUrl = `${spriteBaseUrl}${passedData.id}.png`;
  let shinyUrl = `${spriteBaseUrl}/shiny/${passedData.id}.png`;
  pokemonImage.src = imageUrl;
  pokemonImage.style.display = "inline-block";
  shinyImage.src = shinyUrl;
  shinyImage.style.display = "inline-block";
  let evoSpecies = passedData.evolves_from_species;
  let evolChain = passedData.evolution_chain;
  if (evoSpecies === null && evolChain === null) {
    evolvesFrom.innerText +=
      " " + `${capitalizeFirstLetter(passedData.name)} does not evolve.`;
  } else if (evoSpecies === null) {
    evolvesFrom.innerText +=
      " " +
      `${capitalizeFirstLetter(
        passedData.name
      )} is the first in its evolutionary chain.`;
  } else {
    evolvesFrom.innerText += " " + `${capitalizeFirstLetter(evoSpecies.name)}`;
  }
}



function fetchPokemon() {
  function CheckError(response) {
    if (response.status >= 200 && response.status <= 299) {
      inputError.style.display = "none";
      return response.json();
    } else {
      inputError.innerText = "Pokemon not found. Try again.";
      inputError.style.display="block";
      pokeInfo.style.display = "none";
      throw Error(response.statusText);
    }
  }
  fetch(pokemonUrl)
    .then(CheckError)
    .then((data) => {
      fetchPokemonInfo(data);
    })
    .catch((err) => console.log(err));
}

function fetchPokemonInfo(passedData) {
  pokeNumber.innerText += " " + `${passedData.id}`;

  let typeArray = passedData.types;
  console.log(typeArray);
  if (typeArray.length > 1) {
    pokemonType.innerText +=
      " " +
      `${capitalizeFirstLetter(
        typeArray[0].type.name
      )} / ${capitalizeFirstLetter(typeArray[1].type.name)}`;
  } else {
    pokemonType.innerText +=
      " " + `${capitalizeFirstLetter(typeArray[0].type.name)}`;
  }

  let height = passedData.height / 10;
  let heightInches = convertMetersToInches(height);
  let heightFeetInches = convertInchesToFeet(heightInches);
  let weight = passedData.weight / 10;
  let weightOunces = convertKilogramsToOunces(weight);
  let weightPoundsOunces = convertOuncesToPounds(weightOunces);
  pokeHeight.innerText += " " + `${heightFeetInches} | ${height}m`;
  pokeWeight.innerText += " " + `${weightPoundsOunces} | ${weight}kg`;
}

// CONVERSIONS AND CALCULATIONS
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertInchesToFeet(v) {
  var feet = Math.floor(v / 12);
  var inches = v % 12;
  return feet + "'" + inches + '"';
}

function convertMetersToInches(m) {
  let inches = m * 39.37;
  return Math.round(inches);
}

function convertOuncesToPounds(weight) {
  let pounds = Math.floor(weight / 16);
  let ounces = weight % 16;
  return pounds + "lbs, " + ounces + "oz";
}

function convertKilogramsToOunces(k) {
  let ounces = k * 35.274;
  return Math.round(ounces);
}

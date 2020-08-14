let baseUrl = "https://pokeapi.co/api/v2/";
let imageBaseUrl = "https://pokeres.bastionbot.org/images/pokemon/";
function fetchStarters() {
  
    let genUrl = `${baseUrl}generation/1`;

    fetch(genUrl)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        fetchStarterInfo(data);
      })
      .catch((err) => console.log(err));
  }


fetchStarters();

function fetchStarterInfo(passedData) {
//   let grass = [];
//   let fire = [];
//   let water = [];
console.log(passedData.id);
let grass = document.getElementById("grass");
let fire = document.getElementById("fire");
let water = document.getElementById("water");
let grassImage = grass.style.backgroundImage;
let fireImage = fire.style.backgroundImage;
let waterImage = water.style.backgroundImage;
  
  if (passedData.id == 5) {
    for (i = 1; i <= 3; i++) {
      switch (i) {
        case 1:
          grass.push(passedData.pokemon_species[i].name);
          break;
        case 2:
          fire.push(passedData.pokemon_species[i].name);
          break;
        case 3:
          water.push(passedData.pokemon_species[i].name);
          break;
      }
    }
    console.log(grass, fire, water);
  } else if(passedData.id == 2) {
    for (i = 0; i <= 2; i++) {
      switch (i) {
        case 0:
          grass.push(passedData.pokemon_species[i].name);
          break;
        case 1:
          fire.push(passedData.pokemon_species[i].name);
          break;
        case 2:
          water.push(passedData.pokemon_species[6].name);
          break;
      }
    }
    console.log(grass, fire, water);
  } else {
    for (i = 0; i <= 2; i++) {
        let pokemonUrl = passedData.pokemon_species[i].url;
        let speciesNumber = pokemonUrl.substring(42, pokemonUrl.length -1);
      switch (i) {
        case 0:
            
          grassImage = `${imageBaseUrl}${speciesNumber}.png`;
          break;
        case 1:
        fireImage = `${imageBaseUrl}${speciesNumber}.png`;
          break;
        case 2:
            waterImage = `${imageBaseUrl}${speciesNumber}.png`;
          break;
      }
    }
    console.log(grass, fire, water);
  }
  return(grass, fire, water);
}
const url = "https://pokeapi.co/api/v2/pokemon?limit=721";
fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    let pokemonSelection = document.getElementById("pokemonSelection");
    let index = 1;
    for (pokemon in json.results) {
      let option = document.createElement("option");
      let pokemonName = json.results[pokemon].name;
      option.value = pokemonName;
      let pokemonNumber = index;
      option.text = pokemonNumber + " - " + pokemonName[0].toUpperCase() + pokemonName.slice(1);
      pokemonSelection.add(option, index);
      index++;
    }
    pokemonSelection.disabled = false;
  });

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function titleCase(str) {
  str = str.replace(/-/g, " ");
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

let results = "";
let abilities = [];

document.getElementById("pokemonSubmit").addEventListener("click", function(event) {

  event.preventDefault();
  let instructions = document.getElementById("instructions");
  if (instructions != null) {
    instructions.parentNode.removeChild(instructions);
  }
  const pokemonSelected = document.getElementById("pokemonSelection").value;
  if (pokemonSelected === "")
    return;

  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonSelected + "/";
  fetch(pokemonUrl)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      // Set title to Pokemon name
      let pokemonName = json.name;
      let city = document.getElementById("pokemonName").textContent =
        titleCase(pokemonName);
      // Appearance
      abilities = [];
      results = '<div class="appearance"><h2>Appearance</h2>';
      results += '<div class="appearance-content">';
      results += '<img src="https://serebii.net/xy/pokemon/';
      results += pad(json.id, 3);
      results += '.png">';
      results += '<img src="https://serebii.net/Shiny/XY/';
      results += pad(json.id, 3);
      results += '.png">';
      results += '</div>'; //appearance content
      results += '</div>'; // appearance
      results += '<div class="stats-holder">';
      //Types
      results += '<div class="stat"><h2>Types</h2><div class="stat-content">'
      for (type in json.types) {
        results += '<img src="https://serebii.net/pokedex-bw/type/'
        + json.types[type].type.name + '.gif">';
      }
      results += '</div></div>'; // types
      //Weight
      results += '<div class="stat"><h2>Weight</h2><div class="stat-content">'
      results += '<p>' + json.weight / 10 + ' kg</p>';
      results += '</div></div>'; // weight
      //Height
      results += '<div class="stat"><h2>Height</h2><div class="stat-content">'
      results += '<p>' + json.height / 10 + ' m</p>';
      results += '</div></div>'; // Height
      //Held Items
      results += '<div class="stat"><h2>Held Items</h2><div class="stat-content">'
      if (json.held_items.length == 0) {
        results += '<p>None</p>';
      }
      for (item in json.held_items) {
        results += '<p>' + titleCase(json.held_items[item].item.name) + '</p>';
      }
      results += '</div></div>'; // Held Items
      //Locations
      results += '<div class="stat"><h2>Locations Found</h2><div class="stat-content" id="locations">'
      results += '</div></div>'; // Locations
      //Abilities
      results += '<div class="stat"><h2>Abilities</h2><div class="stat-content">'
      for (ability in json.abilities) {
        results += '<p>' + titleCase(json.abilities[ability].ability.name) + '</p>';
        abilities.push(json.abilities[ability].ability.url);
      }
      results += '</div></div>'; // Abilities
      //Stats
      results += '<div class="stat"><h2>Stats</h2><div class="stat-content">'
      for (stat in json.stats) {
        results += '<p>' + titleCase(json.stats[stat].stat.name).replace("-", " ") + ': ';
        results += json.stats[stat].base_stat + '</p>';
      }
      results += '</div></div>'; // Stats
      results += '</div>';
      return fetch(json.location_area_encounters);
    })
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let locations = "";
      if (json.length == 0) {
        locations = "<p>Cannot be found in wild</p>"
      } else {
        for (let i = 0; i < json.length && i < 5; i++) {
          locations += '<p>' + titleCase(json[i].location_area.name) + '</p>';
        }
      }
      results = results.replace('id="locations">', 'id="locations">' + locations);
      document.getElementById("pokemonInfo").innerHTML = results;
    });
});

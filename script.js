const loadPokeApi = async (pokemonId) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const pokemon = ["149", "149", "141", "141", "142", "142", "143", "143", "144", "144", "145", "145", "146", "146", "147", "147"];

let shuf_pokemon = pokemon.sort(() => Math.random() - 0.5);

async function createPokemonBox(pokemonId) {
  const data = await loadPokeApi(pokemonId);
  const box = document.createElement('div');
  box.className = 'item';
  const img = document.createElement('img');
  img.src = data.sprites.front_default;
  img.alt = data.name;
  box.appendChild(img);

  box.onclick = function () {
    this.classList.add('boxOpen');
    setTimeout(() => {
      this.classList.remove('boxOpen');
    }, 1500);
  };

  document.querySelector('.game').appendChild(box);
}

async function createGame() {
  for (let i = 0; i < shuf_pokemon.length; i++) {
    await createPokemonBox(shuf_pokemon[i]);
  }
}

createGame();



const pokemonData = {}; 

fetch('/pokeData')
  .then(response => response.json())
  .then(data => {
    data.forEach(pokemon => {
      pokemonData[pokemon.id] = pokemon;
    });

    
    const pokemon = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"];
    let shuf_pokemon = pokemon.sort(() => Math.random() - 0.5);

    let flippedCards = [];
    let matchedPairs = 0;

    function createPokemonBox(pokemonId) {
      const data = pokemonData[pokemonId - 1];
      const box = document.createElement("div");
      box.className = "item";
      box.dataset.id = pokemonId;
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      img.alt = data.name;
      box.appendChild(img);

      box.onclick = function () {
        if (
          flippedCards.length < 2 &&
          !flippedCards.includes(this) &&
          !this.classList.contains("boxOpen")
        ) {
          this.classList.add("boxOpen");
          flippedCards.push(this);

          if (flippedCards.length === 2) {
            const card1 = flippedCards[0].getAttribute("data-id");
            const card2 = flippedCards[1].getAttribute("data-id");

            if (card1 === card2) {
              flippedCards = [];
              matchedPairs++;

              if (matchedPairs === shuf_pokemon.length / 2) {
                setTimeout(() => {
                  alert("¡Has ganado!");
                }, 500);
              }
            } else {
              setTimeout(() => {
                flippedCards.forEach((card) => card.classList.remove("boxOpen"));
                flippedCards = [];
              }, 1000);
            }
          }
        }
      };

      document.querySelector(".game").appendChild(box);
    }

    async function createGame() {
      for (let i = 0; i < shuf_pokemon.length; i++) {
        createPokemonBox(shuf_pokemon[i]);
      }
    }

    createGame();
  })


  .catch(error => {
    console.error('Error al obtener los datos de Pokémon:', error);
  });
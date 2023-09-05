const pokemonAPI = {};

fetch("http:localhost:8000/pokeAPI")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((pokemon) => {
      pokemonAPI[pokemon.id] = pokemon;
    });

    const pokemonIds = [
      "1", "1", "2", "2", "3", "3", "4", "4",
      "5", "5", "6", "6", "7", "7", "9", "9"
    ];

    // Mezcla los Pokémons de manera aleatoria
    let shuffledPokemonIds = pokemonIds.sort(() => Math.random() - 0.5);

    let flippedCards = [];
    let matchedPairs = 0;

    // Variables para el temporizador y movimientos
    let seconds = 0;
    let minutes = 0;
    let movesCount = 0;
    let timerInterval;

    // Variable para rastrear si el juego ha comenzado
    let gameStarted = false;

    // Función para detener el temporizador
    function stopTimer() {
      clearInterval(timerInterval);
      gameStarted = false;
    }

    // Función para iniciar el temporizador
    function startTimer() {
      timerInterval = setInterval(updateTimer, 1000);
      gameStarted = true;
    }

    // Función para actualizar el temporizador
    function updateTimer() {
      seconds += 1;
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }

      // Formatea los valores de tiempo con 0 si son menores a 10
      let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
      let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

      // Actualiza el elemento con el tiempo transcurrido
      document.getElementById(
        "time"
      ).innerHTML = `<span>Time: ${minutesValue}:${secondsValue}</span>`;
    }

    // Función para actualizar el contador de movimientos
    function updateMoves() {
      movesCount++;
      // Actualiza el elemento HTML con el contador de movimientos
      document.getElementById("moves").innerHTML = `<span>Moves: ${movesCount}</span>`;
    }

    // Inicia el temporizador que llama a updateTimer cada segundo
    // pero solo cuando el juego comenzó
    function initializeTimer() {
      if (!gameStarted) {
        timerInterval = setInterval(updateTimer, 1000);
        gameStarted = true;
      }
    }

    // Función para crear una carta en el juego
    function createPokemonBox(pokemonId) {
      const data = pokemonAPI[pokemonId];
      const box = document.createElement("div");
      box.className = "item";
      box.dataset.id = pokemonId;
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      img.alt = data.name;
      box.appendChild(img);

      // Maneja el click en la carta
      box.onclick = function () {
        initializeTimer();

        if (
          flippedCards.length < 2 &&
          !flippedCards.includes(this) &&
          !this.classList.contains("boxOpen")
        ) {
          // Da vuelta las cartas
          this.classList.add("boxOpen");
          flippedCards.push(this);

          if (flippedCards.length === 2) {
            // Compara las cartas
            const card1 = flippedCards[0].getAttribute("data-id");
            const card2 = flippedCards[1].getAttribute("data-id");

            if (card1 === card2) {
              // Si coinciden
              flippedCards = [];
              matchedPairs++;

              if (matchedPairs === shuffledPokemonIds.length / 2) {
                // Si se completan todos los pares, muestra un mensaje de victoria y detiene el temporizador
                setTimeout(() => {
                  alert("¡Has ganado!");
                  stopTimer();
                }, 500);
              }
            } else {
              // Si las cartas no coinciden, voltea las cartas de nuevo después de un segundo
              setTimeout(() => {
                flippedCards.forEach((card) =>
                  card.classList.remove("boxOpen")
                );
                flippedCards = [];
              }, 1000);
            }

            // Actualiza el contador de movimientos
            updateMoves();
          }
        }
      };

      document.querySelector(".game").appendChild(box);
    }

    // Función asíncrona para crear el juego
    async function createGame() {
      for (let i = 0; i < shuffledPokemonIds.length; i++) {
        createPokemonBox(shuffledPokemonIds[i]);
      }
    }

    // Inicia el juego
    createGame();
  })
  .catch((error) => {
    console.error("Error al obtener los datos de Pokémon: ", error);
  });
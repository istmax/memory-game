(function () {
  let firstCard = null;
  let secondCard = null;
  let clickable = true;
  const array = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const duplicatedArray = (array) =>
    array.reduce((res, current) => res.concat([current, current]), []);
  const finalArray = shuffle(duplicatedArray(array));
  const restartButton = document.createElement("button");
  const container = document.querySelector(".container");
  const gameField = document.querySelector(".field");

  restartButton.classList.add("button");
  restartButton.innerHTML = "Рестарт";
  container.append(restartButton);

  function shuffle(arr) {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  function createCard(arr) {
    for (let i = 0; i < arr.length; i++) {
      let card = document.createElement("div");
      card.innerHTML = "";
      card.classList.add("card");
      gameField.append(card);
      card.innerHTML = arr[i];
    }
  }

  createCard(finalArray);
  cardLogic();

  restartButton.addEventListener("click", () => {
    firstCard = null;
    secondCard = null;
    clickable = true;
    let restartArray = shuffle(finalArray);
    gameField.innerHTML = "";
    createCard(restartArray);
    cardLogic();
  });

  function cardLogic() {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card, index) =>
      card.addEventListener("click", () => {
        if (clickable === true && !card.classList.contains("card-success")) {
          card.classList.add("card-open");
          if (firstCard === null) {
            firstCard = index;
          } else {
            if (index != firstCard) {
              secondCard = index;
              clickable = false;
            }
          }
          if (
            firstCard != null &&
            secondCard != null &&
            firstCard != secondCard
          ) {
            if (cards[firstCard].innerHTML === cards[secondCard].innerHTML) {
              cards[firstCard].classList.add("card-success");
              cards[secondCard].classList.add("card-success");

              firstCard = null;
              secondCard = null;
              clickable = true;
            } else {
              setTimeout(() => {
                cards[firstCard].classList.remove("card-open");
                cards[secondCard].classList.remove("card-open");

                firstCard = null;
                secondCard = null;
                clickable = true;
              }, 500);
            }
          }
        }
      })
    );
  }
})();

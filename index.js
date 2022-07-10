let previousCardElem = undefined;
isPairing = false;
const cardHTMLCodesArr = [
  "&#127831;",
  "&#127829;",
  "&#127828;",
  "&#127836;",
  "&#127839;",
  "&#127844;",
  "&#127855;",
  "&#127851;",
];

const initGame = () => {
  const boardDiv = document.querySelector(".board");
  cardArr = getCardsArray();

  for (let i = 0; i < cardArr.length; i++) {
    let cardContainerDiv = document.createElement("div");
    let cardDivBack = document.createElement("div");
    let cardDivFront = document.createElement("div");

    cardContainerDiv.classList.add("card-container");
    cardDivBack.classList.add("card-face");
    cardDivBack.classList.add("card-back");
    cardDivFront.classList.add("card-face");
    cardDivFront.classList.add("card-front");
    cardDivBack.classList.add(`card-${cardArr[i]}`);
    cardDivFront.classList.add(`card-${cardArr[i]}`);
    cardContainerDiv.id = i;
    cardDivBack.id = cardArr[i];
    cardDivFront.innerHTML = cardHTMLCodesArr[cardArr[i]];

    cardDivBack.addEventListener("click", (e) => cardClick(e));

    cardContainerDiv.append(cardDivFront);
    cardContainerDiv.append(cardDivBack);
    boardDiv.append(cardContainerDiv);
  }
};

const getCardsArray = () => {
  const arr = "0123456701234567".split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

const findPair = (e) => {
  if (previousCardElem.id === e.target.id) {
    var pairs = document.querySelectorAll(`.card-${e.target.id}`);
    pairs.forEach((elem) => {
      elem.classList.add("solved");
    });
  } else {
    e.target.parentElement.classList.remove("flipped");
    previousCardElem.parentElement.classList.remove("flipped");
  }
};

const cardClick = (e) => {
  if (e.target.parentElement.classList.contains("flipped") || isPairing) {
    return;
  }
  e.target.parentElement.classList.add("flipped");
  if (previousCardElem !== undefined) {
    isPairing = true;
    setTimeout(() => {
      findPair(e);
      previousCardElem = undefined;
      isPairing = false;
    }, 1000);
  } else {
    previousCardElem = e.target;
  }
};

initGame();

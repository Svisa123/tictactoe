//si turno es 1, le toca al jugador, y si turno es dos, le toca al cpu
let ids = [
  "row-1-col-11",
  "row-1-col-12",
  "row-1-col-13",
  "row-2-col-21",
  "row-2-col-22",
  "row-2-col-23",
  "row-3-col-31",
  "row-3-col-32",
  "row-3-col-33",
];

let primerTurno = Math.floor(Math.random() * 2 + 1);
let turno = "X";
let skinJugador;
let skinJugador2;
const tbody = document.getElementById("tbody");
const h1 = document.getElementById("h1");
const btnContainer = document.getElementById("btn-container");
const btn = document.getElementById("btn");

if (primerTurno === 1) {
  h1.textContent = "turno del jugador 1";
  skinJugador = "X";
  skinJugador2 = "O";
} else {
  h1.textContent = "turno del jugador 2";
  skinJugador = "O";
  skinJugador2 = "X";
}

tbody.addEventListener("click", handleGame, true);

btn.addEventListener("click", () => {
  window.location.reload();
});
function handleGame(e) {
  if (turno === skinJugador) {
    playJugador(e, skinJugador, "blue", "turno del jugador 2");
  } else if (turno === skinJugador2) {
    playJugador(e, skinJugador2, "red", "turno del jugador 1");
  }
}

function playJugador(e, skinJugador, color, nextTurn) {
  if (e.target.nodeName === "TD" && e.target.textContent.length === 0) {
    e.target.textContent = skinJugador;
    e.target.style.color = color;
    turno = skinJugador === "X" ? "O" : "X";
    h1.textContent = nextTurn;
    winnerDetect(skinJugador);
  }
}

function winnerDetect(skinJugador) {
  let skinJugadorSpaces = [];
  let idsSpaces = [];

  ids.map((id) => {
    let idElement = document.getElementById(id);
    if (idElement.textContent === skinJugador) {
      skinJugadorSpaces.push(idElement);
    }
  });

  skinJugadorSpaces.map((space) => {
    idsSpaces.push(Number(space.id.slice(10)));
  });

  if (
    horizontalComprobation(idsSpaces) ||
    verticalComprobation(idsSpaces) ||
    diagonalComprobation(idsSpaces)
  ) {
    h1.textContent = `"${skinJugador}" ha ganado`;
    tbody.removeEventListener("click", handleGame, true);
    btnContainer.style.display = "flex";
  }
}

function horizontalComprobation(idsSpaces) {
  let conditions1 =
    idsSpaces.includes(11) && idsSpaces.includes(12) && idsSpaces.includes(13);
  let conditions2 =
    idsSpaces.includes(21) && idsSpaces.includes(22) && idsSpaces.includes(23);
  let conditions3 =
    idsSpaces.includes(31) && idsSpaces.includes(32) && idsSpaces.includes(33);
  if (conditions1 || conditions2 || conditions3) {
    return true;
  }
  return false;
}
function verticalComprobation(idsSpaces) {
  let conditions1 =
    idsSpaces.includes(11) && idsSpaces.includes(21) && idsSpaces.includes(31);
  let conditions2 =
    idsSpaces.includes(12) && idsSpaces.includes(22) && idsSpaces.includes(32);
  let conditions3 =
    idsSpaces.includes(13) && idsSpaces.includes(23) && idsSpaces.includes(33);
  if (conditions1 || conditions2 || conditions3) {
    return true;
  }
  return false;
}
function diagonalComprobation(idsSpaces) {
  let conditions1 =
    idsSpaces.includes(11) && idsSpaces.includes(22) && idsSpaces.includes(33);
  let conditions2 =
    idsSpaces.includes(13) && idsSpaces.includes(22) && idsSpaces.includes(31);
  if (conditions1 || conditions2) {
    return true;
  }
  return false;
}

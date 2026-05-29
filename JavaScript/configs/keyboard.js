export let keyboard = {
  LEFT: false,
  RIGHT: false,
  UP: false,
  SPACE: false,
  THROW: false,
};

//===== KEYBOARD EVENT LISTENERS =====

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") keyboard.LEFT = true;
  if (event.key === "ArrowRight") keyboard.RIGHT = true;
  if (event.key === "ArrowUp") keyboard.UP = true;
  if (event.key === " ") keyboard.SPACE = true;
  if (event.key === "d") keyboard.THROW = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") keyboard.LEFT = false;
  if (event.key === "ArrowRight") keyboard.RIGHT = false;
  if (event.key === "ArrowUp") keyboard.UP = false;
  if (event.key === " ") keyboard.SPACE = false;
  if (event.key === "d") keyboard.THROW = false;
});

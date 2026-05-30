//===== IMPORT MODULES =====

import {
  WORLD_WIDTH,
  WORLD_START,
  WORLD_END,
} from "./JavaScript/configs/constants.js";
import { keyboard } from "./JavaScript/configs/keyboard.js";
import { Character } from "./JavaScript/models/Character.class.js";
import { Chicken } from "./JavaScript/models/Chicken.class.js";

//==========================

//===== GAME SETUP =========

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//==========================

//===== GAME OBJECTS ========
const pepe = new Character();
pepe.keyboard = keyboard;
pepe.worldWidth = WORLD_WIDTH;

//========= Enemy Array erstellen =============
let enemies = [];
for (let i = 0; i < 15; i++) {
  enemies.push(new Chicken());
}
//==========================================

//==========================

//===== GAME LOOP ===========
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pepe.applyGravity();
  pepe.characterUpdate();
  pepe.draw(ctx);
  pepe.drawCollisionBox(ctx);

  enemies.forEach((enemy) => {
    enemy.updateChicken();
    enemy.draw(ctx);
    enemy.drawCollisionBox(ctx);
  });

  window.requestAnimationFrame(gameLoop);
}

gameLoop();
//==========================

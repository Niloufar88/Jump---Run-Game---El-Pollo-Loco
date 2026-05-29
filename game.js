//===== IMPORT MODULES =====
import { Character } from "./JavaScript/models/Character.class.js";
//==========================

//===== GAME SETUP =========

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//==========================

//===== GAME OBJECTS ========
const pepe = new Character();

//==========================

//===== GAME LOOP ===========
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pepe.draw(ctx);
  pepe.drawCollisionBox(ctx);

  window.requestAnimationFrame(gameLoop);
}

gameLoop();
//==========================

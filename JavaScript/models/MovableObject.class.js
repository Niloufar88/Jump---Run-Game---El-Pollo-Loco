import { GameObject } from "./GameObject.class.js";

export class MovableObject extends GameObject {
  constructor(x, y, width, height, img, speedX) {
    super(x, y, width, height, img);
    this.speedX = speedX;
    this.speedY = 0;
    this.isDead = false;
    this.health;
    this.img;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();
      img.onload = () => {};
      img.src = path;
    });
  }

  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  moveRight() {
    this.x += this.speedX;
  }

  die() {
    this.isDead = true;
    console.log("Game Over");
  }
}

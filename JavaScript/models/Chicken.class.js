import { Enemy } from "./Enemy.class.js";

export class Chicken extends Enemy {
  constructor(x, y, width, height, img, speedX) {
    super(x, y, width, height, img, speedX);

    let isSmall = Math.random() < 0.5;

    //Position
    this.x = Math.random() * 2000 + 200;
    this.y = isSmall ? 390 : 360;

    //Größe
    this.width = isSmall ? 50 : 80;
    this.height = isSmall ? 50 : 80;

    //Bewegungsgeschwindigkeit
    this.speedX = isSmall ? 0.8 : 0.3;

    //Image Cache
    this.imgCache = {};
    this.img = new Image();

    //Bilder
    this.CHICKEN_IMAGES = isSmall
      ? [
          "assets/img/enemies/chicken small walk/1_w.png",
          "assets/img/enemies/chicken small walk/2_w.png",
          "assets/img/enemies/chicken small walk/3_w.png",
        ]
      : [
          "assets/img/enemies/chicken normal walk/1_w.png",
          "assets/img/enemies/chicken normal walk/2_w.png",
          "assets/img/enemies/chicken normal walk/3_w.png",
        ];

    this.loadImage(this.CHICKEN_IMAGES[0]);
    this.loadImages(this.CHICKEN_IMAGES);

    //States
    this.health = 10;

    //Animation
    this.currentFrame = 0;
    this.animationSpeed = 100;
    this.lastFrameTime = 0;
  }

  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();

      img.onload = () => {};
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  updateChicken() {
    if (this.isDead) return;

    this.moveLeft();
    this.playAnimation(this.CHICKEN_IMAGES, this.animationSpeed);
  }

  playAnimation(images, speed) {
    let now = Date.now();
    let timeSinceLastFrame = now - this.lastFrameTime;

    if (timeSinceLastFrame > this.animationSpeed) {
      let index = this.currentFrame % images.length;
      this.img = this.imgCache[images[index]];
      this.currentFrame++;
      this.lastFrameTime = now;
    }
  }
}

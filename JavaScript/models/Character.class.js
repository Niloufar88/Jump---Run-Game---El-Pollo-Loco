import { MovableObject } from "./MovableObject.class.js";

export class Character extends MovableObject {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img);

    //Position
    this.x = 50;
    this.y = 150;

    //Größe
    this.width = 150;
    this.height = 300;

    //Bewegungsgeschwindigkeit
    this.speedX = 2;
    this.speedY = 0;

    //Gravitation
    this.gravity = 0.5;

    //Status
    this.isOnGround = true;
    this.isDead = false;
    this.isHurt = false;
    this.isJumping = false;

    //Animation
    this.currentFrame = 0;
    this.animationSpeed = 100;
    this.lastFrameTime = 0;

    //Health
    this.health = 100;

    //Keyboard
    this.keyboard = null;

    //Bilder Arrays
    this.idleImages = [
      "assets/img/pepe-character/idle/I-1.png",
      "assets/img/pepe-character/idle/I-2.png",
      "assets/img/pepe-character/idle/I-3.png",
      "assets/img/pepe-character/idle/I-4.png",
      "assets/img/pepe-character/idle/I-5.png",
      "assets/img/pepe-character/idle/I-6.png",
      "assets/img/pepe-character/idle/I-7.png",
      "assets/img/pepe-character/idle/I-8.png",
      "assets/img/pepe-character/idle/I-9.png",
      "assets/img/pepe-character/idle/I-10.png",
    ];
    this.walkImages = [
      "assets/img/pepe-character/walk/W-21.png",
      "assets/img/pepe-character/walk/W-22.png",
      "assets/img/pepe-character/walk/W-23.png",
      "assets/img/pepe-character/walk/W-24.png",
      "assets/img/pepe-character/walk/W-25.png",
      "assets/img/pepe-character/walk/W-26.png",
    ];
    this.jumpImages = [];
    this.hurtImages = [];
    this.deadImages = [];

    //Zeichnen
    this.loadImage("assets/img/pepe-character/idle/I-1.png");
  }

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  jump() {
    this.speedY = -15;
  }
}

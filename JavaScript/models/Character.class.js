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

    //KollisionBox
    this.collisionWidth = 100;
    this.collisionHeight = 170;
    this.collisionOffsetX = (this.width - this.collisionWidth) / 2;
    this.collisionOffsetY = 115;

    //Gravitation
    this.gravity = 0.5;
    this.groundY = this.y;

    //Status
    this.isDead = false;
    this.isHurt = false;
    this.isJumping = false;
    this.isInvincible = false;
    this.otherDirection = false;
    this.invincibilityDuration = 1500;

    //Animation
    this.currentImage = 0;
    this.animationSpeed = 100;
    this.lastFrameTime = 0;
    this.lastAnimationType = null;

    //Animation Geschwindigkeiten
    this.idleAnimationSpeed = 100;
    this.walkAnimationSpeed = 100;
    this.jumpAnimationSpeed = 110;
    this.hurtAnimationSpeed = 100;
    this.deadAnimationSpeed = 150;
    this.longIdleAnimationSpeed = 150;

    //Gesundheit
    this.health = 100;

    //Keyboard
    this.keyboard = null;

    //sammeln
    this.coinsCollected = 0;
    this.bottlesCollected = 0;

    //Bilder Cache
    this.imageCache = {};

    //Bilder Arrays
    this.PEPE_IDLE_IMAGES = [
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
    this.PEPE_WALK_IMAGES = [
      "assets/img/pepe-character/walk/W-21.png",
      "assets/img/pepe-character/walk/W-22.png",
      "assets/img/pepe-character/walk/W-23.png",
      "assets/img/pepe-character/walk/W-24.png",
      "assets/img/pepe-character/walk/W-25.png",
      "assets/img/pepe-character/walk/W-26.png",
    ];
    this.PEPE_JUMP_IMAGES = [
      "assets/img/pepe-character/jump/J-31.png",
      "assets/img/pepe-character/jump/J-32.png",
      "assets/img/pepe-character/jump/J-33.png",
      "assets/img/pepe-character/jump/J-34.png",
      "assets/img/pepe-character/jump/J-35.png",
      "assets/img/pepe-character/jump/J-36.png",
      "assets/img/pepe-character/jump/J-37.png",
      "assets/img/pepe-character/jump/J-38.png",
      "assets/img/pepe-character/jump/J-39.png",
    ];
    this.PEPE_HURT_IMAGES = [
      "assets/img/pepe-character/hurt/H-41.png",
      "assets/img/pepe-character/hurt/H-42.png",
    ];
    this.PEPE_DEAD_IMAGES = [
      "assets/img/pepe-character/dead/D-51.png",
      "assets/img/pepe-character/dead/D-52.png",
      "assets/img/pepe-character/dead/D-53.png",
      "assets/img/pepe-character/dead/D-54.png",
      "assets/img/pepe-character/dead/D-55.png",
      "assets/img/pepe-character/dead/D-56.png",
      "assets/img/pepe-character/dead/D-57.png",
    ];
    this.PEPE_LONGIDLE_IMAGES = [
      "assets/img/pepe-character/long_idle/I-11.png",
      "assets/img/pepe-character/long_idle/I-12.png",
      "assets/img/pepe-character/long_idle/I-13.png",
      "assets/img/pepe-character/long_idle/I-14.png",
      "assets/img/pepe-character/long_idle/I-15.png",
      "assets/img/pepe-character/long_idle/I-16.png",
      "assets/img/pepe-character/long_idle/I-17.png",
      "assets/img/pepe-character/long_idle/I-18.png",
      "assets/img/pepe-character/long_idle/I-19.png",
      "assets/img/pepe-character/long_idle/I-20.png",
    ];

    //Zeichnen
    this.loadImage(this.PEPE_IDLE_IMAGES[0]);

    //Alle Bilder vorladen
    this.loadImages(this.PEPE_IDLE_IMAGES);
    this.loadImages(this.PEPE_WALK_IMAGES);
    this.loadImages(this.PEPE_JUMP_IMAGES);
    this.loadImages(this.PEPE_HURT_IMAGES);
    this.loadImages(this.PEPE_DEAD_IMAGES);
    this.loadImages(this.PEPE_LONGIDLE_IMAGES);
  }

  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();
      img.onload = () => {};

      img.src = path;
      this.imageCache[path] = img;
    });
  }

  characterUpdate() {
    if (this.isDead) return;

    if (this.isOnGround() && (this.keyboard.UP || this.keyboard.SPACE)) {
      this.jump();
    }

    if (this.isJumping) {
      this.playAnimation(this.PEPE_JUMP_IMAGES, this.jumpAnimationSpeed, true);
      return; // Springanimation hat Vorrang, überspringe andere Animationen
    }
    if ((this.keyboard.SPACE || this.keyboard.UP) && this.isOnGround()) {
      this.playAnimation(this.PEPE_JUMP_IMAGES, this.jumpAnimationSpeed, true);
    } else if (this.keyboard.RIGHT) {
      this.moveRight();
      this.playAnimation(this.PEPE_WALK_IMAGES, this.walkAnimationSpeed);
      this.otherDirection = false;
    } else if (this.keyboard.LEFT) {
      this.moveLeft();
      this.playAnimation(this.PEPE_WALK_IMAGES, this.walkAnimationSpeed);
      this.otherDirection = true;
    } else {
      this.playAnimation(this.PEPE_IDLE_IMAGES, this.idleAnimationSpeed);
    }
  }

  isOnGround() {
    return this.y >= this.groundY;
  }

  isAboveGround() {
    return this.y < this.groundY;
  }

  applyGravity() {
    if (this.isAboveGround() || this.speedY < 0) {
      this.y += this.speedY;
      this.speedY += this.gravity;
    } else if (this.y >= this.groundY) {
      this.speedY = 0;
      this.y = this.groundY;
      this.isJumping = false;
    }
  }

  moveRight() {
    this.x += this.speedX;
    if (this.x > this.worldWidth - this.width) {
      this.x = this.worldWidth - this.width;
    }
  }

  moveLeft() {
    this.x -= this.speedX;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  draw(ctx) {
    if (this.otherDirection) {
      ctx.save();
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  hit() {
    if (!this.isInvincible) {
      this.health -= 10;
      this.isHurt = true;
      this.isInvincible = true;
    }
  }

  jump() {
    this.speedY = -15; // negativ nach oben, positiv nach unten
    this.isJumping = true;
  }

  playAnimation(images, speed, oneTime = false) {
    // Reset animation wenn zu neuer Animation gewechselt wird
    if (this.lastAnimationType !== images) {
      this.currentImage = 0;
      this.lastAnimationType = images;
    }

    let currentTime = Date.now();
    let timeSinceLastFrame = currentTime - this.lastFrameTime;

    if (timeSinceLastFrame >= speed) {
      let index;

      // Für Jump: Stoppe bei letztem Bild
      if (oneTime && this.currentImage >= images.length - 1) {
        index = images.length - 1; // Bleib beim letzten Bild
      } else {
        index = this.currentImage % images.length;
        this.currentImage++;
      }
      this.img = this.imageCache[images[index]];
      this.lastFrameTime = currentTime;
    }
  }
}

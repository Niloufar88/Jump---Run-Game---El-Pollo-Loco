import { MovableObject } from "./MovableObject.class.js";

export class Enemy extends MovableObject {
  constructor(x, y, width, height, img, speedX) {
    super(x, y, width, height, img, speedX);
  }
}

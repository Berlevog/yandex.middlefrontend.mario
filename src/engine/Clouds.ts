import { ResourceImage } from "../pages/Game/Resources";
import { DisplayObject, Engine, Sprite } from "./Engine";

class Cloud extends Sprite {
  public deleted: boolean = false;
  private sprite: ResourceImage;
  private interval: NodeJS.Timer;

  constructor(size: number, speed: number = 1) {
    super();
    this.sprite = new ResourceImage("images/cloud.png");
    this.size = { width: 24, height: 24 };
    this.position = { x: 800, y: Math.floor(Math.random() * 80 + 5) };
    this.interval = setInterval(() => {
      this.positionX = Math.floor(this.positionX - speed);
    }, 100);
  }

  render(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;
    context.save();
    // context.scale(-1, 1);
    context.drawImage(this.sprite.img, this.positionX, this.positionY, this.size.width, this.size.height);
    context.restore();
  }
}

export default class Clouds extends DisplayObject {
  private clouds: Cloud[];
  private interval: NodeJS.Timer;

  constructor() {
    super();
    this.clouds = [new Cloud(3)];
    this.interval = setInterval(() => {
      this.clouds = this.clouds.filter((cloud) => !cloud.deleted);
      this.clouds.push(new Cloud(Math.floor(Math.random() * 3 + 1), Math.floor(Math.random() * 5 + 1)));
    }, 10000);
  }

  getClouds(): Cloud[] {
    return this.clouds;
  }

  render(renderer: Engine.IRenderer) {
    this.clouds.forEach((cloud) => {
      if (cloud.positionY < 0) {
        cloud.deleted = true;
      }
      cloud.render(renderer);
    });
  }
}

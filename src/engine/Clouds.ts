import { ResourceImage } from "../pages/Game/Resources";
import { DisplayObject, Engine, Point } from "./Engine";

type CloudProps = {
  size: number;
  speed?: number;
};

class Cloud extends DisplayObject {
  public deleted: boolean = false;
  private interval: NodeJS.Timer;

  constructor(props: CloudProps) {
    super({ ...props, texture: new ResourceImage("images/cloud.png") });
    this.size = { width: 24, height: 24 };
    this.position = new Point({ x: 800, y: Math.floor(Math.random() * 80 + 5) });
    this.interval = setInterval(() => {
      this.x = Math.floor(this.x - props.speed!);
    }, 100);
  }

  render(renderer: Engine.IRenderer) {
    const { context } = renderer;
    context.save();
    // context.scale(-1, 1);
    // context.drawImage(this.texture.img, this.x, this.y, this.width, this.height);
    context.restore();
  }
}

export default class Clouds extends DisplayObject {
  private clouds: Cloud[];
  private readonly interval: NodeJS.Timer;

  constructor(props?: Engine.DisplayObjectProps) {
    super({ ...props });
    this.clouds = [new Cloud({ size: 3 })];
    this.interval = setInterval(() => {
      this.clouds = this.clouds.filter((cloud) => !cloud.deleted);
      this.clouds.push(
        new Cloud({
          size: Math.floor(Math.random() * 3 + 1),
          speed: Math.floor(Math.random() * 5 + 1),
        })
      );
    }, 10000);
  }

  getClouds(): Cloud[] {
    return this.clouds;
  }

  render(renderer: Engine.IRenderer) {
    this.clouds.forEach((cloud) => {
      if (cloud.y < 0) {
        cloud.deleted = true;
      }
      cloud.render(renderer);
    });
  }

  destroy() {
    clearInterval(this.interval);
  }
}

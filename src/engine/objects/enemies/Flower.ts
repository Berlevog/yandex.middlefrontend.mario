import { ResourceImage } from "../../../pages/Game/Resources";
import { Engine, getCollision } from "../../Engine";
import { MapObject } from "../../MapObject";
import { PhysicalObject } from "../../PhysicalObject";
import { Vector } from "../../Point";

type BrickProps = {
  x: number;
  y: number;
};

export default class Flower extends PhysicalObject {
  public type = Engine.ObjectType.ENEMY;

  render(renderer: Engine.IRenderer) {
    const { context } = renderer;
    context.save();
    if (this.textureParams) {
      context.drawImage(this.texture.img, ...this.textureParams, this.x, this.y, this.width, this.height);
    }
    context.restore();
  }

  destroy() {
    clearInterval(this.tick);
    clearInterval(this.step);
    this.off("collision", this.handleCollision);
  }

  private step: NodeJS.Timer;
  private runningTextures: Generator<number[], void, unknown>;
  private textureParams: [number, number, number, number] | undefined;
  private tick: NodeJS.Timer;
  private textureSize = 32;

  constructor(props: BrickProps) {
    super({ ...props, texture: new ResourceImage("images/flower.png") });
    this.height = 32;
    this.width = 32;
    this.x = props.x;
    this.y = props.y;
    this.runningTextures = this.getRunningTexture();
    this.getTexture();
    this.dragCoefficient = 0;
    this.on("collision", this.handleCollision);

    this.tick = setInterval(() => {
      this.addForce(new Vector({ x: 0, y: 0.2 }));
    }, this.timeStep * 1000);

    this.step = setInterval(() => {
      this.getTexture();
    }, 350);
  }
  handleCollision = (o: MapObject) => {
    const hit = getCollision(this, o);
    if (hit.leftMiddle || hit.topMiddle) {
      console.log("collision with flower");
      this.velocity.y *= -1;
    }
  };

  *getRunningTexture() {
    while (true) {
      yield [0, 0, this.textureSize, this.textureSize];
      yield [this.textureSize * 1, 0, this.textureSize, this.textureSize];
      yield [this.textureSize * 2, 0, this.textureSize, this.textureSize];
      yield [this.textureSize * 3, 0, this.textureSize, this.textureSize];
    }
  }

  getTexture() {
    if (this.velocity.y > 0 || !this.textureParams) {
      this.textureParams = this.runningTextures.next().value as [number, number, number, number];
    }
  }
}

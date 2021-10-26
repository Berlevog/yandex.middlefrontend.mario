import { object } from "yup/lib/locale";
import { ResourceImage } from "../../../pages/Game/Resources";
import { Engine, getCollision } from "../../Engine";
import { MapObject } from "../../MapObject";
import { PhysicalObject } from "../../PhysicalObject";
import { Vector } from "../../Point";

type BrickProps = {
  x: number;
  y: number;
};

type FlytrapProps = {
  onCollision: () => void;
};

const TEXTURE_SCALE = 2;

export default class Flytrap extends PhysicalObject {
  public type = Engine.ObjectType.ENEMY;
  public onCollision;

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
  private textureHeight = 48;
  private textureWidth = 32;

  constructor(props: BrickProps & FlytrapProps) {
    super({ ...props, texture: new ResourceImage("images/flytrap.png") });
    this.height = this.textureHeight / TEXTURE_SCALE;
    this.width = this.textureWidth / TEXTURE_SCALE;
    this.x = props.x;
    this.y = props.y;
    this.runningTextures = this.getRunningTexture();
    this.getTexture();
    this.dragCoefficient = 0;
    this.onCollision = props.onCollision;
    this.on("collision", this.handleCollision);

    this.tick = setInterval(() => {
      if (this.height <= this.textureHeight / TEXTURE_SCALE) {
        this.height = this.height + 1;
      } else {
        this.height = 0;
      }
    }, this.timeStep * 5000);

    this.step = setInterval(() => {
      this.getTexture();
    }, 250);
  }
  handleCollision = (o: MapObject) => {
    const hit = getCollision(this, o);
    if (hit.leftMiddle || hit.rightMiddle || hit.topMiddle) {
      this.onCollision();
    }
  };

  *getRunningTexture() {
    while (true) {
      yield [0, 0, this.textureWidth, this.textureHeight];
      yield [this.textureWidth, 0, this.textureWidth, this.textureHeight];
    }
  }

  getTexture() {
    if (this.velocity.y > 0 || !this.textureParams) {
      this.textureParams = this.runningTextures.next().value as [number, number, number, number];
    }
  }
}

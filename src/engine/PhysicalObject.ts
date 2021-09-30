import { AIR_DENSITY, Engine, FREE_FALL_VELOCITY } from "./Engine";
import { MapObject } from "./MapObject";
import { Rect } from "./Rect";

export class PhysicalObject extends MapObject implements Engine.IPhysicalObject {
  public mass: number = 0;
  public type: Engine.PhysicalObjectType = "solid";
  protected timeStep = 0.02;
  protected velocityY: number;
  protected bounciness: number;
  protected ay: number;
  protected dragCoefficient: number;
  protected a: number;
  private params: any;
  private interval: NodeJS.Timeout;

  constructor(props: Engine.PhysicalObjectProps) {
    super(props);
    this.width = 24;
    this.height = 24;
    this.mass = 0.2;
    this.velocityY = 0;
    this.bounciness = -0.5;
    this.ay = 0;
    this.dragCoefficient = 0.47;
    this.a = (Math.PI * Math.pow(this.width, 2)) / 10000;

    this.rect = new Rect({ x: 50, y: 50, width: this.width, height: this.height });

    //todo clear
    this.interval = setInterval(this.physics, this.timeStep * 1000);
    this.on("collision", this.handleCollision);
  }

  handleCollision = (object: MapObject) => {
    if (this.y + this.height > object.y && this.velocityY > 0) {
      this.velocityY *= this.bounciness;
      this.y = object.y - this.height;
    }
  };

  /* Weight force, which only affects the y-direction (because that's the direction gravity points). */
  getWeightForce = () => {
    return this.mass * FREE_FALL_VELOCITY;
  };

  /* Air resistance force; this would affect both x- and y-directions, but we're only looking at the y-axis in this example. */
  getAirResistance = () => {
    return -(0.5 * AIR_DENSITY * this.dragCoefficient * this.a * Math.pow(this.velocityY, 2));
  };

  physics = () => {
    let fy = this.getWeightForce() + this.getAirResistance();

    /* Varlet integration for the y-direction */
    let dy = this.velocityY * this.timeStep + (this.ay / 2) * Math.pow(this.timeStep, 2);

    /* The following line is because the math assumes meters but we're assuming 1 cm per pixel, so we need to scale the results */
    this.y = Math.round(this.y + dy * 100);

    let new_ay = fy / this.mass;
    let avg_ay = (new_ay + this.ay) / 2;
    this.velocityY += avg_ay * this.timeStep;
  };

  render(renderer: Engine.IRenderer) {
    const { context } = renderer;

    context.save();
    context.drawImage(this.texture.img, this.x, this.y, this.width, this.height);
    context.restore();
  }

  destroy() {
    this.removeAllListeners("collision");
    clearInterval(this.interval);
  }
}

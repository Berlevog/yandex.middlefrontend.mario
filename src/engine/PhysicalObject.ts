import { Engine, getCollision } from "./Engine";
import { MapObject } from "./MapObject";
import { Vector } from "./Point";
import { Rect } from "./Rect";

export const FREE_FALL_VELOCITY = 9.81;
export const AIR_DENSITY = 1.2;

export class PhysicalObject extends MapObject implements Engine.IPhysicalObject {
  public mass: number = 0;
  public type = Engine.ObjectType.SOLID;
  public velocity: Vector = new Vector();
  public a: Vector = new Vector({ x: 0, y: 0 });
  protected timeStep = 0.02;
  protected velocityY: number;
  protected bounciness: number;
  protected ay: number;
  protected dragCoefficient: number;
  protected A: number;
  protected velocityX: number;
  private interval: NodeJS.Timeout;

  constructor(props: Engine.PhysicalObjectProps) {
    super(props);
    this.width = 24;
    this.height = 24;
    this.mass = 70;
    this.velocityY = 0;
    this.velocityX = 0;
    this.bounciness = 0.4;
    this.ay = -2;
    this.dragCoefficient = 0.47;
    this.A = (Math.PI * Math.pow(this.width, 2)) / 10000;

    this.rect = new Rect({ x: 50, y: 50, width: this.width, height: this.height });

    this.interval = setInterval(this.physics, this.timeStep * 1000);
    this.on("collision", this.handleCollision);
  }

  //player
  private handleCollision = (object: MapObject) => {
    if (object.type === Engine.ObjectType.SOLID) {
      const hit = getCollision(this, object);
      if (hit.leftMiddle && this.velocity.x < 0) {
        console.log("left");
        this.velocity.x = 0;
        this.x = object.x + object.width;
      }
      if (hit.rightMiddle && this.velocity.x > 0) {
        console.log("right");
        this.velocity.x = 0;
        this.x = object.x - this.width;
      }

      if (hit.bottomMiddle) {
        this.velocity.y *= this.bounciness;
        this.velocity.x = 0.2;

        this.y = object.y - this.height;
      } else if (hit.topMiddle) {
        this.velocity.y *= -this.bounciness;
        this.y = object.y + object.height;
      }

      // if (this.y >= object.y + object.height && this.velocity.y > 0) {
      //   this.velocity.y *= -this.bounciness;
      //   this.velocity.x = 0;
      //   this.y = object.y + object.height;
      // }
    }
  };

  /* Weight force, which only affects the y-direction (because that's the direction gravity points). */
  getWeightForce = () => {
    return this.mass * FREE_FALL_VELOCITY;
  };

  /* Air resistance force; this would affect both x- and y-directions, but we're only looking at the y-axis in this example. */
  getAirResistance = () => {
    return new Vector({
      x: -(0.5 * AIR_DENSITY * this.dragCoefficient * this.A * Math.pow(this.velocity.x, 2)),
      y: -(0.5 * AIR_DENSITY * this.dragCoefficient * this.A * Math.pow(this.velocity.y, 2)),
    });
  };

  getUserDefinedForceResistance() {
    return 0;
  }

  physics = () => {
    let f = this.getAirResistance();
    f.x += this.getUserDefinedForceResistance();
    f.y += this.getWeightForce();

    /* Varlet integration for the y-direction */
    let delta = new Vector({
      x: this.velocity.x * this.timeStep + (this.a.x / 2) * Math.pow(this.timeStep, 2),
      y: this.velocity.y * this.timeStep + (this.a.y / 2) * Math.pow(this.timeStep, 2),
    });

    /* The following line is because the math assumes meters but we're assuming 1 cm per pixel, so we need to scale the results */
    this.y = Math.round(this.y + delta.y * 100);
    this.x = Math.round(this.x + delta.x * 100);

    this.velocity.addScaled(
      {
        x: (f.x / this.mass + this.a.x) / 2,
        y: (f.y / this.mass + this.a.y) / 2,
      },
      this.timeStep
    );

    // this.velocity.x = this.velocity.x / 2;
    // let ke = 0.5 * this.mass * Math.pow(this.velocity.x, 2);
    // let pl = this.A * Math.pow(this.velocity.x, 2) * this.timeStep;
    // ke -= pl;
    //
    // this.velocity.x = Math.sqrt((2 * ke) / this.mass);
  };

  addForce(vector: Vector) {
    if (this.velocity.x < 4) {
      this.velocity.x += vector.x;
    }
    // if (this.velocity.y > 0) {
    this.velocity.y = this.velocity.y + vector.y;
    // }
  }

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

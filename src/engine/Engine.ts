export namespace Engine {
  export interface IPointData {
    x: number;
    y: number;
  }

  export interface IPoint extends IPointData {
    add: (point: IPoint) => Point;
    subtract: (point: IPoint) => Point;
    length: () => number;
    multiply: (k: number) => Point;
    divide: (k: number) => Point;
    addScaled: (point: IPoint, k: number) => Point;
  }

  export interface ISizeData {
    width: number;
    height: number;
  }

  export interface ISize extends ISizeData {}

  export interface IRectData extends IPointData, ISizeData {}

  export interface IRect extends IRectData {}

  export interface IRenderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
  }

  export type HitSide = "top" | "bottom" | "left" | "right" | undefined;

  export interface IHit {
    side: string; //todo HitSide
    top: boolean;
    bottom: boolean;
    right: boolean;
    left: boolean;
  }

  export type PhysicalObjectType = "solid" | "resource" | "enemy";
  export type DisplayObjectProps = {};
  export type SpriteProps = { texture: ResourceImage } & DisplayObjectProps;
  export type PhysicalObjectProps = {} & SpriteProps;

  export interface IPhysicalObject {
    mass: number;
    type: PhysicalObjectType;
  }
}

import EventEmitter from "eventemitter3";
import { ResourceImage } from "../pages/Game/Resources";

const FREE_FALL_VELOCITY = 9.81;
const AIR_DENSITY = 1.2;

export function linearEquation(pointA: Engine.IPoint, pointB: Engine.IPoint, x: number) {
  const k = (pointA.y - pointB.y) / (pointA.x - pointB.x);
  const b = pointB.y - k * pointB.x;
  return k * x + b;
}

export function distanceTo(point: Engine.IPoint, to: Engine.IPoint) {
  return Math.sqrt(Math.pow(to.x - point.x, 2) + Math.pow(to.y - point.y, 2));
}

export function isAABBCollision(rect1: Engine.IRect, rect2: Engine.IRect): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export function getAABBCollision(rect1: Engine.IRect, rect2: Engine.IRect): Engine.IHit | null {
  if (isAABBCollision(rect1, rect2)) {
    const right = rect2.x + rect2.width;
    const left = rect2.x;
    const bottom = rect2.y + rect2.height;
    const top = rect2.y;
    let result: Engine.IHit = {
      side: "",
      bottom: false,
      top: false,
      left: false,
      right: false,
    };

    if (rect1.y < bottom && rect1.y > top) {
      result = { ...result, bottom: true, side: result.side + "bottom" };
    }
    if (rect1.x + rect1.width > left && rect1.x + rect1.width < right) {
      result = { ...result, right: true, side: result.side + "right" };
    }
    if (rect1.x < right && rect1.x > left) {
      result = { ...result, left: true, side: result.side + "left" };
    }
    if (rect1.y + rect1.height > top && rect1.y + rect1.height < bottom) {
      result = { ...result, top: true, side: result.side + "top" };
    }

    return result;
  }
  return null;
}

export class Point implements Engine.IPoint {
  public x: number = 0;
  public y: number = 0;

  constructor({ x, y }: Engine.IPointData) {
    this.x = x;
    this.y = y;
  }

  add(point: Engine.IPoint): Point {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  subtract(point: Engine.IPoint): Point {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  length(): number {
    return 0;
  }

  multiply(k: number): Point {
    this.x /= k;
    this.y /= k;
    return this;
  }

  divide(k: number): Point {
    this.x /= k;
    this.y /= k;
    return this;
  }

  addScaled(point: Engine.IPoint, k: number) {
    this.x += k * point.x;
    this.y += k * point.y;
    return this;
  }
}

export class Rect implements Engine.IRect {
  public width: number;
  public height: number;
  public x: number;
  public y: number;

  constructor(props: Engine.IRect) {
    this.width = props.width;
    this.height = props.height;
    this.x = props.x;
    this.y = props.y;
  }
}

export class DisplayObject extends EventEmitter {
  public pivot: Engine.IPoint = new Point({ x: 0, y: 0 });
  public props: Engine.DisplayObjectProps;

  constructor(props: Engine.DisplayObjectProps = {}) {
    super();
    this.props = props;
  }

  protected _rect: Engine.IRect = { x: 0, y: 0, width: 0, height: 0 };

  get rect(): Engine.IRect {
    return this._rect;
  }

  set rect(rect: Engine.IRect) {
    this._rect = rect;
    this.position.x = this._rect.x;
    this.position.y = this._rect.y;
  }

  // public scale: number;
  // public rotation: number;

  private _position: Engine.IPoint = new Point({ x: 0, y: 0 });

  get position(): Engine.IPoint {
    return this._position;
  }

  set position(position: Engine.IPoint) {
    this._position = position;
    this.rect.x = this._position.x;
    this.rect.y = this._position.y;
  }

  private _size: Engine.ISize = { width: 0, height: 0 };

  get size(): Engine.ISize {
    return this._size;
  }

  set size(size: Engine.ISize) {
    this._size = size;
    this.rect.width = size.width;
    this.rect.height = size.height;
  }

  get x() {
    return this._position.x;
  }

  set x(x: number) {
    this._position = { ...this._position, x };
    this.rect.x = this._position.x;
    this.rect.y = this._position.y;
  }

  get y() {
    return this._position.y;
  }

  set y(y: number) {
    this._position = { ...this._position, y };
    this.rect.x = this._position.x;
    this.rect.y = this._position.y;
  }

  get width() {
    return this.rect.width;
  }

  set width(w: number) {
    this.rect.width = w;
  }

  get height() {
    return this.rect.height;
  }

  set height(h: number) {
    this.rect.height = h;
  }

  // AABB Algorithm
  testHit(rect: Engine.IRect): boolean {
    return isAABBCollision(this.rect, rect);
  }

  distanceTo(point: Engine.IPoint) {
    return distanceTo(point, this.position);
  }

  getHit(rect: Engine.IRect): Engine.IHit | null {
    return getAABBCollision(this.rect, rect);
  }

  render(renderer: Engine.IRenderer) {}

  destroy() {}
}

export class Sprite extends DisplayObject {
  public texture: ResourceImage;

  constructor(props: Engine.SpriteProps) {
    super(props);
    this.texture = props.texture;
  }

  setTexture(texture: ResourceImage) {
    this.texture = texture;
  }
}

export class MapObject extends Sprite {
  collide(object: MapObject) {
    this.emit("collision", object);
  }
}

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

// type BrickProps = {} & SpriteProps;

// export class Brick extends Sprite {
//   constructor(props: BrickProps) {
//     super({ ...props, texture: new ResourceImage('images/cloud.png"') });
//   }
// }

export namespace Engine {
  export interface IPointData {
    x: number;
    y: number;
  }

  export interface IPoint extends IPointData {}

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
    side: string;
    top: boolean;
    bottom: boolean;
    right: boolean;
    left: boolean;
  }
}

import EventEmitter from "eventemitter3";

export function linearEquation(pointA: Engine.IPoint, pointB: Engine.IPoint, x: number) {
  const k = (pointA.y - pointB.y) / (pointA.x - pointB.x);
  const b = pointB.y - k * pointB.x;
  return k * x + b;
}

export function distanceTo(point: Engine.IPoint, to: Engine.IPoint) {
  return Math.sqrt(Math.pow(to.x - point.x, 2) + Math.pow(to.y - point.y, 2));
}

export function isAABBColision(rect1: Engine.IRect, rect2: Engine.IRect): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export function getAABBColision(rect1: Engine.IRect, rect2: Engine.IRect): Engine.IHit | null {
  if (isAABBColision(rect1, rect2)) {
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

export class Rect implements Engine.IRect {
  public width: number;
  public height: number;
  public x: number;
  public y: number;

  constructor(x: Engine.IRect | number, y: number, w: number, h: number) {
    if (typeof x === "number") {
      this.width = w;
      this.height = h;
      this.x = x;
      this.y = y;
    } else {
      this.width = x.width;
      this.height = x.height;
      this.x = x.x;
      this.y = x.y;
    }
  }
}

export class DisplayObject extends EventEmitter {
  public rect: Engine.IRect = { x: 0, y: 0, width: 0, height: 0 };
  public pivot: Engine.IPoint = { x: 0, y: 0 };
  private _position: Engine.IPoint = { x: 0, y: 0 };

  get position(): Engine.IPoint {
    return this._position;
  }

  // public scale: number;
  // public rotation: number;

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

  get positionX() {
    return this._position.x;
  }

  set positionX(x: number) {
    this._position = { ...this._position, x };
    this.rect.x = this._position.x;
    this.rect.y = this._position.y;
  }

  get positionY() {
    return this._position.y;
  }

  set positionY(y: number) {
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
    return isAABBColision(this.rect, rect);
  }

  distanceTo(point: Engine.IPoint) {
    return distanceTo(point, this.position);
  }

  getHit(rect: Engine.IRect): Engine.IHit | null {
    return getAABBColision(this.rect, rect);
  }

  render(renderer: Engine.IRenderer) {}

  destroy() {}
}

export class Sprite extends DisplayObject {}

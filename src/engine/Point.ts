import { Engine } from "./Engine";

export class Point implements Engine.IPoint {
  public x: number = 0;
  public y: number = 0;

  constructor({ x, y }: Engine.IPointData = { x: 0, y: 0 }) {
    this.x = x;
    this.y = y;
  }

  add(point: Engine.IPointData): Point {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  subtract(point: Engine.IPointData): Point {
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

  addScaled(point: Engine.IPointData, k: number) {
    this.x += k * point.x;
    this.y += k * point.y;
    return this;
  }
}

export class Vector extends Point {}

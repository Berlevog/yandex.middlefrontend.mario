import { Engine } from "./Engine";

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

import EventEmitter from "eventemitter3";
import { distanceTo, Engine, getAABBCollision, getAngle, isAABBCollision } from "./Engine";
import { Point } from "./Point";

export class DisplayObject extends EventEmitter {
  public pivot: Engine.IPoint = new Point({ x: 0, y: 0 });
  public props: Engine.DisplayObjectProps;
  protected lastPosition: Engine.IPoint = new Point({ x: 0, y: 0 });

  constructor(props: Engine.DisplayObjectProps = {}) {
    super();
    this.props = props;
  }

  private _position = new Point({ x: 0, y: 0 });

  get position(): Point {
    return this._position;
  }

  set position(position: Engine.IPoint) {
    const { x, y } = new Point({ x: this.x - position.x, y: this.y - position.y });
    if (Math.abs(x + y) > 2) {
      this.lastPosition = this._position.clone();
    }
    this._position.x = position.x;
    this._position.y = position.y;
    this.rect.x = this._position.x;
    this.rect.y = this._position.y;
  }

  protected _rect: Engine.IRect = { x: 0, y: 0, width: 0, height: 0 };

  // public scale: number;
  // public rotation: number;

  get rect(): Engine.IRect {
    return this._rect;
  }

  set rect(rect: Engine.IRect) {
    this._rect = rect;
    this.position.x = this._rect.x;
    this.position.y = this._rect.y;
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
    this.position = new Point({ ...this._position, x });
    this.rect.x = this.position.x;
    this.rect.y = this.position.y;
  }

  get y() {
    return this._position.y;
  }

  set y(y: number) {
    this.position = new Point({ ...this._position, y });
    this.rect.x = this.position.x;
    this.rect.y = this.position.y;
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

  angle() {
    return getAngle(this.lastPosition, this.position);
  }

  direction(): Engine.HitSide {
    const angle = this.angle();
    const dx = this.lastPosition.x - this.position.x;
    if (dx > 0) {
      if (angle > 45) {
        return "top";
      } else if (angle >= -45) {
        return "left";
      } else {
        return "bottom";
      }
    } else {
      if (angle > 45) {
        return "top";
      } else if (angle >= -45) {
        return "right";
      } else {
        return "bottom";
      }
    }
  }

  getHit(rect: Engine.IRect): Engine.IHit | null {
    return getAABBCollision(this.rect, rect);
  }

  render(renderer: Engine.IRenderer) {}

  destroy() {}
}

import EventEmitter from "eventemitter3";
import { distanceTo, Engine, getAABBCollision, isAABBCollision } from "./Engine";
import { Point } from "./Point";

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

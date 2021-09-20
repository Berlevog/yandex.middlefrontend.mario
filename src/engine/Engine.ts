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
}

import EventEmitter from "eventemitter3";

export class DisplayObject extends EventEmitter {
  public position: Engine.IPoint = { x: 0, y: 0 };
  // public scale: number;
  // public rotation: number;

  render(renderer: Engine.IRenderer) {}
}

export class Sprite extends DisplayObject {
  constructor() {
    super();
  }
}

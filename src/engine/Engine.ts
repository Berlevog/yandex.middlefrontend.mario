export namespace Engine {
  export interface IPointData {
    x: number;
    y: number;
  }

  export interface IPoint extends IPointData {
    add: (point: IPoint) => IPoint;
    subtract: (point: IPoint) => IPoint;
    length: () => number;
    multiply: (k: number) => IPoint;
    divide: (k: number) => IPoint;
    addScaled: (point: IPoint, k: number) => IPoint;
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

import { ResourceImage } from "../pages/Game/Resources";

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

// type BrickProps = {} & SpriteProps;

// export class Brick extends Sprite {
//   constructor(props: BrickProps) {
//     super({ ...props, texture: new ResourceImage('images/cloud.png"') });
//   }
// }

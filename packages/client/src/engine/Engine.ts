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

	export interface ISize extends ISizeData {
	}

	export interface IRectData extends IPointData, ISizeData {
	}

	export interface IRect extends IRectData {
	}

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

	export enum ObjectType {
		SOLID = "Type/SOLID",
		ENEMY = "Type/ENEMY",
		COIN = "Type/COIN",
		SECRET = "Type/SECRET",
		BRICK = "Type/BRICK",
		BOSS = "Type/BOSS",
	}

	export type DisplayObjectProps = {};
	export type SpriteProps = { texture: ResourceImage } & DisplayObjectProps;
	export type PhysicalObjectProps = {} & SpriteProps;

	export interface IPhysicalObject {
		mass: number;
		type: ObjectType;
	}
}

import { ResourceImage } from "../pages/Game/Resources";
import { Point } from "./Point";

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

export function getAngle(p1: Engine.IPoint, p2: Engine.IPoint) {
	const ac = (p1.y - p2.y) / (p1.x - p2.x);
	return (Math.atan(ac) * 180) / Math.PI;
}

export function getEdges(rect: Engine.IRect) {
	return {
		topLeft: new Point({ x: rect.x, y: rect.y }),
		topMiddle: new Point({ x: Math.floor(rect.x + rect.width / 2), y: rect.y }),
		topRight: new Point({ x: Math.floor(rect.x + rect.width), y: rect.y }),
		leftMiddle: new Point({ x: rect.x, y: Math.floor(rect.y + rect.height / 2) }),
		rightMiddle: new Point({ x: rect.x + rect.width, y: Math.floor(rect.y + rect.height / 2) }),
		bottomLeft: new Point({ x: rect.x, y: rect.y + rect.height }),
		bottomMiddle: new Point({ x: Math.floor(rect.x + rect.width / 2), y: rect.y + rect.height }),
		bottomRight: new Point({ x: Math.floor(rect.x + rect.width), y: rect.y + rect.height })
	};
}

export function isPointInside(point: Engine.IPoint, rect: Engine.IRect) {
	return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
}

export function getCollision(rect1: Engine.IRect, rect2: Engine.IRect) {
	const rect1Edges = getEdges(rect1);
	let colision: any = {
		topLeft: isPointInside(rect1Edges.topLeft, rect2),
		topMiddle: isPointInside(rect1Edges.topMiddle, rect2),
		topRight: isPointInside(rect1Edges.topRight, rect2),
		leftMiddle: isPointInside(rect1Edges.leftMiddle, rect2),
		rightMiddle: isPointInside(rect1Edges.rightMiddle, rect2),
		bottomLeft: isPointInside(rect1Edges.bottomLeft, rect2),
		bottomMiddle: isPointInside(rect1Edges.bottomMiddle, rect2),
		bottomRight: isPointInside(rect1Edges.bottomRight, rect2)
	};

	colision = {
		...colision,
		right: colision.topRight || colision.rightMiddle || colision.bottomRight,
		left: colision.topLeft || colision.leftMiddle || colision.bottomLeft,
		bottom: colision.bottomRight || colision.bottomMiddle || colision.bottomLeft,
		top: colision.topLeft || colision.topMiddle || colision.topRight
	};
	return {
		...colision,
		isCollision: colision.left || colision.right || colision.top || colision.bottom
	};
}

export function getCollisions(rect1: Engine.IRect, rect2: Engine.IRect) {
	return {
		rect1: getCollision(rect1, rect2),
		rect2: getCollision(rect2, rect1)
	};
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
			right: false
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

import { Engine } from "./Engine";
import { Sprite } from "./Sprite";

export class MapObject extends Sprite {
	public type = Engine.ObjectType.SOLID;

	constructor(props: any) {
		super(props);
		this.on("collision", this.handleCollision.bind(this));
	}

	collide(object: MapObject, hit: any) {
		this.emit("collision", object, hit);
	}

	handleCollision(object: MapObject, hit: any) {
		if (object.type === Engine.ObjectType.SOLID || object.type === Engine.ObjectType.SECRET || object.type === Engine.ObjectType.BRICK) {

			if (hit.leftMiddle) {
				this.handleLeftCollision(object);

			} else if (hit.rightMiddle) {
				this.handleRightCollision(object);

			} else if (hit.bottomMiddle) {
				this.handleBottomCollision(object);

			} else if (hit.topMiddle) {
				this.handleTopCollision(object);
			}
		}
	};

	handleLeftCollision(object: MapObject) {

	}

	handleRightCollision(object: MapObject) {

	}

	handleBottomCollision(object: MapObject) {

	}

	handleTopCollision(object: MapObject) {

	}
}

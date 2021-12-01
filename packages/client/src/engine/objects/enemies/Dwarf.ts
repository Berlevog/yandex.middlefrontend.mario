import { ResourceImage } from "../../../pages/Game/Resources";
import { Engine } from "../../Engine";
import { MapObject } from "../../MapObject";
import { PhysicalObject } from "../../PhysicalObject";

type DwarfProps = {
	x: number;
	y: number;
};

export default class Dwarf extends PhysicalObject {
	public type = Engine.ObjectType.ENEMY;
	private step: NodeJS.Timer;	handleRightCollision(object: MapObject) {
		this.velocity.x = -0.5;
	}
	private runningTextures: Generator<number[], void, unknown>;	handleLeftCollision(object: MapObject) {
		this.velocity.x = 0.5;
	}
	private textureParams: [number, number, number, number] | undefined;	render(renderer: Engine.IRenderer) {
		const { context } = renderer;
		context.save();
		if (this.textureParams) {
			context.drawImage(this.texture.img, ...this.textureParams, this.x, this.y, this.width, this.height);
		}
		context.restore();
	}
	private textureSize = 81;

	constructor(props: DwarfProps) {
		super({ ...props, texture: new ResourceImage("images/dwarf.png") });
		this.height = 16;
		this.width = 16;
		this.x = props.x;
		this.y = props.y;
		this.mass = 10;
		this.runningTextures = this.getRunningTexture();
		this.getTexture();
		this.dragCoefficient = 0;
		this.velocity.x = 0.5;

		this.step = setInterval(() => {
			this.getTexture();
		}, 500);
	}

	* getRunningTexture() {
		while (true) {
			yield [0, 0, this.textureSize, this.textureSize];
			yield [this.textureSize, 0, this.textureSize, this.textureSize];
		}
	}

	getTexture() {
		if (this.velocity.x > 0 || this.velocity.y > 0 || !this.textureParams) {
			this.textureParams = this.runningTextures.next().value as [number, number, number, number];
		}
	}






}

import { MapObject } from "../../../engine/MapObject";
import { ResourceImage } from "../../../pages/Game/Resources";
import { Engine } from "../../Engine";
import { PhysicalObject } from "../../PhysicalObject";

type CoinProps = {
	x: number;
	y: number;
};

export default class Coin extends MapObject {
	public type = Engine.ObjectType.COIN;

	render(renderer: Engine.IRenderer) {
		const { context } = renderer;
		context.save();
		context.drawImage(this.texture.img, this.x, this.y, this.width, this.height);
		context.restore();
	}

	constructor(props: CoinProps) {
		super({ ...props, texture: new ResourceImage("images/coin.png") });
		this.height = 16;
		this.width = 16;
		this.x = props.x;
		this.y = props.y;
	}
}

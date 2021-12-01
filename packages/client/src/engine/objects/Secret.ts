import { ResourceImage } from "../../pages/Game/Resources";
import { Engine } from "../Engine";
import { MapObject } from "../MapObject";

type SecretProps = {
	x: number;
	y: number;
	coins?:number,
};

export default class Secret extends MapObject {
	public type = Engine.ObjectType.SECRET;
	private runningTextures: IterableIterator<number>;
	private touched: boolean;
	public coins: number;

	handleBottomCollision(object: MapObject) {
		super.handleBottomCollision(object);
		if(this.coins>0){
			this.touched = true;
			this.coins--;
		}
	}

	constructor(props: SecretProps) {
		super({ ...props, texture: new ResourceImage("images/secret.png") });
		this.height = 16;
		this.width = 16;
		this.x = props.x;
		this.y = props.y;
		this.coins = props.coins || 5;
		this.touched = false;
		this.runningTextures = this.getRunningTexture();
	}

	render(renderer: Engine.IRenderer) {
		const { context } = renderer;
		let offset = 0;
		if(this.touched){
			const {value,done} = this.runningTextures.next()
			offset = value;
			if(done){
				this.touched = false;
				this.runningTextures = this.getRunningTexture();
			}
		}
		context.save();
		context.drawImage(this.texture.img, this.x, this.y-offset, 16, 16);
		context.restore();
	}

	* getRunningTexture() {
	    yield 1;
	    yield 2;
	    yield 3;
	    yield 2;
	    yield 1;
	    yield 0;
	}

}

import { Engine } from "./Engine";
import { MapObject } from "./MapObject";
import { Vector } from "./Point";
import { Rect } from "./Rect";

export const FREE_FALL_VELOCITY = 9.81; //ускорение свободного падения
export const AIR_DENSITY = 1.2; // сопротивление среды

export class PhysicalObject extends MapObject implements Engine.IPhysicalObject {
	public mass: number = 0;
	public type = Engine.ObjectType.SOLID;
	public velocity: Vector = new Vector();
	public a: Vector = new Vector({ x: 0, y: 0 });
	public isDead: boolean = false;
	protected timeStep = 0.02;
	protected velocityY: number;
	protected bounciness: number;
	protected ay: number;
	protected dragCoefficient: number;
	protected A: number;
	protected velocityX: number;
	private interval: NodeJS.Timeout;

	constructor(props: Engine.PhysicalObjectProps) {
		super(props);
		this.width = 24;
		this.height = 24;
		this.mass = 1; // масса объекта в кг
		this.velocityY = 0; // начальная скорость
		this.velocityX = 0;
		this.bounciness = 0.4; // упругость объекта
		this.ay = -2;
		this.dragCoefficient = 0.5; // сопротивление поверхности
		this.A = this.width * this.height / 10000; //Frontal area divided by 10000 to compensate for the 1px = 1cm relation

		this.rect = new Rect({ x: 50, y: 50, width: this.width, height: this.height });

		this.interval = setInterval(this.physics, this.timeStep * 1000);
	}

	handleRightCollision(object: MapObject) {
		if (this.velocity.x > 0) {
			this.velocity.x *= -this.bounciness;
			this.x = object.x - this.width;
		}
	}

	handleLeftCollision(object: MapObject) {
		if (this.velocity.x < 0) {
			this.velocity.x *= this.bounciness;
			this.x = object.x + object.width;
		}
	}

	handleTopCollision(object: MapObject) {
		if (this.velocity.y < 0) {
			this.velocity.y *= -this.bounciness;
			this.y = object.y + object.height;
		}
	}

	handleBottomCollision(object: MapObject) {
		if (this.velocity.y > 0 && !this.isDead) {
			this.velocity.y *= this.bounciness;
			this.y = object.y - this.height;
		}
	}


	/* Weight force, which only affects the y-direction (because that's the direction gravity points). */
	getWeightForce = () => {
		return this.mass * FREE_FALL_VELOCITY;
	};

	/* Air resistance force; this would affect both x- and y-directions, but we're only looking at the y-axis in this example. */
	getAirResistance = () => {
		return new Vector({
			x: 0, //-1* (0.5 * AIR_DENSITY * this.dragCoefficient * this.A * Math.pow(this.velocity.x, 2)),
			y: -1 * (0.5 * AIR_DENSITY * this.dragCoefficient * this.A * Math.pow(this.velocity.y, 2))
		});
	};

	getUserDefinedForceResistance() {
		return 0;
	}

	physics = () => {
		let force = new Vector({ x: 0, y: 0 });
		force.y = this.getWeightForce();
		force.add(this.getAirResistance());

		// f.x += this.getUserDefinedForceResistance();
		// f.y += this.getWeightForce();

		/* Varlet integration for the y-direction */
		let delta = new Vector({
			x: this.velocity.x * this.timeStep + (0.5 * this.a.x) * Math.pow(this.timeStep, 2),
			y: this.velocity.y * this.timeStep + (0.5 * this.a.y) * Math.pow(this.timeStep, 2)
		});

		/* The following line is because the math assumes meters but we're assuming 1 cm per pixel, so we need to scale the results */
		this.y = Math.round(this.y + delta.y * 100);
		this.x = Math.round(this.x + delta.x * 100);

		const newA = new Vector({
			x: force.x / this.mass,
			y: force.y / this.mass
		});

		const avgA = new Vector({
			x: 0.5 * (newA.x + this.a.x),
			y: 0.5 * (newA.y + this.a.y)
		});

		this.velocity.addScaled(
			{
				x: avgA.x,
				y: avgA.y
			},
			this.timeStep
		);

		// this.velocity.x = this.velocity.x / 2;
		// let ke = 0.5 * this.mass * Math.pow(this.velocity.x, 2);
		// let pl = this.A * Math.pow(this.velocity.x, 2) * this.timeStep;
		// ke -= pl;
		//
		// this.velocity.x = Math.sqrt((2 * ke) / this.mass);
	};

	addForce(vector: Vector) {
		const maxForce = 2.5;
		this.velocity.x = Math.max(-maxForce, Math.min(this.velocity.x + vector.x, maxForce));
		this.velocity.y = Math.max(-maxForce, Math.min(this.velocity.y + vector.y, maxForce));

	}

	render(renderer: Engine.IRenderer) {
		const { context } = renderer;

		context.save();
		context.drawImage(this.texture.img, this.x, this.y, this.width, this.height);
		context.restore();
	}

	destroy() {
		this.removeAllListeners("collision");
		clearInterval(this.interval);
	}
}

import { DisplayObject, Engine } from "./Engine";

export default class PhysicalObject extends DisplayObject {
  private params: any;
  private interval: NodeJS.Timeout;

  constructor() {
    super();
    this.params = {
      height: 207, //ground
      vy: 0,
      ay: 0,
      m: 0.1, // Ball mass in kg
      r: 10, // Ball radius in cm, or pixels.
      dt: 0.02, // Time step.
      e: -0.5, // Coefficient of restitution ("bounciness")
      rho: 1.2, // Density of air. Try 1000 for water.
      C_d: 0.47, // Coefficient of drag for a ball
      A: (Math.PI * Math.pow(10, 2)) / 10000, // Frontal area of the ball; divided by 10000 to compensate for the 1px = 1cm relatio
    };
    this.width = 10;
    this.height = 10;
    this.position = { x: 50, y: 50 };

    //todo clear
    this.interval = setInterval(this.physics, this.params.dt * 1000);
  }

  physics = () => {
    let fy = 0;

    /* Weight force, which only affects the y-direction (because that's the direction gravity points). */
    fy += this.params.m * 9.81;

    /* Air resistance force; this would affect both x- and y-directions, but we're only looking at the y-axis in this example. */
    fy += -1 * 0.5 * this.params.rho * this.params.C_d * this.params.A * this.params.vy * this.params.vy;

    /* Varlet integration for the y-direction */
    let dy = this.params.vy * this.params.dt + 0.5 * this.params.ay * this.params.dt * this.params.dt;
    /* The following line is because the math assumes meters but we're assuming 1 cm per pixel, so we need to scale the results */
    this.positionY += dy * 100;
    let new_ay = fy / this.params.m;
    let avg_ay = 0.5 * (new_ay + this.params.ay);
    this.params.vy += avg_ay * this.params.dt;

    /* Let's do very simple collision detection */
    if (this.positionY + this.params.r > this.params.height && this.params.vy > 0) {
      /* This is a simplification of impulse-momentum collision response. e should be a negative number, which will change the velocity's direction. */
      this.params.vy *= this.params.e;
      /* Move the ball back a little bit so it's not still "stuck" in the wall. */
      this.positionY = this.params.height - this.params.r;
    }
  };

  render(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;

    context.save();
    context.fillStyle = "red";
    context.clearRect(0, 0, this.rect.width, this.rect.height);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.params.r, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    context.restore();
  }

  destroy() {
    clearInterval(this.interval);
  }
}

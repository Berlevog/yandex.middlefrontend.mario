import { ResourceImage } from "../../pages/Game/Resources";
import { Engine } from "../Engine";
import { MapObject } from "../MapObject";

type LandProps = {
  x: number;
  y: number;
  count: number;
};

export default class Land extends MapObject {
  public type = Engine.ObjectType.SOLID;
  private count: number;

  constructor(props: LandProps) {
    super({ ...props, texture: new ResourceImage("images/ground.png") });
    this.count = props.count || 1;
    this.height = 16;
    this.width = 16 * this.count;
    this.x = props.x;
    this.y = props.y;
  }

  render(renderer: Engine.IRenderer) {
    const { context } = renderer;
    context.save();

    let c = 0;
    while (c < this.count) {
      context.drawImage(this.texture.img, this.x + c * 16, this.y, 16, 16);
      c++;
    }
    context.restore();
  }
}

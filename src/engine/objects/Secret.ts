import { ResourceImage } from "../../pages/Game/Resources";
import { Engine } from "../Engine";
import { MapObject } from "../MapObject";

type SecretProps = {
  x: number;
  y: number;
};

export default class Secret extends MapObject {
  public type = Engine.ObjectType.SOLID;

  constructor(props: SecretProps) {
    super({ ...props, texture: new ResourceImage("images/secret.png") });
    this.height = 16;
    this.width = 16;
    this.x = props.x;
    this.y = props.y;
  }

  render(renderer: Engine.IRenderer) {
    const { context } = renderer;
    context.save();
    context.drawImage(this.texture.img, this.x, this.y, 16, 16);
    context.restore();
  }
}

import { ResourceImage } from "../../pages/Game/Resources";
import { Engine } from "../Engine";
import { MapObject } from "../MapObject";

type PipeProps = {
  x: number;
  y: number;
  height: number;
  isPortal?: boolean;
  isHaunted?: boolean;
};

export default class Pipe extends MapObject {
  constructor(props: PipeProps) {
    super({ ...props, texture: new ResourceImage("images/pipe.png") });
    this.height = props.height;
    this.width = 32;
    this.x = props.x;
    this.y = props.y - this.height;
  }

  render(renderer: Engine.IRenderer) {
    const { context } = renderer;
    context.save();
    context.drawImage(this.texture.img, this.x, this.y, 32, 32);

    let h = 32;
    while (h < this.height) {
      let step = Math.min(12, this.height - h);
      const imageData = context.getImageData(this.x + 2, this.y + 32 - step, 32 - 4, step);
      context.putImageData(imageData, this.x + 2, this.y + h);
      h += step;
    }
    context.restore();
  }
}

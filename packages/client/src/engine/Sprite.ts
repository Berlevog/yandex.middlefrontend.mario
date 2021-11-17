import { ResourceImage } from "../pages/Game/Resources";
import { DisplayObject } from "./DisplayObject";
import { Engine } from "./Engine";

export class Sprite extends DisplayObject {
  public texture: ResourceImage;

  constructor(props: Engine.SpriteProps) {
    super(props);
    this.texture = props.texture;
  }

  setTexture(texture: ResourceImage) {
    this.texture = texture;
  }
}

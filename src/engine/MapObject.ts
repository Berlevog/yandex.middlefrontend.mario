import { Sprite } from "./Sprite";

export class MapObject extends Sprite {
  collide(object: MapObject) {
    this.emit("collision", object);
  }
}

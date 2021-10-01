import { Engine } from "./Engine";
import { Sprite } from "./Sprite";

export class MapObject extends Sprite {
  collide(object: MapObject, hit: Engine.IHit | null) {
    this.emit("collision", object, hit);
  }
}

import { Engine } from "./Engine";
import { Sprite } from "./Sprite";

export class MapObject extends Sprite {
  public type = Engine.ObjectType.SOLID;

  collide(object: MapObject, hit: Engine.HitSide) {
    this.emit("collision", object, hit);
  }
}

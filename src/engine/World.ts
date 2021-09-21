import { ResourceImage } from "../pages/Game/Resources";
import { Sprite } from "./Engine";

class World extends Sprite {
  public sprite: ResourceImage;

  constructor() {
    super();
    this.sprite = new ResourceImage("images/player.png");
  }
}

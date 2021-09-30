import { ResourceImage } from "../pages/Game/Resources";
import Clouds from "./Clouds";
import { Engine } from "./Engine";
import { MapObject } from "./MapObject";
import { PhysicalObject } from "./PhysicalObject";
import { Rect } from "./Rect";
import { Sprite } from "./Sprite";

const SHIFT_WIDTH: number = 120;
const LAND_Y: number = 207;

type WorldProps = {
  player: PhysicalObject;
};

export default class World extends Sprite {
  public sprite: ResourceImage;
  private player: PhysicalObject;
  private groundRects: Engine.IRect[];
  private debugAreas: boolean = false;
  private clouds: Clouds;
  private mapObjects: MapObject[];

  constructor(props: WorldProps) {
    super({ ...props, texture: new ResourceImage("images/world.png") });
    this.clouds = new Clouds();
    this.player = props.player;
    this.sprite = new ResourceImage("images/world.png");

    this.groundRects = [
      { x: 0, y: LAND_Y, width: 1105, height: 32 },
      // { x: 448, y: LAND_Y - 32, width: 32, height: 64 },
      { x: 608, y: LAND_Y - 48, width: 32, height: 80 },
    ];

    const obj1 = new MapObject({ texture: new ResourceImage("images/world.png") });
    obj1.rect = new Rect({ x: 0, y: LAND_Y, width: 1105, height: 32 });
    this.mapObjects = [obj1];
  }

  detectCollisions() {
    this.mapObjects.forEach((object) => {
      if (this.player.testHit(object.rect)) {
        this.player.collide(object);
        object.collide(this.player);
      }
    });
  }

  /*checkCollisions() {
    //ground
    let isFalling = true;

    this.groundRects.forEach((ground) => {
      if (this.player.testHit(ground)) {
        const aabbColision = getAABBCollision(ground, this.player.rect);

        if (aabbColision?.bottom) {
          this.player.y = ground.y - this.player.rect.height + 1;
          isFalling = false;
        } else {
          // this.player.setPlayerState(PlayerState.FALLING);
          if (aabbColision?.top) {
            this.player.y = ground.y + ground.height - 1;
          }
          if (aabbColision?.left) {
            this.player.x = ground.x - this.player.rect.width - 1;
          }
          if (aabbColision?.right) {
            this.player.x = ground.x + ground.width + 1;
          }
        }
      } else {
      }
      // this.player.isFalling = isFalling;
    });
  }*/

  shiftWorld(canvas: HTMLCanvasElement) {
    if (this.player.x > canvas.width - SHIFT_WIDTH && this.sprite.img.width > -this.x + canvas.width) {
      if (this.sprite.img.width) {
        const shift = Math.min(this.sprite.img.width + this.x - canvas.width, SHIFT_WIDTH);
        this.x = this.x - shift;
        this.player.x = this.player.x - shift;
        this.groundRects.forEach((rect) => {
          rect.x = rect.x - shift;
        });
      }

      this.clouds.getClouds().forEach((cloud) => {
        cloud.x = cloud.x - SHIFT_WIDTH;
      });
    }
    if (this.player.x >= canvas.width) {
      this.player.x = canvas.width - this.player.size.width - 24;
    }

    // this.mapObjects = this.mapObjects.filter((object) => object.positionX + object.width - SHIFT_WIDTH > 0);
  }

  render(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;
    this.detectCollisions();
    this.shiftWorld(canvas);

    context.save();
    context.drawImage(this.sprite.img, this.x, this.y);

    if (this.debugAreas) {
      context.fillStyle = "blue";
      this.groundRects.forEach((ground) => {
        context.fillRect(ground.x, ground.y, ground.width, ground.height);
      });
    }

    this.clouds.render(renderer);
    context.restore();
  }
}

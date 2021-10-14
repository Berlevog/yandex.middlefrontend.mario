import { ResourceImage } from "../pages/Game/Resources";
import Clouds from "./Clouds";
import { Engine } from "./Engine";
import { MapObject } from "./MapObject";
import Brick from "./objects/Brick";
import Dwarf from "./objects/enemies/Dwarf";
import Land from "./objects/Land";
import Pipe from "./objects/Pipe";
import Secret from "./objects/Secret";
import Tiles from "./objects/Tiles";
import { PhysicalObject } from "./PhysicalObject";
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
  private enemies: PhysicalObject[];

  constructor(props: WorldProps) {
    super({ ...props, texture: new ResourceImage("images/world.png") });
    this.clouds = new Clouds();
    this.player = props.player;
    this.sprite = new ResourceImage("images/world.png");

    this.groundRects = [
      // { x: 0, y: LAND_Y, width: 1105, height: 32 },
      // { x: 448, y: LAND_Y - 32, width: 32, height: 64 },
      // { x: 608, y: LAND_Y - 48, width: 32, height: 80 },
    ];

    this.mapObjects = [
      new Land({ x: 0, y: LAND_Y, count: 69 }),
      new Pipe({ x: 448, y: LAND_Y, height: 32 }),
      new Brick({ x: 320, y: LAND_Y - 64, count: 5 }),
      new Brick({ x: 520, y: LAND_Y - 128, count: 5 }),
      new Tiles({ x: 820, y: LAND_Y - 128, count: 5 }),
      new Secret({ x: 256, y: LAND_Y - 64 }),
      new Secret({ x: 336, y: LAND_Y - 64 }),
      new Secret({ x: 352, y: LAND_Y - 128 }),
      new Secret({ x: 368, y: LAND_Y - 64 }),
      new Pipe({ x: 608, y: LAND_Y, height: 48 }),
      new Pipe({ x: 736, y: LAND_Y, height: 64 }),
      new Pipe({ x: 912, y: LAND_Y, height: 64 }),
    ];
    this.enemies = [
      new Dwarf({ x: 50, y: LAND_Y - 64 }),
      new Dwarf({ x: 256, y: LAND_Y - 128 }),
      new Dwarf({ x: 650, y: LAND_Y - 64 }),
    ];
  }
  //todo isObjectVisible?
  detectCollisions() {
    this.mapObjects.forEach((object) => {
      if (this.player.testHit(object.rect)) {
        this.player.collide(object, this.player.direction());
        object.collide(this.player, this.player.direction());
      }
    });
    this.mapObjects.forEach((object) => {
      this.enemies.forEach((enemy) => {
        if (enemy.testHit(object.rect)) {
          enemy.collide(object, enemy.direction());
          object.collide(enemy, enemy.direction());
        }
      });
    });
    this.enemies.forEach((enemy) => {
      if (this.player.testHit(enemy.rect)) {
        this.player.collide(enemy, this.player.direction());
        enemy.collide(this.player, this.player.direction());
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
        this.mapObjects.forEach((rect) => {
          rect.x = rect.x - shift;
        });
        this.enemies.forEach((rect) => {
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
      this.mapObjects.forEach((ground) => {
        context.fillRect(ground.x, ground.y, ground.width, ground.height);
      });
    }

    this.mapObjects.forEach((object) => {
      object.render(renderer);
    });
    this.enemies.forEach((object) => {
      object.render(renderer);
    });

    this.clouds.render(renderer);
    context.restore();
  }
}

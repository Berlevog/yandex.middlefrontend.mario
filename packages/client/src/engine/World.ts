import Peach from "./objects/enemies/Peach";
import Player from "./Player";
import { Point } from "./Point";
import { ResourceImage } from "../pages/Game/Resources";
import Clouds from "./Clouds";
import { Engine, getCollision } from "./Engine";
import { MapObject } from "./MapObject";
import Music, { Playlist } from "./Music";
import Brick from "./objects/Brick";
import Dwarf from "./objects/enemies/Dwarf";
import Land from "./objects/Land";
import Pipe from "./objects/Pipe";
import Coin from "./objects/resources/Coin";
import Secret from "./objects/Secret";
import Tiles from "./objects/Tiles";
import { PhysicalObject } from "./PhysicalObject";
import { Sprite } from "./Sprite";

const SHIFT_WIDTH: number = 120;
const LAND_Y: number = 207;

type WorldProps = {
  player: PhysicalObject;
  onGameOver: Function;
  onVictory: Function;
};

//@ts-ignore
export default class World extends Sprite {
  public sprite: ResourceImage;
  private player: Player;
  private debugAreas: boolean = false;
  private clouds: Clouds;
  private mapObjects: MapObject[];
  private enemies: PhysicalObject[];
  private music: Music;
  private resources: MapObject[];
  private score: { score: number; coins: number };
  private startTime: number;

  constructor(private props: WorldProps) {
    super({ ...props, texture: new ResourceImage("images/world.png") });
    this.score = { coins: 0, score: 0 };
    this.startTime = new Date().getTime();

    this.clouds = new Clouds();
    this.player = props.player as Player;
    this.sprite = new ResourceImage("images/world.png");
    this.music = new Music();
    this.music.on("loaded", () => {
      this.music.playSound(Playlist.world, true);
    });

    this.player.once("gameover", () => {
      this.music.stop(Playlist.world);
      this.music.playSound(Playlist.killed).then(() => {
        this.props.onGameOver({ ...this.score, time: new Date().getTime() - this.startTime });
      });
    });

    this.player.once("victory", () => {
      this.music.stop(Playlist.boss);
      this.music.playSound(Playlist.victory).then(() => {
        this.props.onVictory({ ...this.score, time: new Date().getTime() - this.startTime });
      });
    });

    this.once("boss", () => {
      this.music.stop(Playlist.world);
      this.music.playSound(Playlist.boss, true, 23);
    });

    this.player.on("harvest", (item: MapObject) => {
      this.music.playSound(Playlist.coin);
      this.score.coins++;
      this.resources = this.resources.filter((resource) => resource !== item);
    });

    this.player.on("spoil", (isCoin: boolean) => {
      if (isCoin) {
        this.music.playSound(Playlist.coin);
        this.score.coins++;
      }
    });

    this.player.on("jump", () => {
      this.music.playSound(Playlist.jump);
    });

    this.player.on("kill", () => {
      this.music.playSound(Playlist.kill);
    });

    this.player.on("log", () => {
      const pos = new Point({
        x: Math.abs(this.position.x) + this.player.position.x,
        y: Math.abs(this.position.y) + this.player.position.y,
      })
      console.log(pos);
      this.enemies.push(new Peach({x:this.player.position.x+100, y:this.player.position.y}))
    });

    this.player.on("kill", (item: MapObject) => {
      this.score.score += 100;
      this.enemies = this.enemies.filter((resource) => resource !== item);
    });

    this.resources = [
      ...Array.from(new Array(5)).map((a, i) => new Coin({ x: 820 + 16 * i, y: LAND_Y - 128 - 24 })),
      ...Array.from(new Array(6)).map((a, i) => new Coin({ x: 519 + 16 * i, y: LAND_Y - 128 - 24 })),
      ...Array.from(new Array(8)).map((a, i) => new Coin({ x: 519 + 16 * 5 + 16 * i, y: LAND_Y - 128 - 24 + 16 * i })),
      ...Array.from(new Array(8)).map((a, i) => new Coin({ x: 1280 + 16 * i, y: LAND_Y - 128 - 24 })),
      ...Array.from(new Array(5)).map((a, i) => new Coin({ x: 2064 + 16 * i, y: LAND_Y - 128 - 24 })),
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

      new Land({ x: 1136, y: LAND_Y, count: 15 }),
      new Brick({ x: 1232, y: LAND_Y - 64, count: 1 }),
      new Secret({ x: 1248, y: LAND_Y - 64 }),
      new Brick({ x: 1264, y: LAND_Y - 64, count: 1 }),
      new Brick({ x: 1280, y: LAND_Y - 128, count: 8 }),

      new Land({ x: 1424, y: LAND_Y, count: 64 }),
      new Brick({ x: 1456, y: LAND_Y - 128, count: 3 }),
      new Secret({ x: 1504, y: LAND_Y - 128 }),
      new Brick({ x: 1504, y: LAND_Y - 64, count: 1 }),
      new Brick({ x: 1600, y: LAND_Y - 64, count: 2 }),
      new Secret({ x: 1696, y: LAND_Y - 64 }),
      new Secret({ x: 1744, y: LAND_Y - 64 }),
      new Secret({ x: 1744, y: LAND_Y - 128 }),
      new Secret({ x: 1792, y: LAND_Y - 64 }),
      new Brick({ x: 1888, y: LAND_Y - 64, count: 1 }),
      new Brick({ x: 1936, y: LAND_Y - 128, count: 3 }),
      new Brick({ x: 2048, y: LAND_Y - 128, count: 1 }),
      new Secret({ x: 2064, y: LAND_Y - 128 }),
      new Secret({ x: 2080, y: LAND_Y - 128 }),
      new Brick({ x: 2096, y: LAND_Y - 128, count: 1 }),
      new Brick({ x: 2064, y: LAND_Y - 64, count: 2 }),
      new Tiles({ x: 2144, y: LAND_Y - 16, count: 4 }),
      new Tiles({ x: 2160, y: LAND_Y - 32, count: 3 }),
      new Tiles({ x: 2176, y: LAND_Y - 48, count: 2 }),
      new Tiles({ x: 2192, y: LAND_Y - 64, count: 1 }),
      new Tiles({ x: 2240, y: LAND_Y - 64, count: 1 }),
      new Tiles({ x: 2240, y: LAND_Y - 48, count: 2 }),
      new Tiles({ x: 2240, y: LAND_Y - 32, count: 3 }),
      new Tiles({ x: 2240, y: LAND_Y - 16, count: 4 }),
      new Tiles({ x: 2368, y: LAND_Y - 16, count: 5 }),
      new Tiles({ x: 2384, y: LAND_Y - 32, count: 4 }),
      new Tiles({ x: 2400, y: LAND_Y - 48, count: 3 }),
      new Tiles({ x: 2416, y: LAND_Y - 64, count: 2 }),

      new Land({ x: 2480, y: LAND_Y, count: 56 }),
      new Tiles({ x: 2480, y: LAND_Y - 64, count: 1 }),
      new Tiles({ x: 2480, y: LAND_Y - 48, count: 2 }),
      new Tiles({ x: 2480, y: LAND_Y - 32, count: 3 }),
      new Tiles({ x: 2480, y: LAND_Y - 16, count: 4 }),
      new Pipe({ x: 2608, y: LAND_Y, height: 32 }),
      new Brick({ x: 2688, y: LAND_Y - 64, count: 2 }),
      new Secret({ x: 2720, y: LAND_Y - 64 }),
      new Brick({ x: 2736, y: LAND_Y - 64, count: 1 }),
      new Pipe({ x: 2864, y: LAND_Y, height: 32 }),
      new Tiles({ x: 2896, y: LAND_Y - 16, count: 9 }),
      new Tiles({ x: 2912, y: LAND_Y - 32, count: 8 }),
      new Tiles({ x: 2928, y: LAND_Y - 48, count: 7 }),
      new Tiles({ x: 2944, y: LAND_Y - 64, count: 6 }),
      new Tiles({ x: 2960, y: LAND_Y - 80, count: 5 }),
      new Tiles({ x: 2976, y: LAND_Y - 96, count: 4 }),
      new Tiles({ x: 2992, y: LAND_Y - 112, count: 3 }),
      new Tiles({ x: 3008, y: LAND_Y - 128, count: 2 }),
      new Tiles({ x: 3168, y: LAND_Y - 16, count: 1 }),

      new Tiles({ x: 3370, y: LAND_Y - 16, count: 1 }),
      new Tiles({ x: 3370, y: LAND_Y - 32, count: 1 }),
      new Tiles({ x: 3370, y: LAND_Y - 48, count: 1 }),
      new Tiles({ x: 3370, y: LAND_Y - 64, count: 1 }),
      new Tiles({ x: 3370, y: LAND_Y - 80, count: 1 }),
      new Tiles({ x: 3370, y: LAND_Y - 96, count: 1 }),
      new Tiles({ x: 3370, y: LAND_Y - 112, count: 1 }),
      new Tiles({ x: 3370, y: LAND_Y - 128, count: 1 }),
    ];
    this.enemies = [
      new Dwarf({ x: 50, y: LAND_Y - 64 }),
      new Dwarf({ x: 256, y: LAND_Y - 128 }),
      new Dwarf({ x: 650, y: LAND_Y - 64 }),
      new Dwarf({ x: 820, y: LAND_Y - 64 }),
      new Dwarf({ x: 2322, y: LAND_Y - 128 }),
      new Dwarf({ x: 2568, y: LAND_Y - 128 }),
      new Dwarf({ x: 2706, y: LAND_Y - 128 }),
      new Dwarf({ x: 3150, y: LAND_Y - 128 }),
      new Dwarf({ x: 3160, y: LAND_Y - 128 }),
      new Peach({ x: 3200, y: LAND_Y - 128 }),
    ];
  }

  //todo isObjectVisible?
  detectCollisions() {
    this.mapObjects.forEach((object) => {
      const collision = getCollision(this.player, object);
      const collisionReverse = getCollision(object, this.player);

      if (collision.isCollision) {
        this.player.collide(object, collision);
        object.collide(this.player, collisionReverse);
      }

      this.enemies.forEach((enemy) => {
        if (enemy.testHit(object.rect)) {
          enemy.collide(object, getCollision(enemy, object));
          object.collide(enemy, getCollision(object, enemy));
        } else if (this.player.testHit(enemy.rect)) {
          this.player.collide(enemy, getCollision(this.player, enemy));
          enemy.collide(this.player, getCollision(enemy, this.player));
        }
      });
    });

    this.resources.forEach((object) => {
      if (this.player.testHit(object.rect)) {
        this.player.collide(object, getCollision(this.player, object));
        object.collide(this.player, getCollision(object, this.player));
      }
    });

    this.player.x = Math.max(this.player.x, this.x);
    if (this.player.y > 800) {
      this.player.gameOver();
    }
  }

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
        this.resources.forEach((rect) => {
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

  drawStats(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;
    const y = 25;
    context.save();
    context.font = "24px monospace";
    context.fillText(this.score.coins.toString(), 320, y);
    context.fillText(this.score.score.toString(), 720, y);
    context.fillText("WORLD 1-1", 520, y);
    context.restore();
  }

  drawBoss(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;
    const y = 64;
    context.save();
    context.font = "26px monospace";
    context.fillText("BOSS: PEACH", 300, y);
    context.restore();
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

    this.resources.forEach((object) => {
      object.render(renderer);
    });

    this.clouds.render(renderer);
    this.drawStats(renderer);
    if(Math.abs(this.position.x) + this.player.position.x>2800){
      this.drawBoss(renderer);
      this.emit('boss');
    }
    context.restore();
  }

  destroy() {
    super.destroy();
    this.music.stopAll();
  }
}

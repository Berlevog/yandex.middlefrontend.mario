import { ResourceImage } from "../pages/Game/Resources";
import Clouds from "./Clouds";
import { Engine, getAABBColision, Sprite } from "./Engine";
import Player, { PlayerState } from "./Player";

const SHIFT_WIDTH: number = 120;
const LAND_Y: number = 207;

export default class World extends Sprite {
  public sprite: ResourceImage;
  private player: Player;
  private groundRects: Engine.IRect[];
  private audio: HTMLAudioElement;
  private debugAreas: boolean = true;
  private clouds: Clouds;

  constructor(player: Player) {
    super();
    this.clouds = new Clouds();
    this.player = player;
    this.sprite = new ResourceImage("images/world.png");

    this.groundRects = [
      { x: 0, y: LAND_Y, width: 800, height: 32 },
      { x: 448, y: LAND_Y - 32, width: 32, height: 64 },
    ];
    this.audio = document.createElement("audio");
    this.audio.autoplay = true;
    this.audio.loop = true;
    this.playAudioTheme();
  }

  playAudioTheme() {
    if (this.audio.canPlayType("audio/ogg")) {
      this.audio.setAttribute("src", "music/world01.ogg");
    }
  }

  checkCollisions() {
    //ground
    let isFallen = true;

    this.groundRects.forEach((ground) => {
      if (this.player.testHit(ground)) {
        const aabbColision = getAABBColision(ground, this.player.rect);
        if (aabbColision?.bottom) {
          // this.player.positionY = ground.y - this.player.rect.height + 1;
          // if (this.player.playerState === PlayerState.FALLING) {
          //   // isFallen = false;
          //   console.log("fall", this.player.playerState);
          //   this.player.playerState = PlayerState.WAITING;
          //   // this.player.setPlayerState(PlayerState.WAITING);
          // }
        } else {
          this.player.setPlayerState(PlayerState.FALLING);
          if (aabbColision?.top) {
            this.player.positionY = ground.y + ground.height - 1;
          }
          if (aabbColision?.left) {
            this.player.positionX = ground.x - this.player.rect.width - 1;
          }
          if (aabbColision?.right) {
            this.player.positionX = ground.x + ground.width + 1;
          }
        }
      } else {
      }
    });

    // this.player.isFalling = isFallen;
  }

  shiftWorld(canvas: HTMLCanvasElement) {
    if (this.player.positionX > canvas.width - SHIFT_WIDTH && this.sprite.img.width > -this.positionX + canvas.width) {
      if (this.sprite.img.width) {
        const shift = Math.min(this.sprite.img.width + this.positionX - canvas.width, SHIFT_WIDTH);
        this.positionX = this.positionX - shift;
        this.player.positionX = this.player.positionX - shift;
      }

      this.clouds.getClouds().forEach((cloud) => {
        cloud.positionX = cloud.positionX - SHIFT_WIDTH;
      });
    }
    if (this.player.positionX >= canvas.width) {
      this.player.positionX = canvas.width - this.player.size.width - 24;
    }
  }

  render(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;
    this.checkCollisions();
    this.shiftWorld(canvas);

    context.save();
    context.drawImage(this.sprite.img, this.positionX, this.positionY);

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

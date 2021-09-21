import { ResourceImage } from "../pages/Game/Resources";
import { Engine, Sprite } from "./Engine";

enum PlayerState {
  "WAITING" = "player/WAITING",
  "RUNNING" = "player/RUNNING",
  "JUMPING" = "player/JUMPING",
}

enum PlayerDirection {
  "LEFT",
  "RIGHT",
}

// todo на будущее добавить в игру грибы и размеры персонажа
enum PlayerSize {
  "NORMAL",
  "BIG",
}

class Player extends Sprite {
  public sprite: ResourceImage;
  private playerState: PlayerState = PlayerState.WAITING;
  private playerDirection: PlayerDirection = PlayerDirection.RIGHT;
  private textureSize: Engine.ISizeData = { width: 128, height: 128 };
  private animateRunningInterval: number | NodeJS.Timer | undefined;
  private runningFrame = 0;
  private jumpingFrame = 0;
  private playerSize: Engine.ISizeData = { width: 64, height: 64 };

  constructor() {
    super();
    this.sprite = new ResourceImage("images/player.png");
    this.registerEvents();
    this.setPlayerState(PlayerState.WAITING);
  }

  getPlayerImage(state: PlayerState): [HTMLImageElement, number, number, number, number] | undefined {
    let position: Engine.IPoint = { x: 0, y: 0 };

    switch (state) {
      case PlayerState.WAITING:
        position = { x: 0, y: 0 };
        break;
      case PlayerState.RUNNING:
        position = this.getRunningImagePosition(this.runningFrame);
        break;
      case PlayerState.JUMPING:
        position = this.getJumpingImagePosition(this.jumpingFrame);
        break;
    }
    return [this.sprite.img, position.x, position.y, this.textureSize.width, this.textureSize.height];
  }

  getRunningImagePosition(runningFrame: number): Engine.IPoint {
    const start = 256;
    const step = this.textureSize.width;
    return { x: start + step * runningFrame, y: 0 };
  }

  getJumpingImagePosition(jumpingFrame: number): Engine.IPoint {
    return { x: 43, y: 9 }; //todo сделать прыжки
  }

  registerEvents() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
    this.on("playerstate", this.handleChangeState);
  }

  handleChangeState() {
    switch (this.playerState) {
      case PlayerState.WAITING:
        this.stopAnimaterunningFrame();
        break;
      case PlayerState.RUNNING:
        this.animaterunningFrame();
        break;
    }
  }

  animaterunningFrame() {
    // @ts-ignore
    this.animateRunningInterval = setInterval(() => {
      if (this.runningFrame >= 2) {
        this.runningFrame = 0;
      } else {
        this.runningFrame++;
      }
      // this.runningFrame = 2;
      console.log(this.runningFrame);
    }, 120);
  }

  stopAnimaterunningFrame() {
    if (this.animateRunningInterval) {
      // @ts-ignore
      clearInterval(this.animateRunningInterval);
    }
  }

  handleKeyup = () => {
    switch (this.playerState) {
      case PlayerState.RUNNING:
        this.setPlayerState(PlayerState.WAITING);
        break;
    }
  };

  canPlayerRun() {
    return this.playerState !== PlayerState.JUMPING;
  }

  setPlayerState(state: PlayerState) {
    if (this.playerState !== state) {
      this.playerState = state;
      this.emit("playerstate", this.playerState);
    }
  }

  handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        if (this.canPlayerRun()) {
          this.position.x = this.position.x + 16;
          this.setPlayerState(PlayerState.RUNNING);
        }

        break;
      case "ArrowLeft":
        if (this.canPlayerRun()) {
          this.position.x = this.position.x - 16;
          this.setPlayerState(PlayerState.RUNNING);
        }
        break;
    }
  };

  render(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;

    const img = this.getPlayerImage(this.playerState);
    if (img) {
      context.save();
      // context.scale(-1, 1);
      context.drawImage(...img, this.position.x, this.position.y, this.playerSize.width, this.playerSize.height);
      context.restore();
    }
  }
}

export default Player;

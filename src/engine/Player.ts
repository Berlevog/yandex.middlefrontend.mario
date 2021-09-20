import { ResourceImage } from "../pages/Game/Resources";
import { Engine, Sprite } from "./Engine";

enum PlayerState {
  "WAIT",
  "RUNNING",
  "IN_AIR",
}

class Player extends Sprite {
  public sprite: ResourceImage;
  private playerState: PlayerState = PlayerState.WAIT;
  private animateRunningInterval: number | NodeJS.Timer | undefined;
  private runningState = 0;

  constructor() {
    super();
    this.sprite = new ResourceImage("images/player.png");
    this.registerEvents();
    this.setPlayerState(PlayerState.WAIT);
  }

  getPlayerImage(
    state: PlayerState
  ): [HTMLImageElement, number, number, number, number, number, number, number, number] | undefined {
    switch (state) {
      case PlayerState.WAIT:
        return [this.sprite.img, 2, 9, 14, 16, this.position.x, this.position.y, 50, 50];
      case PlayerState.RUNNING:
        if (this.runningState === 0) {
          return [this.sprite.img, 43, 9, 14, 16, this.position.x, this.position.y, 50, 50];
        } else if (this.runningState === 1) {
          return [this.sprite.img, 60, 9, 14, 16, this.position.x, this.position.y, 50, 50];
        } else if (this.runningState === 2) {
          return [this.sprite.img, 78, 9, 14, 16, this.position.x, this.position.y, 50, 50];
        }
    }
    return undefined;
  }

  registerEvents() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
    this.on("playerstate", this.handleChangeState);
  }

  handleChangeState() {
    switch (this.playerState) {
      case PlayerState.WAIT:
        this.stopAnimateRunningState();
        break;
      case PlayerState.RUNNING:
        this.animateRunningState();
        break;
    }
  }

  animateRunningState() {
    // @ts-ignore
    this.animateRunningInterval = setInterval(() => {
      if (this.runningState >= 2) {
        this.runningState = 0;
      } else {
        this.runningState++;
      }
      // this.runningState = 2;
      console.log(this.runningState);
    }, 100);
  }

  stopAnimateRunningState() {
    if (this.animateRunningInterval) {
      // @ts-ignore
      clearInterval(this.animateRunningInterval);
    }
  }

  handleKeyup = () => {
    switch (this.playerState) {
      case PlayerState.RUNNING:
        this.setPlayerState(PlayerState.WAIT);
        break;
    }
  };

  canPlayerRun() {
    return this.playerState !== PlayerState.IN_AIR;
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
          this.position.x = this.position.x + 20;
          this.setPlayerState(PlayerState.RUNNING);
        }

        break;
      case "ArrowLeft":
        if (this.canPlayerRun()) {
          this.position.x = this.position.x - 20;
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
      context.drawImage(...img);
      context.restore();
    }
  }
}

export default Player;

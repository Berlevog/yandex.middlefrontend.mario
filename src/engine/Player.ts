import { ResourceImage } from "../pages/Game/Resources";
import { Engine, linearEquation } from "./Engine";
import { MapObject } from "./MapObject";
import { PhysicalObject } from "./PhysicalObject";
import { Point, Vector } from "./Point";

export enum PlayerState {
  "WAITING" = "player/WAITING",
  "RUNNING" = "player/RUNNING",
  "JUMPING" = "player/JUMPING",
  "FALLING" = "player/FALLING",
}

export enum PlayerDirection {
  "LEFT",
  "RIGHT",
}

// todo на будущее добавить в игру грибы и размеры персонажа
export enum PlayerSize {
  "NORMAL",
  "BIG",
}

type PlayerProps = {
  onGameOver: Function;
};

class Player extends PhysicalObject {
  public playerState: PlayerState = PlayerState.FALLING;
  public isFalling = true;
  public props: PlayerProps;
  // private playerDirection: PlayerDirection = PlayerDirection.RIGHT;
  private textureSize: Engine.ISizeData = { width: 128, height: 128 };
  private animateRunningInterval: number | NodeJS.Timer | undefined;
  private runningFrame = 0;
  private jumpingFrame = 0;
  private playerSize: Engine.ISizeData = { width: 24, height: 24 };
  private fallingSpeed = 5;
  private jumpSpeed = 4;
  private jumpAltitude = 30;
  private animateJumpInterval: number | NodeJS.Timer | undefined;
  private curentJumpAltitude: number = 0;
  private keysPressed: any = {};
  private audio: HTMLAudioElement;
  private ground: boolean = false;

  constructor(props: PlayerProps) {
    super({ ...props, texture: new ResourceImage("images/player.png") });
    this.props = props;
    this.bounciness = 0;
    this.registerEvents();
    this.setPlayerState(PlayerState.WAITING);
    // this.rect = { x: 30, y: 0, width: this.playerSize.width - 60, height: this.playerSize.height };
    this.rect = { x: 0, y: 0, width: this.playerSize.width, height: this.playerSize.height };
    this.pivot = new Point({ x: Math.floor(this.playerSize.width / 2), y: Math.floor(this.playerSize.height / 2) });
    this.restart();
    this.audio = document.createElement("audio");
    this.audio.setAttribute("src", "music/killed.ogg");
  }

  registerEvents() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
    this.on("playerstate", this.handleChangeState);
    this.on("keypressed", this.handleKeysPressed);
    this.on("collision", this.handleCollision);
  }

  handleCollision = (object: MapObject) => {
    this.ground = this.y + this.height === object.y;
  };

  getUserDefinedForceResistance(): number {
    return this.ground ? 0.5 : 0;
  }

  render(renderer: Engine.IRenderer) {
    const { canvas, context } = renderer;
    // this.calcPhysics();
    if (this.y > canvas.height) {
      this.gameOver();
    }

    const img = this.getPlayerImage(this.playerState);
    if (img) {
      context.save();
      context.drawImage(...img, this.x, this.y, this.playerSize.width, this.playerSize.height);
      context.restore();
    }

    // this.playerState = this.isFalling ? PlayerState.FALLING : PlayerState.WAITING;
  }

  destroy() {
    clearInterval(this.animateRunningInterval as NodeJS.Timeout);
    clearInterval(this.animateJumpInterval as NodeJS.Timeout);
    this.removeAllListeners("collision");
    this.removeAllListeners("playerstate");
    this.removeAllListeners("keypressed");
  }

  movePlayer(point: Engine.IPoint, speed: number = 1, callback?: Function, keyframes?: [], animationType?: any) {
    const startDistance = this.distanceTo(point);
    console.log("start", startDistance);
    const interval = setInterval(() => {
      const distance = this.distanceTo(point);
      console.log(distance);
      if (distance && distance > speed) {
        const progress = distance / startDistance;
        const dX = this.x - point.x;
        const x = this.x + Math.min(speed, distance);
        const y = linearEquation(this.position, point, x);
        console.log(x, y);
        this.position = new Point({ x, y });
      } else {
        this.position = point;
        clearInterval(interval);
      }
    }, 10);
  }

  getPlayerImage(state: PlayerState): [HTMLImageElement, number, number, number, number] | undefined {
    let position: Engine.IPoint = new Point({ x: 0, y: 0 });

    switch (state) {
      case PlayerState.WAITING:
        position = new Point({ x: 0, y: 0 });
        break;
      case PlayerState.RUNNING:
        position = this.getRunningImagePosition(this.runningFrame);
        break;
      case PlayerState.FALLING:
        position = new Point({ x: 128, y: 0 });
        break;
      case PlayerState.JUMPING:
        position = this.getJumpingImagePosition(this.jumpingFrame, this.curentJumpAltitude / this.jumpAltitude);
        break;
    }
    return [this.texture.img, position.x, position.y, this.textureSize.width, this.textureSize.height];
  }

  getRunningImagePosition(runningFrame: number): Engine.IPoint {
    const start = 256;
    const step = this.textureSize.width;
    return new Point({ x: start + step * runningFrame, y: 0 });
  }

  getJumpingImagePosition(jumpingFrame: number, animationPercent: number): Engine.IPoint {
    const start = 256; // пока возьму текстуру из бега
    const step = this.textureSize.width;
    return new Point({ x: start + step * jumpingFrame, y: 0 });
  }

  handleKeysPressed(keys: any) {
    if (keys["ArrowRight"]) {
      if (!this.ground) {
        this.velocity.x = 0;
        this.addForce(new Vector({ x: 0.5, y: 0 }));
      } else {
        this.addForce(new Vector({ x: 1.5, y: 0 }));
      }
    } else if (keys["ArrowLeft"]) {
      if (!this.ground) {
        this.velocity.x = 0;
        this.addForce(new Vector({ x: -0.5, y: 0 }));
      } else {
        this.addForce(new Vector({ x: -1.5, y: 0 }));
      }
    }
    if (keys["ArrowUp"]) {
      if (this.ground) {
        this.ground = false;
        this.addForce(new Vector({ x: 0, y: -3 }));
      }
    }
  }

  handleKeydown = (e: KeyboardEvent) => {
    this.keysPressed[e.key] = true;
    this.emit("keypressed", this.keysPressed);
  };

  handleKeyup = (e: KeyboardEvent) => {
    delete this.keysPressed[e.key];
  };

  handleChangeState() {
    switch (this.playerState) {
      case PlayerState.WAITING:
        this.stopAnimateRunningFrame();
        break;
      case PlayerState.RUNNING:
        this.animateRunningFrame();
        break;
      case PlayerState.JUMPING:
        this.animateJumpFrame();
        break;
    }
  }

  animateRunningFrame() {
    // @ts-ignore
    this.animateRunningInterval = setInterval(() => {
      if (this.runningFrame >= 2) {
        this.runningFrame = 0;
      } else {
        this.runningFrame++;
      }
      // this.runningFrame = 2;
    }, 120);
  }

  stopAnimateRunningFrame() {
    if (this.animateRunningInterval) {
      // @ts-ignore
      clearInterval(this.animateRunningInterval);
    }
  }

  animateJumpFrame() {
    // @ts-ignore
    this.curentJumpAltitude = 0;
    this.jumpingFrame = 0;
    this.animateJumpInterval = setInterval(() => {
      if (this.curentJumpAltitude < this.jumpAltitude) {
        this.curentJumpAltitude++;
        this.y = this.y - this.jumpSpeed;
        if (this.keysPressed["ArrowRight"]) {
          this.x = this.x + 1;
        }
        if (this.keysPressed["ArrowLeft"]) {
          this.x = this.x - 1;
        }
      } else {
        this.setPlayerState(PlayerState.FALLING);
        clearInterval(this.animateJumpInterval as NodeJS.Timeout);
      }
      // this.positionY = this.positionY + 10;
      // this.runningFrame = 2;
    }, 10);
  }

  stopAnimateJumpFrame() {
    if (this.animateJumpInterval) {
      // @ts-ignore
      clearInterval(this.animateJumpInterval);
    }
  }

  canPlayerRun() {
    return true;
  }

  setPlayerState(state: PlayerState) {
    if (this.playerState !== state) {
      this.playerState = state;
      this.emit("playerstate", this.playerState);
    }
  }

  calcPhysics() {
    switch (this.playerState) {
      case PlayerState.FALLING:
        // todo второй закон Ньютона
        this.y = this.y + this.fallingSpeed;
        break;
      // case PlayerState.JUMPING:
      //   if (this.curentJumpAltitude < this.jumpAltitude) {
      //     this.curentJumpAltitude++;
      //     this.positionY = this.positionY - this.jumpSpeed;
      //   } else {
      //     // console.log("fall");
      //     // this.setPlayerState(PlayerState.FALLING);
      //   }
      //
      //   break;
    }
  }

  restart() {
    this.y = 175;
    this.playerState = PlayerState.WAITING;
  }

  gameOver() {
    this.audio.play();
    this.audio.onended = () => this.props.onGameOver();
  }
}

export default Player;

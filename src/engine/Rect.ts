import { Engine } from "./Engine";

export class Rect implements Engine.IRect {
  public width: number;
  public height: number;
  public x: number;
  public y: number;

  constructor(props: Engine.IRect) {
    this.width = props.width;
    this.height = props.height;
    this.x = props.x;
    this.y = props.y;
  }
}

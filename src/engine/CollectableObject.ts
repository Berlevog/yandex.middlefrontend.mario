import { PhysicalObject } from "./PhysicalObject";
import { Engine } from "./Engine";

export type CollectableObjectProps = {
  onCollect: () => void;
};

export class CollectableObject extends PhysicalObject {
  public onCollect;

  constructor(props: Engine.PhysicalObjectProps & CollectableObjectProps) {
    super(props);
    this.onCollect = props.onCollect;
  }
}

export class ResourceImage {
  public img: HTMLImageElement;

  constructor(url: string) {
    this.img = document.createElement("img");
    this.img.src = url;
  }
}

export class Resources {
  public player: ResourceImage;

  constructor() {
    this.player = new ResourceImage("images/player.png");
  }
}

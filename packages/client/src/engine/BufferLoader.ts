export default class BufferLoader {
  private bufferList: any[];
  private loadCount: number;

  constructor(private context: AudioContext, private urlList: string[], private onload: Function) {
    this.bufferList = [];
    this.loadCount = 0;
  }

  loadBuffer(url: string, index: number) {
    fetch(url).then((res) => {
      res.arrayBuffer().then((arrayBuffer) => {
        this.context.decodeAudioData(arrayBuffer, (buffer) => {
          if (!buffer) {
            console.error("something went wrong with loading audio");
            return;
          }
          this.bufferList[index] = buffer;
          if (++this.loadCount === this.urlList.length) {
            this.onload(this.bufferList);
          }
        });
      });
    });
  }

  load() {
    for (let i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  }
}

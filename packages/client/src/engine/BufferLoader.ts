export default class BufferLoader {
  private bufferList: any[];
  private loadCount: number;
  private urlList: string[];
  private context: AudioContext;
  private onload: Function;

  constructor(context: AudioContext, urlList: string[], onload: Function) {
    this.bufferList = [];
    this.loadCount = 0;
    this.urlList = urlList;
    this.context = context;
    this.onload = onload;
  }

  loadBuffer(url: string, index: number) {
    fetch(url).then((res) => {
      console.log('loaded asset: ', url);
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
    console.log(this, this.urlList)
    for (let i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  }
}

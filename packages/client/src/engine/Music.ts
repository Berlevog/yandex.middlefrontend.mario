import EventEmitter from "eventemitter3";
import BufferLoader from "./BufferLoader";

class Source {
  private source: AudioBufferSourceNode | null | undefined;

  constructor(private context: AudioContext, private buffer: AudioBuffer | null, play = false) {
    if (play) {
      this.play();
    }
  }

  play() {
    return new Promise((resolve) => {
      this.source = this.context.createBufferSource();
      // @ts-ignore
      this.source.buffer = this.buffer;
      this.source.connect(this.context.destination);
      this.source.start(0);
      this.source.onended = () => {
        resolve(this.source);
      };
    });
  }

  stop() {
    this.source?.stop(0);
  }
}

export enum Playlist {
  world = "music/world01.ogg",
  killed = "music/killed.ogg",
}

export default class Music extends EventEmitter {
  private context: AudioContext;
  private bufferLoader: BufferLoader;

  private sources = {};
  // private playing: AudioBufferSourceNode[] = [];

  constructor() {
    super();
    this.context = new AudioContext();
    this.bufferLoader = new BufferLoader(
      this.context,
      Object.values(Playlist),
      (bufferList: (AudioBuffer | null)[]) => {
        bufferList.forEach((buffer, index) => {
          const key = Object.values(Playlist)[index];
          const source = new Source(this.context, buffer);
          // @ts-ignore
          this.sources[key] = source;
        });
        this.emit("loaded");
      }
    );
    this.bufferLoader.load();
  }

  playSound = async (sound: Playlist, loop = false) => {
    // @ts-ignore
    const source = this.sources[sound] as Source;
    if (source) {
      await source.play();
    }
  };

  stop = (sound: Playlist) => {
    // @ts-ignore
    const source = this.sources[sound] as Source;
    if (source) {
      source.stop();
    }
  };
}
